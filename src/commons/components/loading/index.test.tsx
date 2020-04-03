import React from 'react';
import { render } from '@testing-library/react';

import { Loading } from '.';

describe('Loading component', () => {
  it('should exist on the document', () => {
    const { getByTestId } = render(<Loading />);

    expect(getByTestId('locator-loading')).toBeInTheDocument();
  });
});
