import { configureStore } from "@reduxjs/toolkit";
import categoriasSlice, { Categoria } from './reducers/categorias';
import itensSlice, { Itens } from './reducers/itens';
import carrinhoSlice, { CarrinhoState } from './reducers/carrinho';
import buscaSlice from './reducers/busca';
import { categoriasListener } from "./middlewares/categoria";
import { itensListener } from "./middlewares/itens";

// configureStore cria e configura o armazenador das informações
const store = configureStore({
    //reducer são os pequenos pedaços de dados armazenados
    reducer: {
        categorias: categoriasSlice,
        itens: itensSlice,
        carrinho: carrinhoSlice,
        busca: buscaSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(categoriasListener.middleware, itensListener.middleware),
});

export default store;
// Para Tpescript, envia o tipo de categorias para outros códigos
export type AppDispatch = typeof store.dispatch;
export interface RootState {
    categorias: Categoria[];
    itens: Itens[];
    carrinho: CarrinhoState;
    busca: string;
}