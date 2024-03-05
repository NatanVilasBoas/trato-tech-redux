import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg';
import classNames from 'classnames';
import { RiShoppingCart2Line, RiShoppingCartFill } from 'react-icons/ri';

const iconProps = {
    color: 'white',
    size: 24
}

const Navbar = () => {
    return (
        <nav className={styles.nav}>
            <img className={styles.logo} src={logo} alt='Log' />
            <div className={styles.links}>
                <div>
                    <a href='/' className={classNames(styles.link, {
                        [styles.selected]: window.location.pathname === '/'
                    })}>
                        Página Inicial
                    </a>
                </div>
            </div>
            <div className={styles.busca}>

            </div>
            <div className={styles.icones}>
                <a href='/carrinho'>
                    {window.location.pathname === '/carrinho'
                        ? <RiShoppingCartFill {...iconProps} />
                        : < RiShoppingCart2Line {...iconProps} />
                    }
                </a>
            </div>
        </nav>
    )
}

export default Navbar;