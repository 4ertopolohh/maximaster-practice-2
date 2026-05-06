import AddToCartButton from '../../../../components/AddToCartButton/AddToCartButton';
import BuyButton from '../../../../components/BuyButton/BuyButton';
import styles from '../ProductCard/ProductCard.module.scss';

export type ProductCardProps = {
    id: number;
    title: string;
    price: number;
    inStock: boolean;
    imageUrl: string;
}

const ProductCard = ({ id, title, price, inStock, imageUrl }: ProductCardProps) => {
    return(
        <div className={styles.card} data-product-id={id}>
            <img src={imageUrl} alt='Фото продукта' loading='lazy' className={styles.image}/>

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
