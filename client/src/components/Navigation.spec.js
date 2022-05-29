import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import Navigation from './Navigation'

describe('Navigation', () => {
  it('renders two navigation links', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    )

    const navigationLinks = screen.getAllByRole('link')
    expect(navigationLinks).toHaveLength(2)
  })
})
