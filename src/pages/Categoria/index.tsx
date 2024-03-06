import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Header from "../../components/Header";
import styles from './Categoria.module.scss';
import Item from "../../components/Item";

const Categoria = () => {
    const { nomeCategoria } = useParams();
    const {categoria, itens} = useAppSelector(state => ({
        categoria: state.categorias.find(categoria => categoria.id === nomeCategoria),
        itens: state.itens.filter(item => item.categoria === nomeCategoria)
    }));
    return (
        <div>
            {categoria ?
                <Header
                    titulo={categoria.nome}
                    descricao={categoria.descricao}
                    imagem={categoria.header}
                    className=''
                />
                :
                'A Categoria selecionada não foi encontrada :('
            }
            <div className={styles.itens}>
                {itens?.map(item => (
                    <Item key={item.id} {...item}/>
                ))}
            </div>
        </div>
    )
}

export default Categoria;