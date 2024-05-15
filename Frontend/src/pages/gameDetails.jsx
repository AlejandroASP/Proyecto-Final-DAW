import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function GameDetails() {
    const [game, setGame] = useState(null);
    const [rating, setRating] = useState(0);
    const [genreName, setGenreName] = useState('');
    const { gameId } = useParams();

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
                console.log('Datos del juego:', data);
                setGame(data);

                // Realizar una solicitud adicional para obtener el nombre del género
                fetch(`http://localhost:3002/api/genre/${data.genre_id}`, {
                    method: 'GET'
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then(genreData => {
                        console.log('Datos del género:', genreData);
                        setGenreName(genreData.nombre);
                    })
                    .catch(error => {
                        console.error('Error fetching genre details:', error);
                    });
            })
            .catch(error => {
                console.error('Error fetching game details:', error);
            });
    }, [gameId]);


    const handleRatingClick = (value) => {
        setRating(value === rating ? 0 : value);
    };

    const handleRatingHover = (value) => {
        setRating(value);
    };

    const stars = [];
    for (let i = 1; i <= 5; i++) {
        stars.push(
            <span
                key={i}
                className={`text-2xl ${rating >= i ? 'text-yellow-400' : 'text-gray-400'
                    } cursor-pointer`}
                onMouseEnter={() => handleRatingHover(i)}
                onMouseLeave={() => handleRatingHover(0)}
                onClick={() => handleRatingClick(i)}
            >
                &#9733;
            </span>
        );
    }

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
                    <div className="p-4">
                        <Link to="/tienda" className="text-blue-500 hover:underline">
                            Tienda
                        </Link>
                        <span className="mx-2">{'>'}</span>
                        <span>Detalles</span>
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-2/4 p-4 flex flex-col justify-between">
                            <img
                                src={game.img}
                                alt={game.nombre}
                                className="w-full h-auto mb-2"
                            />
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                disabled
                            >
                                Añadir al carro
                            </button>
                        </div>
                        <div className="md:w-2/3 p-4">
                            <div>
                                <h2 className="text-2xl font-bold mb-2">
                                    {game.nombre}
                                </h2>
                                <div className="flex items-center mb-2">
                                    {stars}
                                </div>
                                <p className="text-gray-600 mb-2">
                                    Género: {genreName ? genreName : 'Desconocido'}
                                </p>
                                <p className="text-gray-600 mb-2 text-green-600">
                                    Precio: {game.precio} €
                                </p>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-600">
                                    {game.detalles}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 bg-gray-100 mt-4">
                        <h3 className="text-xl font-bold mb-2">Juegos de la misma categoría</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {game.genre && game.genre.games && game.genre.games.map((otherGame, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                    <Link to={`/details/${otherGame.id}`}>
                                        <img src={otherGame.img} alt={otherGame.nombre} className="w-full h-auto" />
                                        <div className="p-4">
                                            <h4 className="text-lg font-bold">{otherGame.nombre}</h4>
                                            <p className="text-gray-600">{otherGame.precio} €</p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default GameDetails;