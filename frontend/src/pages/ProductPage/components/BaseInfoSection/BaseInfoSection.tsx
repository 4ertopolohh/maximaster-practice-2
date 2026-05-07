import AddToCartButton from '../../../../components/AddToCartButton/AddToCartButton';
import BuyButton from '../../../../components/BuyButton/BuyButton';
import styles from '../BaseInfoSection/BaseInfoSection.module.scss';

type Characteristic = {
    label: string;
    value: string;
};

type ImageItem = {
    image: string;
    alt_text: string;
};

export type BaseInfoSectionProps = {
    title: string;
    description: string;
    price: number;
    characteristics: Characteristic[];
    images: ImageItem[];
};

const BaseInfoSection = ({ title, description, price, characteristics, images }: BaseInfoSectionProps) => {
    const mainImage = images[0];

    return(
        <section className={styles.baseInfoSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.preview}>
                    <div className={styles.image}>
                        {mainImage && <img src={mainImage.image} alt={mainImage.alt_text || title} loading='lazy'/>}
                    </div>
                    <div className={styles.galery}>
                        <ul className={styles.list}>
                            {images.map((image, index) => (
                                <li key={`${image.image}-${index}`} className={styles.item}>
                                    <button className={styles.miniature} type='button'>
                                        <img src={image.image} alt={image.alt_text || title} loading='lazy'/>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={styles.info}>
                    <h1 className={styles.title}>{title}</h1>
                    <p className={styles.price}>{price.toFixed(2)} ₽</p>
                    <p className={styles.description}>{description}</p>
                    <ul className={styles.characteristics}>
                        {characteristics.map((char, index) => (
                            <li key={index} className={styles.characteristic}>
                                <span className={styles.label}>{char.label}</span>
                                <span className={styles.value}>{char.value}</span>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.buttons}>
                        <BuyButton />
                        <AddToCartButton />    
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BaseInfoSection;

