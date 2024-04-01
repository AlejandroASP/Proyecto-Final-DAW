import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './login';
import Index from './index';
import Register from './register';


export function App() {
  return (
    <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Index />} />
          <Route path='/register' element={<Register/>} />
        </Routes>
    </Router>
  )
}