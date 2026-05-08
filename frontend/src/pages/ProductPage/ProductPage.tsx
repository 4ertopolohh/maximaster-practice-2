import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import BaseInfoSection from './components/BaseInfoSection/BaseInfoSection';
import CharacteristicsSection from './components/CharacteristicsSection/CharacteristicsSection';

type ProductImage = {
    id: number;
    image: string;
    alt_text: string;
    is_preview: boolean;
};

type ProductCharacteristic = {
    id: number;
    parameter: string;
    value: string;
};

type ProductDetail = {
    id: number;
    name: string;
    description: string;
    price: number | string;
    in_stock: boolean;
    sku: string;
    brand: string;
    preview_image: string | null;
    images: ProductImage[];
    characteristics: ProductCharacteristic[];
};

const ProductPage = () => {
    const { id } = useParams<{ id: string }>();

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError('Товар не найден.');
            setIsLoading(false);
            return;
        }

        const controller = new AbortController();

        const loadProduct = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await fetch(`/api/products/${id}/`, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error('Не удалось загрузить товар.');
                }

                const data: ProductDetail = await response.json();
                setProduct(data);
            } catch (err) {
                if (err instanceof Error && err.name !== 'AbortError') {
                    setError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        };

        loadProduct();

        return () => {
            controller.abort();
        };
    }, [id]);

    const characteristics = useMemo(() => {
        if (!product) {
            return [];
        }

        return [
            { label: 'Артикул', value: product.sku || '—' },
            { label: 'Бренд', value: product.brand || '—' },
            { label: 'Наличие', value: product.in_stock ? 'В наличии' : 'Нет в наличии' },
        ];
    }, [product]);

    const galleryImages = useMemo(() => {
        if (!product) {
            return [];
        }

        return product.images.map((image) => ({
            image: image.image,
            alt_text: image.alt_text || `Фото товара ${product.name}`,
        }));
    }, [product]);

    if (isLoading) {
        return (
            <main className='container'>
                <p>Загрузка товара...</p>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className='container'>
                <p>{error || 'Товар не найден.'}</p>
            </main>
        );
    }

    return (
        <main>
            <BaseInfoSection
                title={product.name}
                description={product.description}
                price={typeof product.price === 'string' ? Number(product.price) : product.price}
                characteristics={characteristics}
                images={galleryImages}
            />
            <CharacteristicsSection characteristics={product.characteristics.map((char) => ({
                name: char.parameter,
                value: char.value,
            }))} />
        </main>
    );
};

export default ProductPage;

