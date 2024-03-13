import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriasService from '../../../services/categorias';


export interface Categoria {
  nome: string;
  thumbnail: string;
  header: string;
  id: string;
  descricao: string;
}

const initialState: Categoria[] = [];

export const buscarCategorias = createAsyncThunk(
  'categorias/buscar',
  categoriasService.buscar
);

// createSlice cria um pedaço do reducers do store em Redux
const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  // criado reducers para evitar erro de incompatibilidade entre o tipo de initialState e as opções passadas para createSlice em relação ao Redux Toolkit.
  reducers: {
    addedCategorias: (state, { payload }) => {
      state.push(...payload);
    }
  },
  extraReducers: builder => {
    builder.addCase(
      buscarCategorias.fulfilled,
      (state, { payload }) => {
        state.push(...payload);
      }
    )
  }
});


export const { addedCategorias } = categoriasSlice.actions;
export default categoriasSlice.reducer;