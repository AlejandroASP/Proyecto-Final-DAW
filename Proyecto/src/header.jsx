import './App.css';
import { IconButton, Drawer, Button } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import React, { useState, useRef } from 'react';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const searchRef = useRef();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const focusSearch = () => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    };

    return (
        <>
            <div className="mainbar">
                <input ref={searchRef} type="search" className="search" placeholder='Buscar'/>
                <IconButton icon={<SearchIcon />} onClick={focusSearch} />
                <div className="options">
                    <h1><a href="#">Inicio</a></h1>
                    <h1><a href="#">Inicio</a></h1>
                </div>
            </div>
        </>
    )
}

export default Header;
