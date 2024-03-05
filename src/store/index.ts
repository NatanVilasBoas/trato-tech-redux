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