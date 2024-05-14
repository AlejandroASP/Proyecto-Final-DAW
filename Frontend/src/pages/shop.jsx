import { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom'; // Importar Link desde react-router-dom

function Tienda() {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const juegosPorPagina = 6;
    const [hoverIndex, setHoverIndex] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3002/api/game/', {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProductos(data);
                setProductosFiltrados(data);
            })
            .catch(error => {
                console.error('Error fetching games:', error);
            });
    }, []);

    useEffect(() => {
        const productosFiltrados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
        );
        setProductosFiltrados(productosFiltrados);
    }, [busqueda, productos]);

    const indiceInicio = (paginaActual - 1) * juegosPorPagina;
    const indiceFinal = indiceInicio + juegosPorPagina;
    const juegosEnPaginaActual = productosFiltrados.slice(indiceInicio, indiceFinal);

    const numeroTotalPaginas = Math.ceil(productosFiltrados.length / juegosPorPagina);

    const irPaginaAnterior = () => {
        const nuevaPagina = Math.max(paginaActual - 1, 1);
        setPaginaActual(nuevaPagina);
    };

    const irPaginaSiguiente = () => {
        const nuevaPagina = Math.min(paginaActual + 1, numeroTotalPaginas);
        setPaginaActual(nuevaPagina);
    };

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
                    {juegosEnPaginaActual.map((producto, index) => (
                        <div key={index}
                            className={`bg-blue-200 p-4 rounded-md shadow-md relative overflow-hidden flex flex-col items-center transition-colors duration-300 
                                ${hoverIndex === index ? 'bg-opacity-80' : 'bg-opacity-100'}`}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}>
                            <h3 className="text-lg font-bold mb-2">{producto.nombre}</h3>
                            {hoverIndex === index && (
                                <Link to={`/details/${producto.id}`} className="absolute inset-0 flex justify-center items-center">
                                    <p className="text-white">Detalles de juego</p>
                                </Link>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex justify-center mt-4">
                    <button onClick={irPaginaAnterior} disabled={paginaActual === 1} className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Anterior</button>
                    <span className="mx-2 text-white">Página {paginaActual} de {numeroTotalPaginas}</span>
                    <button onClick={irPaginaSiguiente} disabled={paginaActual === numeroTotalPaginas} className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">Siguiente</button>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Tienda;
