import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';
import itensService from '../../../services/itens';

export interface Itens {
  titulo: string;
  descricao: string;
  foto: string;
  favorito?: boolean;
  preco: number;
  id?: string;
  categoria: string;
}


const initialState: Itens[] = [];

export const buscarItens = createAsyncThunk(
  'itens/buscar',
  itensService.buscar
)

// createSlice cria um pedaço do reducers do store em Redux
const itensSlice = createSlice({
  name: 'itens',
  initialState,
  // criado reducers para evitar erro de incompatibilidade entre o tipo de initialState e as opções passadas para createSlice em relação ao Redux Toolkit.
  reducers: {
    changedFavourite: (state, { payload }) => {
      state.map(item => {
        if (item.id === payload) item.favorito = !item.favorito;
        return item;
      })
    },
    createdItem: (state, action: PayloadAction<Itens>) => {
      state.push({ ...action.payload, id: uuid(), favorito: false })
    },
    changedItem: (state, { payload }) => {
      const index = state.findIndex(item => item.id === payload.id);
      Object.assign(state[index], payload.item);
    },
    deletedItem: (state, { payload }) => {
      const index = state.findIndex(item => item.id === payload);
      state.splice(index, 1);
    },
    addedItens: (state, { payload }) => {
      state.push(...payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(
      buscarItens.fulfilled,
      (state, { payload }) => {
        state.push(...payload)
      }
    )
  }
});

export const { changedFavourite, createdItem, changedItem, deletedItem, addedItens } = itensSlice.actions;

export default itensSlice.reducer;