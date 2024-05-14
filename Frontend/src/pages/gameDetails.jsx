import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Importar useParams
import Header from '../components/header';
import Footer from '../components/footer';

function GameDetails() {
    const [game, setGame] = useState(null); // Estado para almacenar la información del juego
    const [rating, setRating] = useState(0);

    const { gameId } = useParams(); // Obtener el ID del juego de la URL

    useEffect(() => {
        fetch(`http://localhost:3002/api/game/${gameId}`, {
            method: 'GET'
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setGame(data); // Almacenar los detalles del juego en el estado
            })
            .catch(error => {
                console.error('Error fetching game details:', error);
            });
    }, [gameId]); // Se ejecutará cada vez que cambie el ID del juego

    const handleRatingClick = (value) => {
        setRating(value === rating ? 0 : value);
    };

    const handleRatingHover = (value) => {
        setRating(value);
    };

    // Generar las estrellas de acuerdo a la calificación actual
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span
                key={i}
                className={`text-2xl ${
                    rating >= i ? 'text-yellow-400' : 'text-gray-400'
                } cursor-pointer`}
                onMouseEnter={() => handleRatingHover(i)}
                onMouseLeave={() => handleRatingHover(0)}
                onClick={() => handleRatingClick(i)}
            >
                &#9733;
            </span>
        );
    }

    // Si aún no se ha cargado la información del juego, mostrar un mensaje de carga
    if (!game) {
        return (
            <div className="bg-violet-900 min-h-screen flex flex-col justify-center items-center">
                <p className="text-white">Cargando...</p>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="bg-violet-900 min-h-screen flex flex-col justify-center items-center">
                <div className="max-w-4xl w-full bg-white shadow-md rounded-lg overflow-hidden">
                    {/* Migas de pan */}
                    <div className="p-4">
                        <Link to="/tienda" className="text-blue-500 hover:underline">
                            Tienda
                        </Link>
                        <span className="mx-2">{'>'}</span>
                        <span>Detalles</span>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        {/* Imagen del juego */}
                        <div className="md:w-2/4 p-4 flex flex-col justify-between">
                            <img
                                src={game.img} // Usar la URL de la imagen del juego
                                alt={game.nombre} // Usar el nombre del juego como alternativa de la imagen
                                className="w-full h-auto mb-2"
                            />
                            {/* Botón de añadir al carro (no funcional) */}
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                disabled
                            >
                                Añadir al carro
                            </button>
                        </div>
                        {/* Detalles del juego */}
                        <div className="md:w-2/3 p-4">
                            {/* Título, Estrellas y Género */}
                            <div>
                                {/* Título */}
                                <h2 className="text-2xl font-bold mb-2">
                                    {game.nombre}
                                </h2>
                                {/* Valoración */}
                                <div className="flex items-center mb-2">
                                    {stars}
                                </div>
                                {/* Género */}
                                <p className="text-gray-600 mb-2">
                                    Género: {game.genre}
                                </p>
                                {/* Precio */}
                                <p className="text-gray-600 mb-2 text-green-600">
                                    Precio: {game.precio} €
                                </p>
                            </div>
                            {/* Descripción */}
                            <div className="mt-4">
                                <p className="text-gray-600">
                                    {game.detalles}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default GameDetails;
