import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function Tienda() {
    const [productos, setProductos] = useState([]);
    const [busqueda, setBusqueda] = useState('');

    useEffect(() => {
        // Función para obtener los datos de los productos desde el servidor
        const obtenerProductos = async () => {
            try {
                const response = await fetch('/tienda');
                if (response.ok) {
                    const data = await response.json();
                    setProductos(data);
                } else {
                    console.error('Error al obtener los productos:', response.statusText);
                }
            } catch (error) {
                console.error('Error al realizar la solicitud:', error);
            }
        };

        obtenerProductos();
    }, []); // La dependencia vacía asegura que esta función solo se ejecute una vez al montar el componente

    return (
        <>
            <Header />
            <div className="bg-violet-900 min-h-screen flex flex-col justify-center items-center">
                <input
                    type="text"
                    placeholder="Buscar productos"
                    value={busqueda}
                    onChange={e => setBusqueda(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 mb-4 w-full max-w-md"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                    {productos.map((producto, index) => (
                        <div key={index} className="bg-blue-200 p-4 rounded-md shadow-md relative overflow-hidden flex flex-col items-center">
                            <h3 className="text-lg font-bold mb-2">{producto.nombre}</h3>
                            <p>Precio: ${producto.precio}</p>
                            <Link to={`/detalles/${producto.id}`}
                                className="transition-opacity duration-300 opacity-0 hover:opacity-100 
                                absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 hover:no-underline hover:text-white">
                                Detalles del producto
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Tienda;
