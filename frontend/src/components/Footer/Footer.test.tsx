import { render, screen } from '@testing-library/react';

import Footer from './Footer';

describe('Footer', () => {
    it('renders external links with href attributes', () => {
        render(<Footer />);

        const links = screen.getAllByRole('link');
        const hrefs = links
            .map((link) => link.getAttribute('href') ?? '')
            .filter(Boolean);

        expect(hrefs.length).toBeGreaterThanOrEqual(4);
        expect(hrefs.some((href) => href.includes('vk.com/isokolow504'))).toBe(true);
        expect(hrefs.some((href) => href.includes('github.com/4ertopolohh'))).toBe(true);
        expect(hrefs.some((href) => href.includes('t.me/T3riadStudio'))).toBe(true);
        expect(hrefs.some((href) => href.includes('vk.com/triadstudio'))).toBe(true);
    });
});
