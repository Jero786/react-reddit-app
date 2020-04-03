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
import * as utils from '../../commons/utils';

const { renderWithRedux } = utils;

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
        thumbnail:
          'https://b.thumbs.redditmedia.com/nfXTmI3L6vamk16uJcHNF1YQJN328JZ-2yuh5S80EuA.jpg',
      },
      {
        id: 2,
        title: 'Emir posts',
        thumbnail:
          'https://b.thumbs.redditmedia.com/nfXTmI3L6vamk16uJcHNF1YQJN328JZ-2yuh5S80EuA.jpg',
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

  it('should render properly when was posted', () => {
    // Arrange
    mockSelectIsRequestingPosts.mockReturnValue(false);
    utils.getDate = jest.fn().mockReturnValue('10 hours ago');
    mockSelectPosts.mockReturnValue([
      {
        id: 1,
        created: 1585858341,
      },
    ]);

    // Act
    const { getByText } = renderWithRedux(<HomePage />);

    // Assert
    expect(getByText(/10 hours ago/i)).toBeInTheDocument();
  });

  it('should indicate when is already readed', () => {
    // Arrange
    mockSelectIsRequestingPosts.mockReturnValue(false);
    mockSelectPosts.mockReturnValue([
      {
        id: 1,
        isViewed: true,
      },
    ]);

    // Act
    const { getByTestId } = renderWithRedux(<HomePage />);

    // Assert
    expect(getByTestId('is-readed')).toBeInTheDocument();
  });

  it('should indicate when is not readed yet', () => {
    // Arrange
    mockSelectIsRequestingPosts.mockReturnValue(false);
    mockSelectPosts.mockReturnValue([
      {
        id: 1,
        isViewed: false,
      },
    ]);

    // Act
    const { getByTestId } = renderWithRedux(<HomePage />);

    // Assert
    expect(getByTestId('is-non-readed')).toBeInTheDocument();
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
      const postSelected = {
        id: 1,
        title: 'Brisa posts',
      };
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
