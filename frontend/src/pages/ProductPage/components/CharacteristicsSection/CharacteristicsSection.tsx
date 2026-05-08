import styles from '../CharacteristicsSection/CharacteristicsSection.module.scss';

export type Characteristic = {
    name: string;
    value: string;
}

const CharacteristicsSection = ({ characteristics }: { characteristics: Characteristic[] }) => {
    return(
        <section className={styles.characteristicsSection}>
            <div className={`container ${styles.container}`}>
                <h2 className={styles.title}>Характеристики</h2>
                <ul className={styles.list}>
                    {characteristics.map((char, index) => (
                        <li className={styles.item} key={index}>
                            <span className={styles.name}>{char.name}:</span>
                            <span className={styles.value}>{char.value}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default CharacteristicsSection;