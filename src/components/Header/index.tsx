import styles from './Header.module.scss';


interface Props {
    titulo: string,
    descricao: string,
    className: string,
    imagem: string
}

const Header = ({ titulo, descricao, className = '', imagem }: Props) => {
    return (
        <header className={`${styles.header} ${className}`}>
            <div className={styles['header-texto']}>
                <h1>{titulo}</h1>
                <h2>{descricao}</h2>
            </div>
            <div className={styles['header-imagem']}>
                <img
                    alt={titulo}
                    src={imagem}
                />
            </div>
        </header>
    )
}

export default Header;