import React, { SyntheticEvent } from 'react';
import { Post as PostType } from '../../types';
import { isValidUrl, getDate } from '../../utils';
import { Article, Body, Header, Viewed, UnViewed } from './styles';

interface DefaultProps {
  post: PostType;
  onDismissed: (value: SyntheticEvent) => void;
  onSelected: () => void;
  isPostSelected?: boolean;
}

/**
 * The Post component represent a Reddit post for a particular user.
 * @param post
 * @param onDismissed
 * @param onSelected
 * @constructor
 */
export const Post: React.FC<DefaultProps> = ({
  post,
  onDismissed,
  onSelected,
  isPostSelected,
}) => {
  return (
    <Article
      data-is-selected={isPostSelected}
      aria-hidden={post.isDismissed}
      isDismissed={post.isDismissed}
      onClick={onSelected}
    >
      <Header>
        {post.isViewed ? (
          <Viewed data-testid="is-readed" />
        ) : (
          <UnViewed data-testid="is-non-readed" />
        )}
        <h1>{post.author}</h1>
        <span>{getDate(post.created)}</span>
        <button
          type="button"
          onClick={onDismissed}
          className="mdl-button mdl-js-button mdl-button--fab mdl-button--colored mdl-button--mini-fab"
        >
          <i className="material-icons">close</i>
        </button>
      </Header>
      <Body>
        {isValidUrl(post.thumbnail) ? (
          <img alt={post.title} src={post.thumbnail} />
        ) : (
          <img src="http://placehold.it/70x70" alt={post.title} />
        )}
        <div>
          <p>{post.title}</p>
          <span className="mdl-chip">
            <span className="mdl-chip__text">
              {`${post.num_comments || 0} Comments`}
            </span>
          </span>
        </div>
      </Body>
    </Article>
  );
};
