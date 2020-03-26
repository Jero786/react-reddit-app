import {createStore} from 'redux';
import {reducer} from '../../features/home';
import {render} from '@testing-library/react';
import {Provider} from 'react-redux';
import React from 'react';

export const renderWithRedux = (
    ui: any,
    {initialState, store = createStore(reducer, initialState)}: any = {}
) => {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    }
};