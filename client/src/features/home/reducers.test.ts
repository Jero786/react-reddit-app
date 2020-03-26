import {reducer, actions} from '.';
import {initialState} from './reducers';
import {Post} from '../../commons/types';

describe('HomePage Reducer', () => {

    it('should return the intitial state', () => {
        const nextState = initialState;

        const result = reducer(undefined, {});

        expect(result).toEqual(nextState);
    });

    it('should change state to fetching post', () => {
        const result = reducer(initialState, actions.fetchingPost());

        expect(result.isRequestingNews).toBeTruthy();
        expect(result.messageError).toEqual('');
    });

    it('should change state to fetching post success', () => {
        const data = [{name: 'brisa'}, {name: 'emi'}];

        const result = reducer(initialState, actions.fetchingPostSuccess(data));

        expect(result.news).toEqual(data);
        expect(result.isRequestingNews).toBeFalsy();
        expect(result.messageError).toEqual('');
    });

    it('should change state to fetching post failure', () => {
        const result = reducer(initialState, actions.fetchingPostFailure());

        expect(result.isRequestingNews).toBeFalsy();
        expect(result.messageError).toEqual('Something went wrong while fetching posts.');
    });

    it('should define a post selected', () => {
        const data = {id: 786, name: 'brisa'};
        const customState = {...initialState, news:[{id: 786, name: 'brisa'}, {name: 'emi'}]};

        const result = reducer(customState, actions.postSelected(data));

        expect(result.currentPostSelected).toEqual(data);
        expect(result.news.find((post:Post) => post.id === 786).isViewed).toEqual(true);
    });

    it('should define a post dismissed', () => {
        const data = {id: 786, name: 'brisa'};
        const customState = {...initialState, news:[{id: 786, name: 'brisa'}, {name: 'emi'}]};

        const result = reducer(customState, actions.postDismissed(data));

        expect(result.currentPostSelected).toBeUndefined();
        expect(result.news.find((post:Post) => post.id === 786).isDismissed).toEqual(true);
    });

    it('should dismissed all post', () => {
        const data = {id: 786, name: 'brisa'};
        const customState = {...initialState, news:[{name: 'brisa'}, {name: 'emi'}]};

        const result = reducer(customState, actions.postDismissedAll());

        expect(result.news.every((post:Post) => post.isDismissed)).toBeTruthy();
    });
});