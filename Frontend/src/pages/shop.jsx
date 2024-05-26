import { useState, useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';


function Tienda() {
  const { t } = useTranslation();
  const useScreenSize = () => {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    return width;
  };

  const screenSize = useScreenSize();
  const juegosPorPagina = screenSize >= 1280 ? 8 : 4;

  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(() => {
    const savedPage = localStorage.getItem("paginaActual");
    return savedPage ? Number(savedPage) : 1;
  });
  const [hoverIndex, setHoverIndex] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    fetch("http://localhost:3002/api/genre/")
      .then((response) => response.json())
      .then((data) => {
        console.log("Genres fetched:", data);

        // Mapear los géneros para traducir sus nombres
        const translatedGenres = data.map(genre => {
          const genreKey = genre.nombre.toLowerCase().replace(/[^a-z0-9]+/g, '');
          return {
            ...genre,
            nombre: t(`genres.${genreKey}`, {
              defaultValue: genre.nombre // Valor por defecto si no se encuentra la traducción
            })
          };
        });
        setGenres(translatedGenres);
      })
      .catch((error) => console.error("Error fetching genres:", error));
  }, [t]);

  useEffect(() => {
    const genreQuery = selectedGenre ? `?genre_id=${selectedGenre}` : "";
    fetch(`http://localhost:3002/api/game${genreQuery}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProductos(data);
        setProductosFiltrados(data);
      })
      .catch((error) => console.error("Error fetching games:", error));
  }, [selectedGenre]);

  useEffect(() => {
    const productosFiltrados = productos.filter((producto) =>
      producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );
    setProductosFiltrados(productosFiltrados);
  }, [busqueda, productos]);

  useEffect(() => {
    localStorage.setItem("paginaActual", paginaActual);
  }, [paginaActual]);

  const indiceInicio = (paginaActual - 1) * juegosPorPagina;
  const indiceFinal = indiceInicio + juegosPorPagina;
  const juegosEnPaginaActual = productosFiltrados.slice(
    indiceInicio,
    indiceFinal
  );

  const numeroTotalPaginas = Math.ceil(
    productosFiltrados.length / juegosPorPagina
  );

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
    setPaginaActual(1);
  };

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-violet-900 to-pink-900 flex flex-col items-center">
        <div className="relative w-full max-w-md px-4 mt-8 mb-6">
          <label htmlFor="search" className="absolute top-1 left-5">
            <svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#666666">
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
          </label>
          <input
            id="search"
            type="text"
            placeholder={t('search')}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 text-center"
          />
        </div>
        <div className="w-full bg-gradient-to-r from-black-600 via-orange-600 to-black-700 py-4 mb-4 rounded-md">
          <div className="flex flex-wrap justify-center items-center w-full max-w-screen-lg mx-auto gap-2 px-4">
            <button
              onClick={() => handleGenreClick("")}
              className={`flex-grow md:flex-grow-0 px-4 py-2 rounded-md text-sm md:text-base ${selectedGenre === ""
                ? "bg-gray-800 text-white"
                : "bg-gray-300 text-black"
                }`}
            >
              {t('all_genres')}
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className={`flex-grow md:flex-grow-0 px-4 py-2 rounded-md text-sm md:text-base ${selectedGenre === genre.id
                  ? "bg-gray-800 text-white"
                  : "bg-gray-300 text-black"
                  }`}
              >
                {genre.nombre}
              </button>
            ))}
          </div>
        </div>

        {productosFiltrados.length === 0 ? (
          <div className="text-white text-lg mt-6">Juego no encontrado</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-5 mx-3">
            {juegosEnPaginaActual.map((producto, index) => (
              <div
                key={index}
                className={`bg-blue-200 p-40 rounded-md shadow-md relative overflow-hidden flex flex-col items-center transition-colors duration-300 h-48 w-full bg-cover bg-center
                  ${hoverIndex === index ? "bg-opacity-80" : "bg-opacity-100"}`}
                style={{ backgroundImage: `url(${producto.img})` }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                {hoverIndex === index && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <h3 className="text-lg font-bold text-white">{producto.nombre}</h3>
                    <Link
                      to={`/details/${producto.id}`}
                      className="absolute inset-0 flex justify-center items-center"
                    ></Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center items-center mt-4 mb-8">
          <button
            onClick={irPaginaAnterior}
            disabled={paginaActual === 1}
            className="mr-2 px-4 py-1 bg-indigo-900 bg-opacity-70 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
            </svg>
          </button>
          <span className="mx-2 text-white">
            {t('page')} {paginaActual} {t('of')} {numeroTotalPaginas}
          </span>
          <button
            onClick={irPaginaSiguiente}
            disabled={paginaActual === numeroTotalPaginas}
            className="ml-2 px-4 py-1 bg-indigo-900 bg-opacity-70 rounded"
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed">
              <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
            </svg>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Tienda;
