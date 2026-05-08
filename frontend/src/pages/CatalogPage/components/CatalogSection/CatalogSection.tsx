import { useEffect, useMemo, useState } from 'react';

import Filter from '../Filter/Filter';
import CatalogPageTitle from '../CatalogPageTitle/CatalogPageTitle';
import styles from '../CatalogSection/CatalogSection.module.scss';
import ProductCard from '../ProductCard/ProductCard';

type FilterKey = 'price' | 'alphabet';
type SortDirection = 'asc' | 'desc';

type ProductApiItem = {
    id: number;
    name: string;
    price: number | string;
    in_stock: boolean;
    preview_image: string | null;
};

type Product = {
    id: number;
    title: string;
    price: number;
    inStock: boolean;
    imageUrl: string | null;
};

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
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [activeFilter, setActiveFilter] = useState<FilterKey | null>(null);
    const [directions, setDirections] = useState<Record<FilterKey, SortDirection>>({
        price: 'asc',
        alphabet: 'asc',
    });

    useEffect(() => {
        const controller = new AbortController();

        const loadProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch('/api/products/', { signal: controller.signal });
                if (!response.ok) {
                    throw new Error('Не удалось загрузить товары.');
                }

                const data: ProductApiItem[] = await response.json();
                const preparedProducts = data.map((item) => ({
                    id: item.id,
                    title: item.name,
                    price: typeof item.price === 'string' ? Number(item.price) : item.price,
                    inStock: item.in_stock,
                    imageUrl: item.preview_image,
                }));

                setProducts(preparedProducts);
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();

        return () => {
            controller.abort();
        };
    }, []);

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
    }, [activeFilter, directions, products]);

    const isPriceActive = activeFilter === 'price';
    const isAlphabetActive = activeFilter === 'alphabet';

    return(
        <section className={styles.catalogSection}>
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
                    {isLoading && <p>Загрузка товаров...</p>}
                    {!isLoading && error && <p>{error}</p>}
                    {!isLoading && !error && sortedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            price={product.price}
                            inStock={product.inStock}
                            imageUrl={product.imageUrl}
                            imageAlt={`Фото товара ${product.title}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CatalogSection;

