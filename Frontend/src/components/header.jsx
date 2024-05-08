import logo from '../assets/logo.png'
import { Link } from 'react-router-dom';
import "../App.css"

const Header = () => {
  return (
    <header className="bg-gray-900">
      <div className="container mx-auto flex items-center justify-between py-8 px-8">
        <div className="flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-8 w-auto mr-4 rotate-reverse" />
          <h1 className="text-white text-3xl font-semibold">Vortex</h1>
        </div>
        <nav>
          <ul className="flex items-center space-x-6">
            <li>
              <Link to={'/tienda'} className="text-gray-300 hover:text-white transition duration-300 text-2xl">Tienda</Link>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
              >
                Iniciar Sesión
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
              >
                Registro
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition duration-300 text-2xl"
              >
                Soporte
              </a>
            </li>
          </ul>
        </nav>
        <div className="flex items-center space-x-6">
          <a
            href=""
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Iniciar Sesión
          </a>
          <a
            href=""
            className="text-gray-300 hover:text-white transition duration-300"
          >
            Registrarse
          </a>
        </div>
      </div>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 225">
          <path
            fill="#4c1d95"
            d="M0,32L80,64C160,96,320,160,480,160C640,160,800,96,960,96C1120,96,1280,160,1360,192L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
    </header>
  );
};

export default Header;
