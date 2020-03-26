import {useDispatch} from 'react-redux';
import {useEffect} from 'react';
import {fetchNews} from './actions';

export const useFetchNews = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchNews());
    }, []);  /* eslint-disable-line react-hooks/exhaustive-deps */
};
