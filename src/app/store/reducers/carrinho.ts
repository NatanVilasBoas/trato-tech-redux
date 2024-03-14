import { createStandaloneToast } from "@chakra-ui/react";
import { createSlice } from "@reduxjs/toolkit";

const {toast} = createStandaloneToast();

export interface CarrinhoItem {
    id: string,
    quantidade: number
}

export interface CarrinhoState extends Array<CarrinhoItem> { }

const initialState: CarrinhoState = [];

const carrinhoSlice = createSlice({
    name: 'carrinho',
    initialState,
    reducers: {
        changedCart: (state, { payload }) => {
            const hasItem = state.some(item => item.id === payload);
            if (hasItem) {
                return state.filter(item => item.id !== payload);
            } else{
                toast({
                    title:'Item no carrinho!',
                    description:"O item foi adicionado ao seu carrinho",
                    status:'info',
                    duration: 1500,
                    isClosable: true,
                })
                return [
                    ...state,
                    {
                        id: payload,
                        quantidade: 1
                    }
                ]
            }
        },
        changedAmount: (state, { payload }) => {
            state.map(item => {
                if (item.id === payload.id) item.quantidade += payload.quantidade;
                return item;
            })
        },
        resetCart: () => {
            toast({
                title:'Compra realizada!',
                description:"Compra efetivada e carrinho esvaziado",
                status:'success',
                duration: 1500,
                isClosable: true,
            })
            return initialState
        }
    },
})

export const { changedCart, changedAmount, resetCart } = carrinhoSlice.actions;

export default carrinhoSlice.reducer;