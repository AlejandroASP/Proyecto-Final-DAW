import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

export function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // Las <> Son el inicializador
    <>
      <div className="mainbar">
        <input type="search" className="search" />
        <img
          src="https://unavatar.io/kikobeats"
          alt="imagen usuario"
          className="user"
          onClick={() => setIsOpen(!isOpen)} // Cambia el estado al hacer clic
        />
        {isOpen && ( // Si isOpen es true, muestra el desplegable
          <div className="dropdown">
            <div>
              <p>Parrafo 1</p>
              <p>Parrafo 2</p>
              <p>Parrafo 3</p>
            </div>
          </div>
        )}
        <div className="options">
          <h1><a href="#">Inicio</a></h1>
          <h1><a href="#">Inicio</a></h1>
          <h1><a href="#">Inicio</a></h1>
        </div>
      </div>
      <div className="content">
        <div className="product-pair">
          <div className="product">
            <img src="https://unavatar.io/kikobeats" alt="imagen producto" />
            <p>Producto1</p>
            <p>Precio</p>
          </div>
          <div className="product">
            <img src="https://unavatar.io/kikobeats" alt="imagen producto" />
            <p>Producto1</p>
            <p>Precio</p>
          </div>
        </div>
        <div className="product-pair">
          <div className="product">
            <img src="https://unavatar.io/kikobeats" alt="imagen producto" />
            <p>Producto2</p>
            <p>Precio</p>
          </div>
          <div className="product">
            <img src="https://unavatar.io/kikobeats" alt="imagen producto" />
            <p>Producto2</p>
            <p>Precio</p>
          </div>
        </div>
        <div className="product-pair">
          <div className="product">
            <img src="https://unavatar.io/kikobeats" alt="imagen producto" />
            <p>Producto2</p>
            <p>Precio</p>
          </div>
          <div className="product">
            <img src="https://unavatar.io/kikobeats" alt="imagen producto" />
            <p>Producto2</p>
            <p>Precio</p>
          </div>
        </div>
        <div className="product-pair">
          <div className="product">
            <img src="https://unavatar.io/kikobeats" alt="imagen producto" />
            <p>Producto2</p>
            <p>Precio</p>
          </div>
          <div className="product">
            <img src="https://unavatar.io/kikobeats" alt="imagen producto" />
            <p>Producto2</p>
            <p>Precio</p>
          </div>
        </div>
      </div>

    </>
  )
}