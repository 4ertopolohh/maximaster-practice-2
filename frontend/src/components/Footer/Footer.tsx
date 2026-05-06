import styles from '../Footer/Footer.module.scss';

import gitHubIcon from '../../assets/images/icons/githubIcon.svg';
import tgIcon from '../../assets/images/icons/tgIcon.svg';
import vkIcon from '../../assets/images/icons/vkIcon.svg'; 

const Footer = () => {
    return(
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>

                <div className={styles.title}>
                    <h3>Производственная практика в компании Максимастер</h3>
                    <p>Май 2026</p>
                </div> 

                <p className={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum nostrum quas optio, voluptate expedita ipsam itaque magnam odit dolor quam. Commodi consectetur libero distinctio ratione. Expedita temporibus dolor fugit nostrum?</p>

                <div className={styles.links}>

                    <span className={styles.dev}>Разработчик: <a href="https://vk.com/isokolow504">Соколов Иван, 3 курс, РПО 23/2, IT TOP Collage</a></span>
                    
                    <ul className={styles.socials}>
                        <li className={styles.item}>
                            <a href="https://github.com/4ertopolohh" className={styles.link}>
                                <img src={gitHubIcon} alt="иконка" loading='lazy'/>
                            </a>
                        </li>
                        <li className={styles.item}>
                            <a href="https://t.me/T3riadStudio" className={styles.link}>
                                <img src={tgIcon} alt="иконка" loading='lazy'/>
                            </a>
                        </li>
                        <li className={styles.item}>
                            <a href="https://vk.com/triadstudio" className={styles.link}>
                                <img src={vkIcon} alt="иконка" loading='lazy'/>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
        </footer>
    )
}

export default Footer;