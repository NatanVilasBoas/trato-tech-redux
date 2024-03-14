import styles from './Footer.module.scss';
import { FaBehance, FaGithub, FaLinkedin } from 'react-icons/fa';

const iconProps = {
    color: 'white',
    size: 24
}

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div>
                <a href='https://www.behance.net/natancarvalho2' target='blank'>
                    <FaBehance  {...iconProps} cursor='pointer' />
                </a>
                <a href='https://github.com/NatanVilasBoas' target='blank'>
                    <FaGithub  {...iconProps} cursor='pointer' />
                </a>
                <a href='https://www.linkedin.com/in/natan-vilas-boas-00b102224/' target='blank'>
                    <FaLinkedin  {...iconProps} cursor='pointer' />
                </a>
            </div>
            <span>
                Desenvolvido por <a href='https://github.com/NatanVilasBoas/trato-tech-redux' target='blank'>Natan Vilas Boas</a>.
            </span>
        </footer>
    )
}

export default Footer;