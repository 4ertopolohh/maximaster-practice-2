import AddToCartButton from '../../../../components/AddToCartButton/AddToCartButton';
import BuyButton from '../../../../components/BuyButton/BuyButton';
import styles from '../BaseInfoSection/BaseInfoSection.module.scss';

export type BaseInfoSectionProps = {
    title: string;
    description: string;
    characteristics: {
        label: string;
        value: string;
    }[];
    images: {
        preview: string;
        galery: string[];
    }
}

const BaseInfoSection = (props: BaseInfoSectionProps) => {
    return(
        <section className={styles.baseInfoSection}>
            <div className={`container ${styles.container}`}>
                <div className={styles.preview}>
                    <div className={styles.image}>
                        <img src={props.images.preview} alt={props.title} loading='lazy'/>
                    </div>
                    <div className={styles.galery}>
                        <ul className={styles.list}>
                            <li className={styles.item}>
                                <button className={styles.miniature}>
                                    <img src={props.images.galery[0]} alt={props.title} loading='lazy'/>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.info}>
                    <h1 className={styles.title}>{props.title}</h1>
                    <p className={styles.description}>{props.description}</p>
                    <ul className={styles.characteristics}>
                        {props.characteristics.map((char, index) => (
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