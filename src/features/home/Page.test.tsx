// Libs
import React from 'react';

// Hooks
import { fireEvent } from '@testing-library/react';

// Selectors
import {
  selectIsRequestingPosts as mockSelectIsRequestingPosts,
  selectPosts as mockSelectPosts,
} from './selectors';

// Actions
import { actions } from '.';
import { fetchNextTop } from './actions';

// Sut
import { HomePage } from './Page';
import { renderWithRedux } from '../../commons/utils';

jest.mock('./selectors');
jest.mock('./hooks');
jest.mock('./actions');
jest.mock('.');

describe('Home Page', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should display loading indicator', () => {
    // Arrange
    mockSelectIsRequestingPosts.mockReturnValue(true);

    // Act
    const { getByTestId } = renderWithRedux(<HomePage />);

    // Assert
    expect(getByTestId('locator-loading')).toBeInTheDocument();
  });

  it('should render properly the top and bottom of sidebar', () => {
    // Arrange
    mockSelectIsRequestingPosts.mockReturnValue(false);
    mockSelectPosts.mockReturnValue([]);

    // Act
    const { getByText } = renderWithRedux(<HomePage />);

    // Assert
    expect(getByText(/reddis post/i));
    expect(getByText(/dismiss all/i));
  });

  it('should render properly the title and alt text of image', () => {
    // Arrange
    mockSelectIsRequestingPosts.mockReturnValue(false);
    mockSelectPosts.mockReturnValue([
      {
        id: 1,
        title: 'Brisa posts',
      },
      {
        id: 2,
        title: 'Emir posts',
      },
    ]);

    // Act
    const { getByText, getByAltText } = renderWithRedux(<HomePage />);

    // Assert
    expect(getByText(/Brisa posts/i));
    expect(getByText(/Emir posts/i));
    expect(getByAltText(/Brisa posts/i));
    expect(getByAltText(/Emir posts/i));
  });

  it('should render properly post detail', () => {
    // Arrange
    mockSelectIsRequestingPosts.mockReturnValue(false);
    mockSelectPosts.mockReturnValue([
      {
        id: 1,
        title: 'Brisa posts',
      },
      {
        id: 2,
        title: 'Emir posts',
      },
    ]);

    // Act
    const { getByText } = renderWithRedux(<HomePage />);

    // Assert
    expect(getByText(/Brisa posts/i));
    expect(getByText(/Emir posts/i));
  });

  describe('when the user user', () => {
    it('click on dismiss button, should trigger "dismiss all" action', () => {
      // Arrange
      mockSelectIsRequestingPosts.mockReturnValue(false);
      actions.postDismissedAll.mockReturnValue({ type: 'type', payload: {} });
      const { getByTestId } = renderWithRedux(<HomePage />);

      // Act
      fireEvent.click(getByTestId('dismiss-all'));

      // Assert
      expect(actions.postDismissedAll).toHaveBeenCalledTimes(1);
    });

    it('click on next page, should trigger "navigate next" action', () => {
      // Arrange
      mockSelectIsRequestingPosts.mockReturnValue(false);
      fetchNextTop.mockReturnValue({ type: 'type', payload: {} });
      const { getByText } = renderWithRedux(<HomePage />);

      // Act
      fireEvent.click(getByText('navigate_next'));

      // Assert
      expect(fetchNextTop).toHaveBeenCalledTimes(1);
    });

    it('click on specific post, should trigger "select post" action', () => {
      // Arrange
      const postSelected = { id: 1, title: 'Brisa posts' };
      mockSelectIsRequestingPosts.mockReturnValue(false);
      actions.postSelected.mockReturnValue({
        type: 'type',
        payload: postSelected,
      });
      mockSelectPosts.mockReturnValue([
        postSelected,
        { id: 2, title: 'Emir posts' },
      ]);
      const { getByText } = renderWithRedux(<HomePage />);

      // Act
      fireEvent.click(getByText(/Brisa posts/i));

      // Assert
      expect(actions.postSelected).toHaveBeenCalledTimes(1);
    });
  });
});
