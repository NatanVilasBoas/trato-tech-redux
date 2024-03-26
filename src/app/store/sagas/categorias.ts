import { takeEvery } from 'redux-saga/effects';
import { carregarCategorias } from '../reducers/categorias';
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

function* observarCategorias() {
    yield console.log('observando')
    toast({
        title: 'Carregando...',
        description: `Carregando Categoria`,
        status: 'loading',
        duration: 1500,
    })
    toast({
        title: 'Sucesso!',
        description: `Categoria carregada!`,
        status: 'success',
        duration: 1500,
    })
    toast({
        title: 'Erro!',
        description: `Consulta a Categoria rejeitada`,
        status: 'error',
        duration: 1500,
    })
}

export function* categoriasSaga() {
    yield takeEvery(carregarCategorias, observarCategorias)
}