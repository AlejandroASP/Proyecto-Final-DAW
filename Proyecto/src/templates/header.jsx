
import { IconButton, Drawer, Button } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const searchRef = useRef();
    const focusSearch = () => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    };
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    return (
        <>
            <div className="mainbar">
                <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                    <button onClick={toggleMenu}>☰</button>
                    {isMenuOpen && (
                        <div className="menu">
                            <a href="#">Enlace 1</a>
                            <a href="#">Enlace 2</a>
                            <a href="#">Enlace 3</a>
                        </div>
                    )}
                </div>
                <input ref={searchRef} type="search" className="search" placeholder='Buscar' />
                <div className='magnifier_box'>
                    <IconButton className='magnifier' icon={<SearchIcon />} onClick={focusSearch} />
                </div>
                <div className="options">
                    <h1><Link to="/login">Inicio de Sesion</Link></h1>
                    <h1><Link to="/register">Registro</Link></h1>
                    <h1><Link to="/register">Registro</Link></h1>
                    <h1><Link to="/register">Registro</Link></h1>
                    <h1><Link to="/register">Registro</Link></h1>
                </div>
            </div>
        </>
    )
}

export default Header;
