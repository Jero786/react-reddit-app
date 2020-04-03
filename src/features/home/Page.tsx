// Libs
import React from 'react';
import get from 'lodash/get';
import { useSelector, useDispatch } from 'react-redux';

// Styles
import { HomePageWrapper } from './styles';

// Hooks
import { useFetchTop } from './hooks';

// Actions
import { actions } from '.';
import { fetchNextTop } from './actions';

// Components
import { Post } from '../../commons/components/post';
import { Drawer } from '../../commons/components/drawer';
import { Loading } from '../../commons/components/loading';
import { useBrowserInfo } from '../../commons/hooks/useBrowserInfo';
import { PostDetail } from '../../commons/components/post-detail';

// Selectors
import {
  selectPosts,
  selectIsRequestingPosts,
  selectMessageError,
  selectIsDismissedAll,
  selectPostSelected,
  selectIsRequestingNextPage,
} from './selectors';

export const HomePage = () => {
  const browserInfo = useBrowserInfo();
  const isRequestingPosts = useSelector(selectIsRequestingPosts);
  const posts = useSelector(selectPosts);
  const isDismissedAll = useSelector(selectIsDismissedAll);
  const postSelected = useSelector(selectPostSelected);
  const isRequestingNextPage = useSelector(selectIsRequestingNextPage);
  const messageError = useSelector(selectMessageError);
  const dispatch = useDispatch();

  useFetchTop();

  if (isRequestingPosts) {
    return <Loading />;
  }

  const isPostNotSelected = !postSelected;
  const isDesktop = !browserInfo.isMobile();
  const isDrawerVisible =
    isPostNotSelected || (isDesktop && browserInfo.isOrientationLandscape());
  const isFullExpanded = isPostNotSelected && browserInfo.isMobile();

  return (
    <HomePageWrapper isDrawerVisible={isDrawerVisible}>
      <Drawer
        isLoading={isRequestingNextPage}
        isDismissedAll={isDismissedAll}
        onDismissAll={() => dispatch(actions.postDismissedAll())}
        onNextPage={() => dispatch(fetchNextTop(getLastPost(posts)))}
        isExpanded={isDrawerVisible}
        isFullExpanded={isFullExpanded}
      >
        <>
          {isDrawerVisible &&
            posts &&
            posts.map((post) => {
              return (
                <Post
                  key={`key-post-${post.id}`}
                  post={post}
                  isPostSelected={get(postSelected, 'id') === post.id}
                  onDismissed={(evt) => {
                    evt.stopPropagation();
                    dispatch(actions.postDismissed(post));
                  }}
                  onSelected={() => dispatch(actions.postSelected(post))}
                />
              );
            })}
        </>
      </Drawer>
      <section>
        <>
          {messageError && <div>{messageError}</div>}
          {postSelected && <PostDetail post={postSelected} />}
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
  return posts;
}
