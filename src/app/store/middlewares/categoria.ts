import { createListenerMiddleware } from "@reduxjs/toolkit";
import { adicionarTodasAsCategorias, carregarCategorias } from "../reducers/categorias";
import categoriasService from "../../../services/categorias";
import { createStandaloneToast } from "@chakra-ui/react";

export const listener = createListenerMiddleware();

const { toast } = createStandaloneToast();

listener.startListening({
    actionCreator: carregarCategorias,
    effect: async (action, { dispatch, fork }) => {
        toast({
            title: 'Carregando...',
            description: 'Carregando Categorias',
            status: 'loading',
            duration: 1500,
        })
        const tarefa = fork(async () => {
            return await categoriasService.buscar();
        });

        const resposta = await tarefa.result;

        if (resposta.status === 'ok') {
            toast({
                title: 'Sucesso!',
                description: 'Categorias carregadas!',
                status: 'success',
                duration: 1500,
            })
            dispatch(adicionarTodasAsCategorias(resposta.value));
        }
        if (resposta.status === 'rejected') {
            toast({
                title: 'Erro!',
                description: 'Consulta a Categorias rejeitada',
                status: 'error',
                duration: 1500,
            })
        }
    }
})