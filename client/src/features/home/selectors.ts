import {RootState} from '../../app/store';
import {Post} from '../../commons/types';

export const selectNews = (state: RootState): Post[] => state.home.news;
export const selectIsRequestingNews = (state: RootState): boolean => state.home.isRequestingNews;
export const selectIsRequestingNextPage = (state: RootState): boolean => state.home.isRequestingNextPage;
export const selectMessageError = (state: RootState): string => state.home.messageError;
export const selectIsDismissedAll = (state: RootState): boolean => state.home.isDismissedAll;
export const selectPostSelected = (state: RootState): (Post|undefined) => state.home.currentPostSelected;
