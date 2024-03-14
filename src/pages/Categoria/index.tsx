import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/Header";
import styles from './Categoria.module.scss';
import Item from "../../components/Item";
import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Categoria as CategoriaType } from "../../app/store/reducers/categorias";
import { Itens } from "../../app/store/reducers/itens";
import { useAppSelector } from "../../app/hooks";
import Button from "../../components/Button";

// Define um seletor separado para a string de busca
const selectBusca = (state: RootState) => state.busca;

// Defina makeSelectCategoriaItens para aceitar a string de busca como argumento
const makeSelectCategoriaItens = () =>
    createSelector(
        // Use useSelector para acessar a string de busca do store
        (state: RootState) => selectBusca(state),
        // Use seletores individuais para extrair partes relevantes do estado
        (state: RootState) => state.categorias,
        (state: RootState) => state.itens,
        // Passe a string de busca como um argumento para o seletor criado por createSelector
        (busca: string, categorias: CategoriaType[], itens: Itens[]) => {
            const nomeCategoria = useParams().nomeCategoria;
            const categoria = categorias.find(categoria => categoria.id === nomeCategoria);
            if (!categoria) return { categoria: undefined, itens: [] };

            const regexp = new RegExp(busca, 'i');
            const itensFiltrados = itens.filter(item => item.categoria === nomeCategoria && item.titulo.match(regexp));

            return { categoria, itens: itensFiltrados };
        }
    );

const Categoria = () => {
    const { nomeCategoria } = useParams();
    const selectCategoriaItens = makeSelectCategoriaItens();
    const { categoria, itens } = useAppSelector((state) => selectCategoriaItens(state));
    const navigate = useNavigate();

    return (
        <div>
            {categoria ?
                <Header
                    titulo={categoria.nome}
                    descricao={categoria.descricao}
                    imagem={categoria.header}
                    className=''
                >
                    <Button type="button" onClick={() => navigate(`/anuncie/${nomeCategoria}`)}>
                        Anuncie seu produto
                    </Button>
                </Header>
                :
                'A Categoria selecionada não foi encontrada :('
            }
            <div className={styles.itens}>
                {itens?.map(item => (
                    <Item key={item.id} {...item} />
                ))}
            </div>
        </div>
    )
}

export default Categoria;