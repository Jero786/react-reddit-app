import {AppThunk} from "../../app/store";
import {Post} from '../../commons/types';
import {actions} from '.';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

interface DefaultProps {
    after: string
}
export const fetchNews = (): AppThunk => async dispatch => {
    dispatch(actions.fetchingPost);

    const url = `${API_URL}/api/top`;
    try {
        const response = await axios.get(url);
        dispatch(actions.fetchingPostSuccess(response.data));
    } catch (err) {
        dispatch(actions.fetchingPostFailure());
    }
};

export const fetchNextPosts = (lastPost:Post): AppThunk => async dispatch => {
    dispatch(actions.fetchingNextPost());
    const  url = `${API_URL}/api/top?after=${lastPost.name}`;
    try {
        const response = await axios.get(url);
        dispatch(actions.fetchingNextPostSuccess(response.data));
    } catch (err) {
        debugger
        dispatch(actions.fetchingNextPostFailure());
    }
};
