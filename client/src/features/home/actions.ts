import {AppThunk} from '../../app/store';
import {actions} from '.';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

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
