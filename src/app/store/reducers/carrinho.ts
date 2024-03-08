import { createSlice } from "@reduxjs/toolkit";

export interface CarrinhoItem {
    id: string,
    quantidade: number
}

export interface CarrinhoState extends Array<CarrinhoItem>{}

const initialState: CarrinhoState = [];

const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        changedCart: (state, {payload}) => {
            const hasItem = state.some(item => item.id === payload);
            if(hasItem){
                return state.filter(item => item.id !== payload);
            }
            return [
                ...state,
                {
                    id: payload,
                    quantidade: 1
                }
            ]
        },
        changedAmount: (state, {payload}) => {
            state.map(item => {
                if(item.id === payload.id ) item.quantidade += payload.quantidade;
                return item;
            })
        }
    }
})

export const { changedCart, changedAmount } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;