import { configureStore } from "@reduxjs/toolkit";
import categoriasSlice from './reducers/categorias';

// configureStore cria e configura o armazenador das informações
const store = configureStore({
    //reducer são os pequenos pedaços de dados armazenados
    reducer:{
        categorias: categoriasSlice
    }
});

export default store;
// Para Tpescript, envia o tipo de categorias para outros códigos
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>