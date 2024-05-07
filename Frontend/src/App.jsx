import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../src/pages/login';
import Index from './index';
import Register from '../src/pages/edit';
import EditUser from '../src/pages/edit';


export function App() {
  return (
    <div className="bg-zinc-100 sm:flex flex-col min-h-screen h-full">
    <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Index />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/edit' element={<EditUser/>}/>
        </Routes>
    </BrowserRouter>
    </div>
  )
}