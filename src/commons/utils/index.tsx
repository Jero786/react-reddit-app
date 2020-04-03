import { createStore } from 'redux';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import moment from 'moment';

import React, { ReactElement } from 'react';
import { DefaultState, initialState } from '../../features/home/reducers';
import { reducer } from '../../features/home';

const URL_REGEX = /^(((H|h)(T|t)(T|t)(P|p)(S|s)?):\/\/)?[-a-zA-Z0-9@:%._\+~#=]{2,100}\.[a-zA-Z]{2,10}(\/([-a-zA-Z0-9@:%_\+.~#?&//=]*))?/; // eslint-disable-line

/**
 * Validate if given url is valid or not.
 * @param url
 */
export const isValidUrl = (url: string) => {
  return URL_REGEX.test(url);
};

/**
 * A test utils that help us to test mock view containers.
 * @param ui
 * @param customInitialState
 */
export function renderWithRedux(
  ui: ReactElement,
  customInitialState: DefaultState
) {
  const store = createStore(reducer, customInitialState || initialState);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}

/**
 * Given a date return how long time passed from that date.
 * @param date
 */
export function getDate(date: number) {
  return moment.unix(date).fromNow();
}
