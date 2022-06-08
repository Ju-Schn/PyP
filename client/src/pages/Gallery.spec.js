import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Gallery from './Gallery';

describe('Gallery', () => {
  it('renders one heading, two buttons(one filter button and one reset filter button) and two navigation links', () => {
    render(
      <MemoryRouter>
        <Gallery />
      </MemoryRouter>
    );

    const allHeadings = screen.getAllByRole('heading');
    const allButtons = screen.getAllByRole('button');
    const navigationLinks = screen.getAllByRole('link');
    const filterButton = screen.getByRole('button', { name: /filter/i });
    const resetFilterButton = screen.getByRole('button', { name: /reset/i });

    expect(allHeadings).toHaveLength(1);
    expect(allButtons).toHaveLength(2);
    expect(navigationLinks).toHaveLength(2);
    expect(filterButton).toBeInTheDocument();
    expect(resetFilterButton).toBeInTheDocument();
  });
});
