import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {reducer} from '.';
import {initialState} from './reducers';
import {HomePage} from './Page'

function renderWithRedux(
    ui: any,
    {initialState, store = createStore(reducer, initialState)}: any = {}
) {
    return {
        ...render(<Provider store={store}>{ui}</Provider>),
        // adding `store` to the returned utilities to allow us
        // to reference it in our tests (just try to avoid using
        // this to test implementation details).
        store,
    }
}

describe('Home Page', () => {
    it('should render properly', () => {
        const {getByText} = renderWithRedux(<HomePage/>);

        expect(getByText(/reddis post/i));
        expect(getByText(/dismiss all/i));
    });
});