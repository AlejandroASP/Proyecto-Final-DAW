import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './pages/login';
import Index from './pages/index';
import Register from './pages/register';
import EditUser from '../src/pages/edit';
import Shop from './pages/shop';
import GameDetails from './pages/gameDetails';
import Cart from './pages/cart';

export function App() {
  return (
    <div className="bg-zinc-100 sm:flex flex-col min-h-screen h-full">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Index />} />
          <Route path='/register' element={<Register />} />
          <Route path='/edit' element={<EditUser />} />
          <Route path='/tienda' element={<Shop />} />
          <Route path='/details' element={<GameDetails />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}