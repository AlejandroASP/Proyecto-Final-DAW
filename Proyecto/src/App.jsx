
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './templates/Login/login';
import Index from './index';
import Register from './register';
import EditUser from './templates/User/edit';


export function App() {
  return (
    //Router es el padre que va a gestionar los redireccionamientos
    //Se ha puesto para no tener contenido html en esta parte y 
    //tener las vistas más limpias
    <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Index />} />
          <Route path='/register' element={<Register/>} />
          <Route path='/edit' element={<EditUser/>}/>
        </Routes>
    </Router>
  )
}