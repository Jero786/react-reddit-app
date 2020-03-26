import React from 'react';
import {render, fireEvent} from '@testing-library/react';
import {Post} from './index';

const postFactory = ({
                         title = 'some title',
                         isDismissed = false,
                         isViewed = false,
                         created = 12345,
                         thumbnail = 'http://some-awesome-image-here.svg',
                     }) => ({
    title,
    isDismissed,
    isViewed,
    created,
    thumbnail,
});

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));

describe('Post', () => {

    afterAll(() => {
        jest.restoreAllMocks();
    });

    it('should render post properly', () => {
        const {getByText, getByAltText, debug} = render(<Post post={postFactory({})} onDismissed={() => {
            }} onSelected={() => {
            }}/>
        );

        expect(getByText(/some title/i)).toBeInTheDocument();
        expect(getByAltText(/some title/i)).toBeInTheDocument();
    });

    it('should call onSelect properly', () => {
        const onSelect = jest.fn();
        const {getByText, getByAltText, debug} = render(<Post post={postFactory({})} onDismissed={() => {
            }} onSelected={onSelect}/>
        );

        fireEvent.click(getByText(/close/i));

        expect(onSelect).toHaveBeenCalled();
    });

    it('should call onDismissed properly', () => {
        const onSelect = jest.fn();
        const {getByText, getByAltText, debug} = render(<Post post={postFactory({})} onDismissed={() => {
            }} onSelected={onSelect}/>
        );

        fireEvent.click(getByText(/some title/i));

        expect(onSelect).toHaveBeenCalled();
    });
});