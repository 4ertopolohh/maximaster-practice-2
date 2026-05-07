import { Link } from 'react-router-dom';

import AddToCartButton from '../../../../components/AddToCartButton/AddToCartButton';
import BuyButton from '../../../../components/BuyButton/BuyButton';
import styles from '../ProductCard/ProductCard.module.scss';

export type ProductCardProps = {
    id: number;
    title: string;
    price: number;
    inStock: boolean;
    imageUrl: string | null;
    imageAlt?: string;
}

const ProductCard = ({ id, title, price, inStock, imageUrl, imageAlt }: ProductCardProps) => {
    return(
        <div className={styles.card} data-product-id={id}>
            <Link to={`/products/${id}`} className={styles.imageLink}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={imageAlt || `Фото товара ${title}`}
                        loading='lazy'
                        className={styles.image}
                    />
                ) : (
                    <div className={styles.imagePlaceholder} aria-label={`Изображение товара ${title} отсутствует`} />
                )}
            </Link>

            <h3 className={styles.title}>{title}</h3>

            <div className={styles.info}>
                <p className={styles.price}>{price.toFixed(2)} ₽</p>
                <p className={styles.inStock}>{inStock ? 'В наличии' : 'Нет в наличии'}</p>
            </div>

            <div className={styles.buttons}>
                <BuyButton />
                <AddToCartButton />
            </div>
        </div>
    )
}

export default ProductCard;

