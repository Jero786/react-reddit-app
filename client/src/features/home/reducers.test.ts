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

        expect(result.isRequestingPosts).toBeTruthy();
        expect(result.messageError).toEqual('');
    });

    it('should change state to fetching post success', () => {
        const payload = [{name: 'brisa'}, {name: 'emi'}];

        const result = reducer(initialState, actions.fetchingPostSuccess({results: payload}));

        expect(result.posts.length).toEqual(2);
        expect(result.posts[0].name).toEqual('brisa');
        expect(result.posts[1].name).toEqual('emi');
        expect(result.isRequestingPosts).toBeFalsy();
        expect(result.messageError).toEqual('');
    });

    it('should change state to fetching post failure', () => {
        const result = reducer(initialState, actions.fetchingPostFailure());

        expect(result.isRequestingPosts).toBeFalsy();
        expect(result.messageError).toEqual('Something went wrong while fetching posts.');
    });

    it('should define a post selected', () => {
        const data = {id: 786, name: 'brisa'};
        const customState = {...initialState, posts:[{id: 786, name: 'brisa'}, {name: 'emi'}]};

        const result = reducer(customState, actions.postSelected(data));

        expect(result.currentPostSelected).toEqual(data);
        expect(result.posts.find((post:Post) => post.id === 786).isViewed).toEqual(true);
    });

    it('should define a post dismissed', () => {
        const data = {id: 786, name: 'brisa'};
        const customState = {...initialState, posts:[{id: 786, name: 'brisa'}, {name: 'emi'}]};

        const result = reducer(customState, actions.postDismissed(data));

        expect(result.currentPostSelected).toBeUndefined();
        expect(result.posts.find((post:Post) => post.id === 786).isDismissed).toEqual(true);
    });

    it('should dismissed all post', () => {
        const data = {id: 786, name: 'brisa'};
        const customState = {...initialState, posts:[{name: 'brisa'}, {name: 'emi'}]};

        const result = reducer(customState, actions.postDismissedAll());

        expect(result.posts.every((post:Post) => post.isDismissed)).toBeTruthy();
    });
});