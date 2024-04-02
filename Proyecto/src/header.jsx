import './App.css';
import { IconButton, Drawer, Button } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import React, { useState, useRef } from 'react';

function Header() {
    const searchRef = useRef();
    const focusSearch = () => {
        if (searchRef.current) {
            searchRef.current.focus();
        }
    };

    return (
        <>
            <div className="mainbar">
                <input ref={searchRef} type="search" className="search" placeholder='Buscar'/>
                <div className='magnifier_box'><IconButton className='magnifier' icon={<SearchIcon />} onClick={focusSearch} /></div>
                <div className="options">
                    <h1><a href="#">Inicio</a></h1>
                    <h1><a href="#">Inicio</a></h1>
                </div>
            </div>
        </>
    )
}

export default Header;
