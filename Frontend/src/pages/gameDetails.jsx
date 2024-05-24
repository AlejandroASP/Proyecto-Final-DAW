import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { useTranslation } from 'react-i18next';

function GameDetails() {
  const { t } = useTranslation();
  const [game, setGame] = useState(null);
  const [rating, setRating] = useState(0);
  const [genreName, setGenreName] = useState("");
  const { gameId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3002/api/game/${gameId}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Datos del juego:", data);
        setGame(data);

        // Realizar una solicitud adicional para obtener el nombre del género
        fetch(`http://localhost:3002/api/genre/${data.genre_id}`, {
          method: "GET",
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((genreData) => {
            console.log("Datos del género:", genreData);

            // Normalizar la clave del género
            const genreKey = genreData.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '');

            // Obtener el nombre del género traducido usando `t`
            const translatedGenreName = t(`genres.${genreKey}`, {
              defaultValue: genreData.nombre // Valor por defecto si no se encuentra la traducción
            });

            console.log("translatedGenreName:", translatedGenreName);

            setGenreName(translatedGenreName);
          })
          .catch((error) => {
            console.error("Error fetching genre details:", error);
            setGenreName(t('unknown'));
          });
      })
      .catch((error) => {
        console.error("Error fetching game details:", error);
      });
  }, [gameId, t]);

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
        className={`text-2xl ${rating >= i ? "text-yellow-400" : "text-gray-400"
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
      <div className="bg-gradient-to-b from-violet-900 to-pink-900 min-h-screen flex flex-col items-center pt-8">
        <div className="max-w-4xl w-full bg-black bg-opacity-45 mb-8 border border-white-500 border-4 shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <Link to="/tienda" className="text-blue-500 hover:text-yellow-200">
              {t('store')}
            </Link>
            <span className="mx-2">{">"}</span>
            <span className="text-white">Detalles sobre {game.nombre}</span>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/4 p-4 flex flex-col justify-between">
              <img
                src={game.img}
                alt={game.nombre}
                className="w-full h-auto mb-2"
              />
              <button
                className={`font-bold py-2 px-4 rounded ${!sessionStorage.getItem("token")
                  ? "bg-yellow-500 hover:bg-yellow-700"
                  : "bg-blue-800 hover:bg-blue-700 text-white"
                  }`}
                onClick={() => {
                  if (!sessionStorage.getItem("token")) {
                    window.location.href = "/login";
                  } else {
                    // Si hay un token, puedes ejecutar la lógica para añadir al carrito aquí
                    // Simplemente coloca la lógica de añadir al carrito dentro de este else
                    // Por ejemplo:
                    // handleAddToCart();
                  }
                }}
              >
                {sessionStorage.getItem("token")
                  ? t('add_to_cart')
                  : t('login_dummy')}
              </button>
            </div>
            <div className="md:w-2/3 p-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 text-orange-500">{game.nombre}</h2>
                <div className="flex items-center mb-2">{stars}</div>
                <p className="text-gray-600 mb-2 text-white">
                  {t('genre')}: <span className="text-yellow-400">{genreName || t('unknown')}</span>
                </p>
                
                <p className="text-gray-600 mb-2 text-white">
                  Precio: <span className="text-green-500">{game.precio} €</span>
                </p>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 text-white text-justify">{game.detalles}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-4xl w-full mt-8 bg-black bg-opacity-45 border border-white-500 border-4 shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-xl text-white font-bold mb-4">
              {t('similar_games')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {game.genre &&
                game.genre.games &&
                game.genre.games.map((otherGame, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <Link to={`/details/${otherGame.id}`}>
                      <img
                        src={otherGame.img}
                        alt={otherGame.nombre}
                        className="w-full h-auto"
                      />
                      <div className="p-4">
                        <h4 className="text-lg font-bold">
                          {otherGame.nombre}
                        </h4>
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
