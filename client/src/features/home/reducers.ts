import {PayloadAction} from "@reduxjs/toolkit";
import {Post} from '../../commons/types';

export interface DefaultState {
    news: Post[]
    isRequestingNews: boolean,
    isRequestingNextPage: boolean,
    messageError: string,
    isDismissedAll: boolean,
    currentPostSelected?: Post
    isDismissed: boolean
}

export const initialState: DefaultState = {
    news: [],
    isRequestingNews: true,
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
        state.isRequestingNews = true;
        state.messageError = '';
    },

    fetchingPostSuccess: (state: DefaultState, action: PayloadAction<any>) => {
        state.news = action.payload;
        state.isRequestingNews = false;
        state.messageError = '';
    },

    fetchingPostFailure: (state: DefaultState) => {
        state.isRequestingNews = false;
        state.messageError = 'Something went wrong while fetching posts.'
    },

    postSelected: (state: DefaultState, action: PayloadAction<any>) => {
        const postToDismiss = state.news.find(post => post.id === action.payload.id);
        if (postToDismiss) {
            postToDismiss.isViewed = true;
            state.currentPostSelected = action.payload;
        }
    },

    postDismissed: (state: DefaultState, action: PayloadAction<any>) => {
        const postToDismiss = state.news.find(post => post.id === action.payload.id);
        if (postToDismiss) {
            postToDismiss.isDismissed = true;
            if (state.currentPostSelected && state.currentPostSelected.id === postToDismiss.id) {
                state.currentPostSelected = undefined;
            }
        }
    },

    postDismissedAll: (state: DefaultState) => {
        state.isDismissedAll = !state.isDismissedAll;
        state.news = state.news.map(post => {
            post.isDismissed = state.isDismissedAll;
            return post;
        });
        state.currentPostSelected = undefined;
    }
};

