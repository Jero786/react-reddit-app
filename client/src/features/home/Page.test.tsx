import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { HomePage} from './Page'
import {render} from '@testing-library/react';

import {
    selectIsRequestingNews,
} from './selectors';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

jest.mock('./selectors');

jest.mock('./hooks');

describe('Home Page', () => {

    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback();
        });
        useDispatch.mockImplementation(callback => {
            return callback();
        });
    });

    afterEach(() => {
        useSelector.mockClear();
        useDispatch.mockClear();
    });

    it('should should loading', () => {
        selectIsRequestingNews.mockResolvedValueOnce(true);

        const {getByTestId} = render(<HomePage/>);

        expect(getByTestId('locator-loading')).toBeInTheDocument();
    });


    it('should render properly', () => {
        const {getByText, debug} = render(<HomePage/>);

        expect(getByText(/reddis post/i));
        expect(getByText(/dismiss all/i));
    });

});

