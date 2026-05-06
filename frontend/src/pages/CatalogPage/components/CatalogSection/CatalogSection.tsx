import { useMemo, useState } from 'react';

import Filter from '../Filter/Filter';
import CatalogPageTitle from '../CatalogPageTitle/CatalogPageTitle';
import styles from '../CatalogSection/CatalogSection.module.scss';
import ProductCard from '../ProductCard/ProductCard';

import product1 from '../../../../assets/images/pictures/product1.jpg';

type FilterKey = 'price' | 'alphabet';
type SortDirection = 'asc' | 'desc';

type Product = {
    id: number;
    title: string;
    price: number;
    inStock: boolean;
    imageUrl: string;
};

const products: Product[] = [
    { id: 1, title: 'Ананас', price: 320, inStock: true, imageUrl: product1 },
    { id: 2, title: 'Яблоко', price: 180, inStock: true, imageUrl: product1 },
    { id: 3, title: 'Вишня', price: 250, inStock: false, imageUrl: product1 },
    { id: 4, title: 'Груша', price: 150, inStock: true, imageUrl: product1 },
    { id: 5, title: 'Apple Juice', price: 210, inStock: true, imageUrl: product1 },
    { id: 6, title: 'Banana Mix', price: 140, inStock: false, imageUrl: product1 },
    { id: 7, title: 'Cherry Pie', price: 390, inStock: true, imageUrl: product1 },
    { id: 8, title: 'Date Syrup', price: 275, inStock: true, imageUrl: product1 },
];

const isRussianLetter = (value: string) => /[А-Яа-яЁё]/.test(value);
const isEnglishLetter = (value: string) => /[A-Za-z]/.test(value);

const getAlphabetGroup = (title: string): 'ru' | 'en' | 'other' => {
    const firstSymbol = title.trim().charAt(0);

    if (isRussianLetter(firstSymbol)) {
        return 'ru';
    }

    if (isEnglishLetter(firstSymbol)) {
        return 'en';
    }

    return 'other';
};

const CatalogSection = () => {
    const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);
    const [directions, setDirections] = useState<Record<FilterKey, SortDirection>>({
        price: 'asc',
        alphabet: 'asc',
    });

    const handleFilterClick = (filterKey: FilterKey) => {
        if (activeFilter !== filterKey) {
            setActiveFilter(filterKey);
            setDirections((prev) => ({
                ...prev,
                [filterKey]: 'asc',
            }));
            return;
        }

        setDirections((prev) => ({
            ...prev,
            [filterKey]: prev[filterKey] === 'asc' ? 'desc' : 'asc',
        }));
    };

    const sortedProducts = useMemo(() => {
        const preparedProducts = [...products];

        if (!activeFilter) {
            return preparedProducts;
        }

        const currentDirection = directions[activeFilter];

        if (activeFilter === 'price') {
            return preparedProducts.sort((a, b) => {
                return currentDirection === 'asc' ? a.price - b.price : b.price - a.price;
            });
        }

        const compareByAlphabet = (a: Product, b: Product) => {
            const result = a.title.localeCompare(b.title, ['ru', 'en'], {
                sensitivity: 'base',
            });

            return currentDirection === 'asc' ? result : -result;
        };

        const ruProducts = preparedProducts
            .filter((product) => getAlphabetGroup(product.title) === 'ru')
            .sort(compareByAlphabet);

        const enProducts = preparedProducts
            .filter((product) => getAlphabetGroup(product.title) === 'en')
            .sort(compareByAlphabet);

        const otherProducts = preparedProducts
            .filter((product) => getAlphabetGroup(product.title) === 'other')
            .sort(compareByAlphabet);

        return [...ruProducts, ...enProducts, ...otherProducts];
    }, [activeFilter, directions]);

    const isPriceActive = activeFilter === 'price';
    const isAlphabetActive = activeFilter === 'alphabet';

    return(
        <section className={styles.section}>
            <div className={`container ${styles.container}`}>
                <CatalogPageTitle />

                <div className={styles.filters}>
                    <Filter
                        title='По цене'
                        isActive={isPriceActive}
                        isIconRotated={isPriceActive && directions.price === 'desc'}
                        onToggle={() => handleFilterClick('price')}
                    />
                    <Filter
                        title='По алфавиту'
                        isActive={isAlphabetActive}
                        isIconRotated={isAlphabetActive && directions.alphabet === 'desc'}
                        onToggle={() => handleFilterClick('alphabet')}
                    />
                </div>

                <div className={styles.content}>
                    {sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            inStock={product.inStock}
                            imageUrl={product.imageUrl}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CatalogSection;
