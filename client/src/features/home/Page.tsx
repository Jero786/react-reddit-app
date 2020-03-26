import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '.';
import {fetchNextPosts} from './actions';
import {HomePageWrapper} from './styles';

import {Post} from '../../commons/components/post';
import {Drawer} from '../../commons/components/drawer';
import {Loading} from '../../commons/components/loading';
import {useBrowserInfo} from '../../commons/hooks/useBrowserInfo';
import {PostDetail} from '../../commons/components/post-detail';
import {
    selectNews,
    selectIsRequestingNews,
    selectMessageError,
    selectIsDismissedAll,
    selectPostSelected,
    selectIsRequestingNextPage
} from './selectors';
import {
    useFetchNews
} from './hooks';

export const HomePage = () => {
    const browserInfo = useBrowserInfo();
    const isRequestingNews = useSelector(selectIsRequestingNews);
    const news = useSelector(selectNews);
    const isDismissedAll = useSelector(selectIsDismissedAll);
    const postSelected = useSelector(selectPostSelected);
    const isRequestingNextPage = useSelector(selectIsRequestingNextPage);
    const messageError = useSelector(selectMessageError);
    const dispatch = useDispatch();

    useFetchNews();

    if (isRequestingNews) {
        return <Loading/>
    }

    const isDrawerVisible = !postSelected ? true : !browserInfo.isMobile() && browserInfo.isOrientationLandscape();
    const isFullExpanded = !postSelected && browserInfo.isMobile();
    return (
        <HomePageWrapper isDrawerVisible={isDrawerVisible}>
            <Drawer
                isLoading={isRequestingNextPage}
                isDismissedAll={isDismissedAll}
                onDismissAll={() => dispatch(actions.postDismissedAll())}
                onNextPage={() => dispatch(fetchNextPosts(getLastPost(news)))}
                isExpanded={isDrawerVisible}
                isFullExpanded={isFullExpanded}
            >
                <>

                    {isDrawerVisible && news.map(post => {
                        return (<Post
                            key={`key-post-${post.id}`}
                            post={post}
                            onDismissed={evt => {
                                evt.stopPropagation();
                                dispatch(actions.postDismissed(post));
                            }}
                            onSelected={() => dispatch(actions.postSelected(post))}
                        />)
                    })}
                </>
            </Drawer>
            <section>
                <>
                    {messageError && <div>{messageError}</div>}
                    {postSelected && <PostDetail post={postSelected}/>}
                </>
            </section>
        </HomePageWrapper>
    );
};

/**
 * Given a list of post return the last one.
 * @param posts
 */
function getLastPost(posts: any[]) {
    if (posts && posts.length) {
        return posts.slice(-1)[0];
    }
}
