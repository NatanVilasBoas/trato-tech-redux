import { createSelector } from "@reduxjs/toolkit";
import { useAppSelector } from "../../app/hooks";
import Header from "../../components/Header";
import { RootState } from "../../app/store";
import { Categoria } from "../../app/store/reducers/categorias";
import styles from './Anuncie.module.scss';
import Button from "../../components/Button";
import { useForm } from "react-hook-form";

const makeSelectCategorias = () =>
    createSelector((state: RootState) => state.categorias,
        (categorias: Categoria[]) => {
            return categorias.map(({ nome, id }) => ({ nome, id }))
        }
    )

const Anuncie = () => {
    const selectCategorias = makeSelectCategorias();
    const categorias = useAppSelector(state => selectCategorias(state));
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            categoria: '',
            nome: '',
            descricao: '',
            imagem: '',
            preco: '',
        }
    });

    const cadastrar = (params: object) => {
        console.log(params)
    }

    const { errors } = formState;

    return (
        <div>
            <Header
                titulo="Anuncie aqui!"
                descricao="Anuncie seu produto no melhor site do Brasil!"
                className=""
                imagem=""
            />
            <form className={styles.formulario} onSubmit={handleSubmit(cadastrar)}>
                <label htmlFor="nome">Nome do Produto:</label>
                {errors.nome && <span className={styles['mensagem-erro']}> {errors.nome.message} </span>}
                <input className={errors.nome ? styles['input-erro'] : ''} {...register('nome', { required: 'É necessário preencher o nome do produto' })} placeholder="Insira o nome do produto" name="nome" alt="nome do produto" />

                <label htmlFor="descricao">Descrição do Produto:</label>
                {errors.descricao && <span className={styles['mensagem-erro']}> {errors.descricao.message} </span>}
                <input className={errors.descricao ? styles['input-erro'] : ''} {...register('descricao', { required: 'É necessário preencher o campo com a descrição do produto' })} placeholder="Insira a descrição do produto" name="descricao" alt="descrição do produto" />

                <label htmlFor="imagem">URL da imagem do produto:</label>
                {errors.imagem && <span className={styles['mensagem-erro']}> {errors.imagem.message} </span>}
                <input className={errors.imagem ? styles['input-erro'] : ''} {...register('imagem', { required: 'É necessário preencher o campo com a URL da imagem do produto' })} placeholder="Insira a URL da imagem" name="imagem" alt="URL da imagem do produto" />

                <label htmlFor="categoria">Categoria do produto:</label>
                {errors.categoria && <span className={styles['mensagem-erro']}> {errors.categoria.message} </span>}
                <select className={errors.categoria ? styles['input-erro'] : ''} {...register('categoria', { required: 'É necessário selecionar a categoria' })} name="categoria">
                    <option value='' disabled>Selecione uma categoria</option>
                    {categorias.map(categoria => {
                        return <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                    })}
                </select>

                <label htmlFor="preco">Preço do produto:</label>
                {errors.preco && <span className={styles['mensagem-erro']}> {errors.preco.message} </span>}
                <input className={errors.preco ? styles['input-erro'] : ''} {...register('preco', { required: 'É necessário preencher o campo com o valor do produto' })} type="number" placeholder="Informe o preço" name="preco" alt="preço do produto" />

                <Button type="submit">
                    Anunciar produto
                </Button>
            </form>
        </div>
    )
}

export default Anuncie;