import { useState, useEffect } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { Link } from 'react-router-dom';

function Tienda() {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [paginaActual, setPaginaActual] = useState(1);
    const juegosPorPagina = 6;
    const [hoverIndex, setHoverIndex] = useState(null);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');

    // Obtener los géneros al cargar el componente
    useEffect(() => {
        fetch('http://localhost:3002/api/genre/')
            .then(response => response.json())
            .then(data => {
                console.log('Genres fetched:', data);
                setGenres(data);
            })
            .catch(error => console.error('Error fetching genres:', error));
    }, []);

    // Obtener los juegos, posiblemente filtrados por género
    useEffect(() => {
        const genreQuery = selectedGenre ? `?genre_id=${selectedGenre}` : '';
        fetch(`http://localhost:3002/api/game${genreQuery}`, {
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
            .catch(error => console.error('Error fetching games:', error));
    }, [selectedGenre]);


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

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
        setPaginaActual(1); // Resetear a la primera página al cambiar de género
    };

    return (
        <>
            <Header />
            <div className="bg-violet-900 min-h-screen flex flex-col justify-center items-center">
                <div className="flex justify-center mb-4 w-full max-w-md">
                    <input
                        type="text"
                        placeholder="Buscar productos"
                        value={busqueda}
                        onChange={e => setBusqueda(e.target.value)}
                        className="border border-gray-300 rounded-md px-3 py-2 mb-2"
                    />
                </div>
                <div className="flex flex-wrap justify-center space-x-0 space-y-2 sm:space-x-2 sm:space-y-0 md:space-x-4 lg:space-x-6 mb-4">
                    <button
                        onClick={() => handleGenreClick('')}
                        className={`px-4 py-2 rounded-md ${selectedGenre === '' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    >
                        Todos los géneros
                    </button>
                    {genres.map(genre => (
                        <button
                            key={genre.id}
                            onClick={() => handleGenreClick(genre.id)}
                            className={`px-4 py-2 rounded-md ${selectedGenre === genre.id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                        >
                            {genre.nombre}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 gap-10">
                    {juegosEnPaginaActual.map((producto, index) => (
                        <div key={index}
                            className={`bg-blue-200 p-4 rounded-md shadow-md relative overflow-hidden flex flex-col items-center transition-colors duration-300 
                                ${hoverIndex === index ? 'bg-opacity-80' : 'bg-opacity-100'}`}
                            onMouseEnter={() => setHoverIndex(index)}
                            onMouseLeave={() => setHoverIndex(null)}>
                            <img
                                src={producto.img}
                                alt={producto.nombre}
                                className="w-full h-auto mb-2"
                            />
                            <h3 className="text-lg font-bold mb-2">{producto.nombre}</h3>
                            {hoverIndex === index && (
                                <Link to={`/details/${producto.id}`} className="absolute inset-0 flex justify-center items-center">
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
