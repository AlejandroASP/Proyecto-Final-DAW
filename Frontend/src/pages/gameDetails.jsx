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
  const [relatedGames, setRelatedGames] = useState("");
  const { gameId } = useParams();
  const [hoverIndex, setHoverIndex] = useState(null);

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
        const gameData = { ...data };

        // Realizar una solicitud adicional para obtener el género del juego
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

            // Agregar los juegos relacionados al objeto del juego
            gameData.relatedGames = genreData.games;

            // Establecer el estado del juego con los datos actualizados
            setGame(gameData);
          })
          .catch((error) => {
            console.error("Error fetching genre details:", error);
            setGenreName(t('unknown'));
          });
      })
      .catch((error) => {
        console.error("Error fetching game details:", error);
      });

    // Obtener los juegos del mismo género
    fetch(`http://localhost:3002/api/game/related/${gameId}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((relatedGamesData) => {
        console.log("Juegos del mismo género:", relatedGamesData);
        setRelatedGames(relatedGamesData);
      })
      .catch((error) => {
        console.error("Error fetching related games:", error);
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
      <div className="bg-gradient-to-b from-violet-900 to-pink-900 flex flex-col items-center pt-8">
        <div className="max-w-4xl w-full bg-black bg-opacity-45 mb-8 border border-white-500 border-4 shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <Link to="/tienda" className="text-blue-500 hover:text-yellow-200">
              {t('store')}
            </Link>
            <span className="mx-2">{">"}</span>
            <span className="text-white">{t('details')} {game.nombre}</span>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-2/4 p-4 flex flex-col justify-between">
              <div
                className="bg-blue-200 p-40 rounded-md shadow-md relative overflow-hidden flex flex-col items-center transition-colors duration-300 h-48 w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${game.img})` }}
              >
                <img
                  src={game.img}
                  alt={game.nombre}
                  className="absolute inset-0 w-full h-full object-cover opacity-0"
                />
              </div>
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
                  {t('price')} <span className="text-green-500">{game.precio} €</span>
                </p>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 text-white text-justify">{game.detalles}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-8xl  w-full mt-8 bg-black bg-opacity-45 border border-white-500 border-4 shadow-md rounded-lg overflow-hidden">
          <div className="p-4">
            <h3 className="text-xl text-white font-bold mb-4 flex justify-center">
              {t('similar_games')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5 mx-3">
              {relatedGames && relatedGames.map((otherGame, index) => (
                <div
                  key={index}
                  className={`bg-blue-200 p-40 rounded-md shadow-md relative overflow-hidden flex flex-col items-center transition-colors duration-300 h-48 w-full bg-cover bg-center
                  ${hoverIndex === index ? "bg-opacity-80" : "bg-opacity-100"}`}
                  style={{ backgroundImage: `url(${otherGame.img})` }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {hoverIndex === index && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                      <h3 className="text-lg font-bold text-white">{otherGame.nombre}</h3>
                      <Link
                        to={`/details/${otherGame.id}`}
                        className="absolute inset-0 flex justify-center items-center"
                      ></Link>
                    </div>
                  )}
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
