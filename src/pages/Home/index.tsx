import Header from '../../components/Header';
import styles from './Home.module.scss';
import relogio from '../../assets/inicial.png';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Categoria } from '../../store/reducers/categorias';

interface RootState {
    categorias: Categoria[]; // Use o tipo que representa o estado do reducer 'categoriasSlice'
  }

const Home = () => {
    const navigate = useNavigate();
    const categorias : Categoria[] = useSelector((state: RootState) => state.categorias);
    return (
        <div>
            <Header
                titulo='Classificados Tech'
                descricao='Compre diversos tipos de produtos no melhor site do Brasil!'
                className={styles.header}
                imagem={relogio}
            />
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