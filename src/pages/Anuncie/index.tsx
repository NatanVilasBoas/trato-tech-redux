import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import Header from "../../components/Header";
import { RootState } from "../../app/store";
import { Categoria } from "../../app/store/reducers/categorias";
import styles from './Anuncie.module.scss';

const makeSelectCategorias = () => 
    createSelector((state: RootState) => state.categorias,
    (categorias: Categoria[]) => {
        return categorias.map(({nome, id}) => ({nome, id}))
    }
)

const Anuncie = () => {
    const selectCategorias = makeSelectCategorias();
    const categorias = useAppSelector(state => selectCategorias(state));

    return(
        <div>
            <Header 
            titulo="Anuncie aqui!"
            descricao="Anuncie seu produto no melhor site do Brasil!"
            className=""
            imagem=""
            />
            <form className={styles.formulario}>
                <label htmlFor="nome">Nome do Produto:</label>
                <input placeholder="Insira o nome do produto" name="nome" alt="nome do produto" />
                <label htmlFor="desc">Descrição do Produto:</label>
                <input placeholder="Insira a descrição do produto" name="desc" alt="descrição do produto" />
                <label htmlFor="imagem">URL da imagem do produto:</label>
                <input placeholder="Insira a URL da imagem" name="imagem" alt="URL da imagem do produto" />
                <label htmlFor="categoria">Categoria do produto:</label>
                <select name="categoria">
                    <option value=''>Selecione uma categoria</option>
                    {categorias.map(categoria => {
                        return <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                    })}
                </select>
                <label htmlFor="preco">Preço do produto:</label>
                <input placeholder="Informe o preço" name="preco" alt="preço do produto" />
                <button>Anunciar produto</button>
            </form>
        </div>
    )
}

export default Anuncie;