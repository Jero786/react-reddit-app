import React from 'react';
import { render } from '@testing-library/react';
import { Drawer } from './index';

describe('Drawer', () => {
  it('should render the title properly ', () => {
    const { getByText } = render(<Drawer />);

    expect(getByText(/Reddis Post/i)).toBeInTheDocument();
  });

  it('should render the bottom title properly ', () => {
    const { getByText } = render(<Drawer />);

    expect(getByText(/dismiss all/i)).toBeInTheDocument();
  });

  it('should render the child elements properly', () => {
    const { getByText } = render(
      <Drawer>
        <>
          <div>Item 1</div>
          <div>Item 2</div>
        </>
      </Drawer>
    );

    expect(getByText(/item 1/i)).toBeInTheDocument();
    expect(getByText(/item 2/i)).toBeInTheDocument();
  });
});
