import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';
import { SearchIcon } from '@heroicons/react/solid'; // Importa el icono de la lupa de Heroicons

function Tienda() {
    const [busqueda, setBusqueda] = useState('');

    return (
        <>
            <Header />
            <div className="bg-violet-900 min-h-screen flex flex-col justify-center items-center">
                <div className="relative w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Buscar juegos"
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 pl-10 w-full"
                    />
                    <SearchIcon className="h-6 w-6 absolute top-2 left-3 text-gray-400" /> {/* Agrega el icono de la lupa */}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
                    {[...Array(6)].map((_, index) => (
                        <div key={index} className="bg-blue-200 p-4 rounded-md shadow-md relative overflow-hidden flex flex-col items-center">
                            <img src="https://unavatar.io/kikobeats" alt="imagen producto" className="w-full h-auto mb-2" />
                            <Link to="/details"
                                className="transition-opacity duration-300 opacity-0 hover:opacity-100 
                                absolute inset-0 flex items-center justify-center text-white bg-black bg-opacity-50 hover:no-underline hover:text-white">
                                Detalles del juego
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
