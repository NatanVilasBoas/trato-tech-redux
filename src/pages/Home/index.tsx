import Header from '../../components/Header';
import styles from './Home.module.scss';
import relogio from '../../assets/inicial.png';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import Button from '../../components/Button';
import { useEffect } from 'react';
import { carregarCategorias } from '../../app/store/reducers/categorias';
import { buscarItens } from '../../app/store/reducers/itens';

const Home = () => {
    const navigate = useNavigate();
    const categorias = useAppSelector((state) => state.categorias);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(carregarCategorias());
        dispatch(buscarItens());
    }, [dispatch])

    return (
        <div>
            <Header
                titulo='Classificados Tech'
                descricao='Compre diversos tipos de produtos no melhor site do Brasil!'
                className={styles.header}
                imagem={relogio}
            >
                <Button type="button" onClick={() => navigate('/anuncie')}>
                    Quero anunciar
                </Button>
            </Header>
            <div className={styles.categorias}>
                <div className={styles['container-title']}>
                    <h1>Categorias</h1>
                </div>
                <div className={styles['categorias-container']}>
                    {categorias.map((categoria, index) => (
                        <div key={index} onClick={() => navigate(`/categoria/${categoria.id}`)}>
                            <img src={categoria.thumbnail} alt={categoria.nome} />
                            <h1>{categoria.nome}</h1>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home;