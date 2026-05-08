import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import ProductCard from './ProductCard';

describe('ProductCard', () => {
    it('renders product info and link to product page', () => {
        render(
            <MemoryRouter>
                <ProductCard
                    id={7}
                    title='Тестовый товар'
                    price={1234.5}
                    inStock={true}
                    imageUrl='https://example.com/product.jpg'
                />
            </MemoryRouter>,
        );

        expect(screen.getByText('Тестовый товар')).toBeInTheDocument();
        expect(screen.getByText('1234.50 ₽')).toBeInTheDocument();
        expect(screen.getByText('В наличии')).toBeInTheDocument();

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/products/7');
    });
});
