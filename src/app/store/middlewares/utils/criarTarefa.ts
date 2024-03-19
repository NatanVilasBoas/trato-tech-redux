import { createStandaloneToast } from "@chakra-ui/react";
import { ActionCreatorWithPayload, ForkedTask, ForkedTaskExecutor, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

const { toast } = createStandaloneToast();

interface Props{
    fork: <T>(executor: ForkedTaskExecutor<T>, options?: | undefined) => ForkedTask<T>,
    dispatch: ThunkDispatch<unknown, unknown, UnknownAction>,
    action: ActionCreatorWithPayload<"categorias/adicionarTodasAsCategorias">,
    busca: () => Promise<any>,
    textoCarregando: string,
    textoSucesso: string,
    textoErro: string,
}

export default async function criarTarefa({
    fork,
    dispatch,
    action,
    busca,  
    textoCarregando,
    textoSucesso,
    textoErro
}: Props) {
    toast({
        title: 'Carregando...',
        description: textoCarregando,
        status: 'loading',
        duration: 1500,
    })
    const tarefa = fork(async () => {
        return await busca();
    });

    const resposta = await tarefa.result;

    if (resposta.status === 'ok') {
        toast({
            title: 'Sucesso!',
            description: textoSucesso,
            status: 'success',
            duration: 1500,
        })
        dispatch(action(resposta.value));
    }
    if (resposta.status === 'rejected') {
        toast({
            title: 'Erro!',
            description: textoErro,
            status: 'error',
            duration: 1500,
        })
    }
}