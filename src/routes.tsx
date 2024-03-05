import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaPadrao from './components/PaginaPadrao';
import Home from "./pages/Home";

export default function AppRouter(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<PaginaPadrao/>}>
                <Route index element={<Home/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}