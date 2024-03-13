import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Header from "../../components/Header";
import { RootState } from "../../app/store";
import { Categoria } from "../../app/store/reducers/categorias";
import styles from './Anuncie.module.scss';
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { Itens, createdItem } from "../../app/store/reducers/itens";
import { useParams } from "react-router-dom";
import Input from "../../components/Input";

const makeSelectCategorias = () =>
    createSelector((state: RootState) => state.categorias,
        (categorias: Categoria[]) => {
            return categorias.map(({ nome, id }) => ({ nome, id }))
        }
    )

const Anuncie = () => {
    const dispatch = useAppDispatch();
    const { nomeCategoria = '' } = useParams();
    const selectCategorias = makeSelectCategorias();
    const categorias = useAppSelector(state => selectCategorias(state));
    const { register, handleSubmit, formState } = useForm({
        defaultValues: {
            categoria: nomeCategoria,
            titulo: '',
            descricao: '',
            foto: '',
            preco: 0,
        }
    });

    const cadastrar = (data: Itens) => {
        dispatch(createdItem(data));
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
                <label htmlFor="titulo">Nome do Produto:</label>
                {errors.titulo &&
                    <span className={styles['mensagem-erro']}>
                        {errors.titulo.message}
                    </span>}
                <Input
                    className={errors.titulo ? styles['input-erro'] : ''}
                    {...register('titulo', { required: 'É necessário preencher o nome do produto' })}
                    placeholder="Insira o nome do produto"
                    name="titulo"
                    alt="nome do produto" />

                <label htmlFor="descricao">Descrição do Produto:</label>
                {errors.descricao &&
                    <span className={styles['mensagem-erro']}>
                        {errors.descricao.message}
                    </span>}
                <Input
                    className={errors.descricao ? styles['input-erro'] : ''}
                    {...register('descricao', { required: 'É necessário preencher o campo com a descrição do produto' })}
                    placeholder="Insira a descrição do produto"
                    name="descricao"
                    alt="descrição do produto" />

                <label htmlFor="foto">URL da imagem do produto:</label>
                {errors.foto &&
                    <span className={styles['mensagem-erro']}>
                        {errors.foto.message}
                    </span>}
                <Input
                    className={errors.foto ? styles['input-erro'] : ''}
                    {...register('foto', { required: 'É necessário preencher o campo com a URL da imagem do produto' })}
                    placeholder="Insira a URL da imagem"
                    name="foto"
                    alt="URL da imagem do produto" />

                <label htmlFor="categoria">Categoria do produto:</label>
                {errors.categoria &&
                    <span className={styles['mensagem-erro']}>
                        {errors.categoria.message}
                    </span>}
                <select
                    className={errors.categoria ? styles['input-erro'] : ''}
                    {...register('categoria', { required: 'É necessário selecionar a categoria' })}
                    name="categoria" disabled={!!nomeCategoria}>
                    <option value='' disabled>Selecione uma categoria</option>
                    {categorias.map(categoria => {
                        return <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
                    })}
                </select>

                <label htmlFor="preco">Preço do produto:</label>
                {errors.preco &&
                    <span className={styles['mensagem-erro']}>
                        {errors.preco.message}
                    </span>}
                <Input
                    className={errors.preco ? styles['input-erro'] : ''}
                    {...register('preco', { required: 'É necessário preencher o campo com o valor do produto', valueAsNumber: true })}
                    type="number"
                    placeholder="Informe o preço"
                    name="preco"
                    alt="preço do produto" />

                <Button type="submit">
                    Anunciar produto
                </Button>
            </form>
        </div>
    )
}

export default Anuncie;