import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import categoriasService from '../../../services/categorias';
import { createStandaloneToast } from '@chakra-ui/react';

const {toast} = createStandaloneToast();

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
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        buscarCategorias.fulfilled,
        (_, { payload }) => {
          toast({
            title: 'Sucesso!',
            description: 'Categorias carregadas!',
            status: 'success',
            duration: 2000,
            isClosable: true,
          })
          return payload;
        }
      )
      .addCase(
        buscarCategorias.pending,
        () => {
          toast({
            title: 'Carregando...',
            description: 'Carregando Categorias',
            status: 'loading',
            duration: 2000,
            isClosable: true,
          })
        }
      )
      .addCase(
        buscarCategorias.rejected,
        () => {
          toast({
            title: 'Erro!',
            description: 'Consulta a Categorias rejeitada',
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
        }
      )
  }
});
export default categoriasSlice.reducer;