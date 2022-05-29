import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Upload from './Upload';

describe('Upload', () => {
  it('renders two navigation links, one input, one heading and one button', () => {
    render(
      <MemoryRouter>
        <Upload />
      </MemoryRouter>
    );

    const allNavigationLinks = screen.getAllByRole('link');
    const allInputs = screen.getAllByRole('textbox');
    const allHeadings = screen.getAllByRole('heading');
    const allButtons = screen.getAllByRole('button');

    expect(allNavigationLinks).toHaveLength(2);
    expect(allInputs).toHaveLength(1);
    expect(allHeadings).toHaveLength(1);
    expect(allButtons).toHaveLength(1);
  });
});
