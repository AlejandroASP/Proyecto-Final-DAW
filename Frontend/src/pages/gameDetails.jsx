import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function GameDetails() {
    const [rating, setRating] = useState(0); // Estado para la calificación

    // Función para manejar el cambio de calificación al hacer clic
    const handleRatingClick = (value) => {
        setRating(value === rating ? 0 : value);
    };

    // Función para manejar el cambio de calificación al hacer hover
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
                        <div className="md:w-1/3 p-4 flex flex-col justify-between">
                            <img
                                src="https://unavatar.io/kikobeats"
                                alt="imagen producto"
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
                                    Título del Juego
                                </h2>
                                {/* Valoración */}
                                <div className="flex items-center mb-2">
                                    {stars}
                                </div>
                                {/* Género */}
                                <p className="text-gray-600 mb-2">
                                    Género: Acción
                                </p>
                            </div>
                            {/* Descripción */}
                            <div className="mt-4">
                                <p className="text-gray-600">
                                    Breve descripción del juego Lorem ipsum
                                    dolor sit amet, consectetur adipiscing elit.
                                    Sed sit amet libero nec justo accumsan
                                    feugiat. Proin fermentum rutrum ligula sit
                                    amet volutpat. Integer efficitur, nisi in
                                    convallis viverra, justo libero fermentum
                                    neque, nec gravida lectus justo ac felis.
                                    Vivamus convallis pharetra augue, nec
                                    scelerisque quam interdum vel. Nullam ac
                                    pretium nulla.
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
