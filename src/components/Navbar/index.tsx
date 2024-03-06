import styles from './Navbar.module.scss';
import logo from '../../assets/logo.svg';
import classNames from 'classnames';
import { RiShoppingCart2Line, RiShoppingCartFill } from 'react-icons/ri';
import Busca from '../Busca';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const iconProps = {
    color: 'white',
    size: 24
}

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    return (
        <nav className={styles.nav}>
            <img className={styles.logo} src={logo} alt='Log' onClick={() => navigate('/')} />
            <div className={styles.links}>
                <div>
                    <Link to='/' className={classNames(styles.link, {
                        [styles.selected]: location.pathname === '/'
                    })}>
                        Página Inicial
                    </Link>
                </div>
            </div>
            <div className={styles.busca}>
                <Busca/>
            </div>
            <div className={styles.icones}>
                <Link to='/carrinho'>
                    {location.pathname === '/carrinho'
                        ? <RiShoppingCartFill {...iconProps} />
                        : < RiShoppingCart2Line {...iconProps} />
                    }
                </Link>
            </div>
        </nav>
    )
}

export default Navbar;