import { createListenerMiddleware } from "@reduxjs/toolkit";
import { carregarUmaCategoria } from "../reducers/categorias";
import criarTarefa from "./utils/criarTarefa";
import itensService from "../../../services/itens";
import { addedItems } from "../reducers/itens";
import { RootState } from "..";

export const itensListener = createListenerMiddleware();

itensListener.startListening({
    actionCreator: carregarUmaCategoria,
    effect: async (action, { fork, dispatch, getState, unsubscribe}) => {
        const state: RootState = getState();

        if(state.itens.length === 25) return unsubscribe();

        const nomeCategoria = action.payload;
        const itensCarregados = state.itens.some(item => item.categoria === nomeCategoria);

        if(itensCarregados) return;

        await criarTarefa({
            fork,
            dispatch,
            action: addedItems,
            busca:() => itensService.buscarDeCategorias(nomeCategoria),
            textoCarregando: `Carregando Itens da categoria ${nomeCategoria}`,
            textoSucesso: `Itens da categoria ${nomeCategoria} carregados!`,
            textoErro: `Consulta a Itens da categoria ${nomeCategoria} rejeitada`
        })
    }
})