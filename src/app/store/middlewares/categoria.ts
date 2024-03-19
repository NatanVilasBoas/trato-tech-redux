import { createListenerMiddleware } from "@reduxjs/toolkit";
import { adicionarTodasAsCategorias, adicionarUmaCategoria, carregarCategorias, carregarUmaCategoria } from "../reducers/categorias";
import categoriasService from "../../../services/categorias";
import criarTarefa from "./utils/criarTarefa";

export const categoriasListener = createListenerMiddleware();

categoriasListener.startListening({
    actionCreator: carregarCategorias,
    effect: async (_, { dispatch, fork, unsubscribe }) => {

        const resposta = await criarTarefa({
            fork,
            dispatch,
            action: adicionarTodasAsCategorias,
            busca: categoriasService.buscar,
            textoCarregando: 'Carregando Categorias',
            textoSucesso: 'Categorias carregadas!',
            textoErro: 'Consulta a Categorias rejeitada'
        })
        if (resposta.status === 'ok') {
            unsubscribe();
        }
    }
})

categoriasListener.startListening({
    actionCreator: carregarUmaCategoria,
    effect: async (action, { fork, dispatch, getState, unsubscribe, }) => {
        const { categorias } = getState();
        const nomeCategoria = action.payload;
        const categoriaCarregada = categorias.some(categoria => categoria.id === nomeCategoria);

        if (categoriaCarregada) return;
        if (categorias.length === 5) return unsubscribe();

        await criarTarefa({
            fork,
            dispatch,
            action: adicionarUmaCategoria,
            busca: () => categoriasService.buscarUmaCategoria(nomeCategoria),
            textoCarregando: `Carregando Categoria ${nomeCategoria}`,
            textoSucesso: `Categoria ${nomeCategoria} carregada!`,
            textoErro: `Consulta a Categoria ${nomeCategoria} rejeitada`
        })
    }
})