import styles from '../Filter/Filter.module.scss';

import arrowIcon from '../../../../assets/images/icons/arrowIcon.svg';
import arrowIconWhite from '../../../../assets/images/icons/arrowIconWhite.svg';

export type FilterProps = {
    title: string;
    isActive: boolean;
    isIconRotated: boolean;
    onToggle: () => void;
}

const Filter = ({ title, isActive, isIconRotated, onToggle }: FilterProps) => {
    return(
        <button
            className={`${styles.filter} ${isActive ? styles.active : ''}`}
            onClick={onToggle}
            type="button"
        >
            <span className={styles.title}>{title}</span>
            <img
                src={isActive ? arrowIconWhite : arrowIcon}
                className={`${styles.icon} ${isIconRotated ? styles.iconActive : ''}`}
                alt="arrow"
                loading="lazy"
            />
        </button>
    )
}

export default Filter;
