import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store";

// Para Typescript é recomendado a criação de hooks a partir do useSelector e useDispatch para assim estabelecer previamente nos hooks padrão a tipagem typescript
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;