import { createSlice } from "@reduxjs/toolkit";

const initialState = '';

const buscaSlice = createSlice({
    name: 'busca',
    initialState,
    reducers: {
        changedSearch: (_state, {payload}) => payload,
        resetSearch: () => initialState,
    }
})

export const { changedSearch, resetSearch } = buscaSlice.actions;

export default buscaSlice.reducer;