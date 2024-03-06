import { useParams } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import Header from "../../components/Header";

const Categoria = () => {
    const { nomeCategoria } = useParams();
    const categoria = useAppSelector(state => state.categorias.find(categoria => categoria.id === nomeCategoria));
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
        </div>
    )
}

export default Categoria;