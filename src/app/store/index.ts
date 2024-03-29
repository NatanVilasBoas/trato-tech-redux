import { configureStore } from "@reduxjs/toolkit";
import categoriasSlice, { Categoria } from './reducers/categorias';
import itensSlice, { Itens } from './reducers/itens';
import carrinhoSlice, { CarrinhoState } from './reducers/carrinho';
import buscaSlice from './reducers/busca';
import { categoriasListener } from "./middlewares/categoria";
import { itensListener } from "./middlewares/itens";
import createSagaMiddleware from 'redux-saga';
import { categoriasSaga } from "./sagas/categorias";

const sagaMiddleware = createSagaMiddleware();

// configureStore cria e configura o armazenador das informações
const store = configureStore({
    //reducer são os pequenos pedaços de dados armazenados
    reducer: {
        categorias: categoriasSlice,
        itens: itensSlice,
        carrinho: carrinhoSlice,
        busca: buscaSlice,
    },
    middleware:
        getDefaultMiddleware =>
            getDefaultMiddleware().prepend(
                categoriasListener.middleware,
                itensListener.middleware,
                sagaMiddleware
            ),
});

sagaMiddleware.run(categoriasSaga);

export default store;
// Para Tpescript, envia o tipo de categorias para outros códigos
export type AppDispatch = typeof store.dispatch;
// antes era utilizado o código abaixo, mas não estava inferindo o tipo em middlewares corretamente
//export type RootState = ReturnType<typeof store.getState>

export interface RootState {
    categorias: Categoria[];
    itens: Itens[];
    carrinho: CarrinhoState;
    busca: string;
}