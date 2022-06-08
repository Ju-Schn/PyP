import {MemoryRouter} from 'react-router-dom'
import { render, screen } from '@testing-library/react'

import Gallery from './Gallery'


describe('Gallery', () => {
    it('renders one heading, two buttons and two navigation links', () => {
        render(
            <MemoryRouter>
                <Gallery />
            </MemoryRouter>
        );

        const allHeadings = screen.getAllByRole('heading')
        const allButtons = screen.getAllByRole('button')
        const navigationLinks = screen.getAllByRole('link');

        expect(allHeadings).toHaveLength(1)
        expect(allButtons).toHaveLength(2);
        expect(navigationLinks).toHaveLength(2);

    })
})