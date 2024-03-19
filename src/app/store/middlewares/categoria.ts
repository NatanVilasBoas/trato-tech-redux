import { createListenerMiddleware } from "@reduxjs/toolkit";
import { adicionarTodasAsCategorias, adicionarUmaCategoria, carregarCategorias, carregarUmaCategoria } from "../reducers/categorias";
import categoriasService from "../../../services/categorias";
import criarTarefa from "./utils/criarTarefa";

export const listener = createListenerMiddleware();

listener.startListening({
    actionCreator: carregarCategorias,
    effect: async (_, { dispatch, fork, unsubscribe }) => {

        await criarTarefa({
            fork,
            dispatch,
            action: adicionarTodasAsCategorias,
            busca: categoriasService.buscar,
            textoCarregando: 'Carregando Categorias',
            textoSucesso: 'Categorias carregadas!',
            textoErro: 'Consulta a Categorias rejeitada'
        })
        unsubscribe();
    }
})

listener.startListening({
    actionCreator: carregarUmaCategoria,
    effect: async (action, { fork, dispatch}) => {
        const nomeCategoria = action.payload;
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