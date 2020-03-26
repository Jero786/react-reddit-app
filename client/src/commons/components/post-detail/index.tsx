import React from 'react';
import {PostDetailWrapper, FigureWrapper} from './styles';
import {useDispatch} from 'react-redux';
import {actions} from '../../../features/home';
import {Post} from '../../types';
import {isValidUrl} from '../../utils';

interface DefaultProps {
    post: Post
}

/**
 * Post detail component which shows the detail about given {@link Post}.
 * @param post
 * @constructor
 */
export const PostDetail: React.FC<DefaultProps> = ({
                                                       post
                                                   }) => {
        const dispatch = useDispatch();

        return (
            <PostDetailWrapper className="demo-card-wide mdl-card mdl-shadow--2dp">
                <div className="mdl-card__title">
                    <h2 className="mdl-card__title-text">{post.author}</h2>
                </div>
                <div className="mdl-card__actions mdl-card--border">
                    <FigureWrapper>
                        {isValidUrl(post.thumbnail) ? <img src={post.thumbnail} alt={post.title}/> :
                            <img src="http://placehold.it/200x170" alt={post.title}/>}
                    </FigureWrapper>
                </div>
                <div className="mdl-card__actions mdl-card--border"></div>
                <div className="mdl-card__supporting-text">
                    {post.selftext || post.title}
                </div>
                <div className="mdl-card__menu">
                    <button onClick={() => dispatch(actions.postDismissed(post))}
                            className="mdl-button mdl-button--icon mdl-js-button mdl-js-ripple-effect">
                        <i className="material-icons">close</i>
                    </button>
                </div>
            </PostDetailWrapper>
        )
    }
;