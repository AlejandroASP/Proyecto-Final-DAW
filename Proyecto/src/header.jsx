import './App.css';
import { IconButton} from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import React, { useState, useEffect, useRef } from 'react';
import { Drawer, Button } from 'rsuite';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="mainbar">
                <Button onClick={toggleMenu}>☰ Menú</Button>
                <div ref={menuRef}>
                    <Drawer
                        placement="left"
                        show={isOpen}
                        onHide={toggleMenu}
                    >
                        <Drawer.Header>
                            <Drawer.Title>Menú</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <ul>
                                <li><a href="#">Inicio</a></li>
                                <li><a href="#">Acerca de</a></li>
                                <li><a href="#">Servicios</a></li>
                                <li><a href="#">Contacto</a></li>
                            </ul>
                        </Drawer.Body>
                    </Drawer>
                </div>
            </div>
        </>
    );
}

export default Header;