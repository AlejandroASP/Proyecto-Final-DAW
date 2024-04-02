import React, { useState } from 'react';


function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menu-container">
      <button className="menu-button" onClick={toggleMenu}>
        ☰ Menú
      </button>
      {isOpen && (
        <div className="menu-dropdown">
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Acerca de</a></li>
            <li><a href="#">Servicios</a></li>
            <li><a href="#">Contacto</a></li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Menu;
