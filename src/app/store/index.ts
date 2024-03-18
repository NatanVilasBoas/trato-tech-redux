import { configureStore } from "@reduxjs/toolkit";
import categoriasSlice from './reducers/categorias';
import itensSlice from './reducers/itens';
import carrinhoSlice from './reducers/carrinho';
import buscaSlice from './reducers/busca';
import { listener } from "./middlewares/categoria";

// configureStore cria e configura o armazenador das informações
const store = configureStore({
    //reducer são os pequenos pedaços de dados armazenados
    reducer: {
        categorias: categoriasSlice,
        itens: itensSlice,
        carrinho: carrinhoSlice,
        busca: buscaSlice,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(listener.middleware),
});

export default store;
// Para Tpescript, envia o tipo de categorias para outros códigos
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>