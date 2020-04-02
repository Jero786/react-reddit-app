import {PayloadAction} from '@reduxjs/toolkit';
import {Post} from '../../commons/types';
import {getAllSavedPost} from '../../commons/middlewares/saveSession';

export interface DefaultState {
    posts: Post[],
    after?: string,
    isRequestingPosts: boolean,
    isRequestingNextPage: boolean,
    messageError: string,
    isDismissedAll: boolean,
    currentPostSelected?: Post
    isDismissed: boolean
}

export const initialState: DefaultState = {
    posts: getAllSavedPost(),
    after: undefined,
    isRequestingPosts: true,
    isRequestingNextPage: false,
    messageError: '',
    isDismissedAll: false,
    currentPostSelected: undefined,
    isDismissed: false,
};

/**
 * Home Page reducer which works completely out-of-the-box in a immutable way (with shared structure).
 */
export const reducers = {

    fetchingPost: (state: DefaultState) => {
        state.isRequestingPosts = true;
        state.messageError = '';
    },

    fetchingNextPost: (state: DefaultState) => {
        state.isRequestingNextPage = true;
        state.messageError = '';
    },

    fetchingPostSuccess: (state: DefaultState, action: PayloadAction<any>) => {
        const {results, after} = action.payload;
        state.posts = hydratePostWithExistingPost(state, results);
        state.after = after;
        state.isRequestingPosts = false;
        state.messageError = '';
    },

    fetchingNextPostSuccess: (state: DefaultState, action: PayloadAction<any>) => {
        const {results, after} = action.payload;
        state.posts = hydratePostWithExistingPost(state, results);
        state.after = after;
        state.isRequestingNextPage = false;
        state.messageError = '';
    },

    fetchingPostFailure: (state: DefaultState) => {
        state.isRequestingPosts = false;
        state.messageError = 'Something went wrong while fetching posts.'
    },

    fetchingNextPostFailure: (state: DefaultState) => {
        state.isRequestingNextPage = false;
        state.messageError = 'Something went wrong while fetching next Posts.'
    },

    postSelected: (state: DefaultState, action: PayloadAction<any>) => {
        const postToDismiss = state.posts.find(post => post.id === action.payload.id);
        if (postToDismiss) {
            postToDismiss.isViewed = true;
            postToDismiss.isNeededToPersistState = true;
            state.currentPostSelected = action.payload;
        }
    },

    postDismissed: (state: DefaultState, action: PayloadAction<any>) => {
        const postToDismiss = state.posts.find(post => post.id === action.payload.id);
        if (postToDismiss) {
            postToDismiss.isDismissed = true;
            postToDismiss.isNeededToPersistState = true;
            if (state.currentPostSelected && state.currentPostSelected.id === postToDismiss.id) {
                state.currentPostSelected = undefined;
            }
        }
    },

    postDismissedAll: (state: DefaultState) => {
        state.isDismissedAll = !state.isDismissedAll;
        state.posts = state.posts.map(post => {
            post.isDismissed = state.isDismissedAll;
            post.isNeededToPersistState = true;
            return post;
        });
        state.currentPostSelected = undefined;
    }
};

/**
 * Replace new post by already existing ones saved in local cache.
 * @param state
 * @param newPosts
 */
function hydratePostWithExistingPost(state: DefaultState, newPosts: Post[] = []): Post[] {
    const existingPost = state.posts || [];
    if (existingPost.length) {
        const existingPostId = existingPost.map(post => post.id);
        const newPostsFiltered = newPosts.filter(post => existingPostId.indexOf(post.id) === -1);
        return [...existingPost, ...newPostsFiltered];
    } else {
        return newPosts;
    }
}