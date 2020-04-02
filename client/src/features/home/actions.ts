import {AppThunk} from '../../app/store';
import {Post} from '../../commons/types';
import {API_URL} from '../../env';
import {actions} from '.';
import axios from 'axios';
import get from 'lodash/get';

export const fetchTop = (): AppThunk => async dispatch => {
    dispatch(actions.fetchingPost);
    const url = `${API_URL}/top.json?limit=50`;
    try {
        const response = await axios.get(url);
        const payload = getPayloadFromResponse(response);
        dispatch(actions.fetchingPostSuccess(payload));
    } catch (err) {
        dispatch(actions.fetchingPostFailure());
    }
};

export const fetchNextTop = (lastPost: Post): AppThunk => async dispatch => {
    dispatch(actions.fetchingNextPost());
    const url = `${API_URL}/top.json?after=${lastPost.name}`;
    try {
        const response = await axios.get(url);
        const payload = getPayloadFromResponse(response);
        dispatch(actions.fetchingNextPostSuccess(payload));
    } catch (err) {
        dispatch(actions.fetchingNextPostFailure());
    }
};

/**
 * Get response from Reddit API and convert to proper action payload.
 * @param response
 */
function getPayloadFromResponse(response: any) {
    const data = get(response, 'data.data', []);
    const results = get(data, 'children');
    const after = get(results, 'after');
    return {
        results: results.map((post:any) => post.data),
        after
    };
}