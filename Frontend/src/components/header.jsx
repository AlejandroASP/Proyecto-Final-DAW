import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../App.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Inicializamos el menú cerrado
  const [username, setUsername] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
        const storedUsername = sessionStorage.getItem('username');
        setUsername(storedUsername);
    }
}, []);
  return (
    <header className="bg-gray-900">
      <div className="container mx-auto flex items-center justify-between py-8 px-8">
        <div className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-8 w-auto mr-4 rotate-reverse" />
          <Link to={'/'} className="text-gray-300 hover:text-white transition duration-300 text-3xl font-semibold">Vortex</Link>
        </div>
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                to={'/tienda'}
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
              >
                Tienda
              </Link>
            </li>
            <li>
              <Link
                to={'/login'}
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
              >
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link
                to={'/register'}
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
              >
                Registrate
              </Link>
            </li>
            <li>
              <Link
                to={'/cart'}
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
              >
                Carrito
              </Link>
            </li>
            <li>
              <Link
                to={'/user'}
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
        {/* Botón de hamburguesa para dispositivos móviles */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-white transition duration-300 focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {/* Menú desplegable para dispositivos móviles */}
      {menuOpen && (
        <nav className="md:hidden bg-gray-900 py-2 px-4">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link
                to={'/tienda'}
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
                onClick={toggleMenu}
              >
                Tienda
              </Link>
            </li>
            <li>
              <Link
                to={'/login'}
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
                onClick={toggleMenu}
              >
                Iniciar Sesión
              </Link>
            </li>
            <li>
              <Link
                to={'/register'}
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
                onClick={toggleMenu}
              >
                Registrarse
              </Link>
            </li>
            <li>
              <Link
                to={'/cart'}
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
                onClick={toggleMenu}
              >
                Carrito
              </Link>
            </li>
            <li>
              <Link
                to={'/user'}
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
              >
                Perfil
              </Link>
            </li>
          </ul>
        </nav>
      )}
      {username && (
                <p className="text-white text-center mt-4">Bienvenido, {username}</p>
            )}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 225">
          <path
            fill="#4c1d95"
            d="M0,32L80,64C160,96,320,160,480,160C640,160,800,96,960,96C1120,96,1280,160,1360,192L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
    </header>
  );
};

export default Header;
