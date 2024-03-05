import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaginaPadrao from './components/PaginaPadrao';

export default function AppRouter(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<PaginaPadrao/>}>
                <Route index element={<div>Home</div>}/>
            </Route>
        </Routes>
        </BrowserRouter>
    )
}