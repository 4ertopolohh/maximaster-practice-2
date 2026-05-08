import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, vi } from 'vitest';

import CatalogSection from './CatalogSection';

describe('CatalogSection', () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('renders products when API request succeeds', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => [
                {
                    id: 1,
                    name: 'Тестовый товар',
                    price: '299.99',
                    in_stock: true,
                    preview_image: '/media/products/item.jpg',
                },
            ],
        } as Response);

        render(
            <MemoryRouter>
                <CatalogSection />
            </MemoryRouter>,
        );

        expect(await screen.findByText('Тестовый товар')).toBeInTheDocument();
        expect(screen.queryByText('Товары сейчас недоступны')).not.toBeInTheDocument();
    });

    it('shows fallback message when API request fails', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: false,
            json: async () => [],
        } as Response);

        render(
            <MemoryRouter>
                <CatalogSection />
            </MemoryRouter>,
        );

        expect(await screen.findByText('Товары сейчас недоступны')).toBeInTheDocument();
    });
});
