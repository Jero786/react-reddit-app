import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

import {HomePageWrapper} from './styles';
import {actions} from '.';
import {Post} from '../../commons/components/post';
import {PostDetail} from '../../commons/components/post-detail';
import {Drawer} from '../../commons/components/drawer';
import {Loading} from '../../commons/components/loading';

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

    const isDrawerVisible = true;
    const isFullExpanded = false;
    return (
        <HomePageWrapper isDrawerVisible={isDrawerVisible}>
            <Drawer
                isLoading={isRequestingNextPage}
                isDismissedAll={isDismissedAll}
                onDismissAll={() => dispatch(actions.postDismissedAll())}
                onNextPage={() => {}}
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

