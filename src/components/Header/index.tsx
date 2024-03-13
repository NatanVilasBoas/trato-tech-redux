import { ReactNode, useEffect } from 'react';
import styles from './Header.module.scss';
import { useAppDispatch } from '../../app/hooks';
import { buscarCategorias } from '../../app/store/reducers/categorias';
import { buscarItens } from '../../app/store/reducers/itens';

interface Props {
  titulo: string,
  descricao: string,
  className: string,
  imagem: string,
  children?: ReactNode,
}

const Header = ({ titulo, descricao, className = '', imagem, children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(buscarCategorias());
    dispatch(buscarItens());
  }, [dispatch])

  return (
    <header className={`${styles.header}`}>
      {imagem !== '' &&
        <div className={`${className} ${styles.headerWithImage}`}>
          <div className={styles['headerWithImage-texto']}>
            <h1>{titulo}</h1>
            <h2>{descricao}</h2>
            {children}
          </div>
          <div className={styles['headerWithImage-imagem']}>
            <img
              alt={titulo}
              src={imagem}
            />
          </div>
        </div>
      }
      {imagem === '' && <div className={styles.container}>
        <h1 className={styles.titulo}>
          {titulo}
        </h1>
        <h2 className={styles.descricao}>
          {descricao}
        </h2>
      </div>}
    </header>
  )
}

export default Header;