import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from '../assets/logo.png';
import '../App.css';
import { FlagIcon } from '@heroicons/react/outline';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    setUsername(null);
    navigate('/');
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
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
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 w-auto mr-4 rotate-reverse" />
          <Link to={'/'} className="text-gray-300 hover:text-white transition duration-300 text-3xl font-semibold">Vortex</Link>
        </div>
        <nav className="hidden md:flex flex-grow justify-center">
          <ul className="flex items-center space-x-6">
            <li>
              <Link to={'/tienda'} className="text-gray-300 hover:text-white transition duration-300 text-2xl">{t('store')}</Link>
            </li>
            {username && (
              <>
                <li>
                  <Link to={'/cart'} className="text-gray-300 hover:text-white transition duration-300 text-2xl">{t('cart')}</Link>
                </li>
                <li>
                  <Link to={'/user'} className="text-gray-300 hover:text-white transition duration-300 text-2xl">{t('profile')}</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-6">
            {!username ? (
              <>
                <li>
                  <Link to={'/login'} className="text-gray-300 hover:text-white transition duration-300 text-2xl">{t('login')}</Link>
                </li>
                <li>
                  <Link to={'/register'} className="text-gray-300 hover:text-white transition duration-300 text-2xl">{t('register')}</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button onClick={handleLogout} className="text-gray-300 hover:text-red-600 transition duration-300 text-2xl">{t('logout')}</button>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="flex space-x-4">
          <button onClick={() => changeLanguage('es')} className="text-gray-300">
            <FlagIcon className="h-6 w-6" />
            <span className="sr-only">Español</span>
          </button>
          <button onClick={() => changeLanguage('fr')} className="text-gray-300">
            <FlagIcon className="h-6 w-6" />
            <span className="sr-only">Français</span>
          </button>
          <button onClick={() => changeLanguage('en')} className="text-gray-300">
            <FlagIcon className="h-6 w-6" />
            <span className="sr-only">English</span>
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-300 hover:text-white transition duration-300 focus:outline-none">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="md:hidden bg-gray-900 py-2 px-4">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <Link to={'/tienda'} className="text-gray-300 hover:text-white transition duration-300 text-2xl" onClick={toggleMenu}>{t('store')}</Link>
            </li>
            {username && (
              <li>
                <Link to={'/cart'} className="text-gray-300 hover:text-white transition duration-300 text-2xl" onClick={toggleMenu}>{t('cart')}</Link>
              </li>
            )}
            {!username ? (
              <>
                <li>
                  <Link to={'/login'} className="text-gray-300 hover:text-white transition duration-300 text-2xl" onClick={toggleMenu}>{t('login')}</Link>
                </li>
                <li>
                  <Link to={'/register'} className="text-gray-300 hover:text-white transition duration-300 text-2xl" onClick={toggleMenu}>{t('register')}</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={'/user'} className="text-gray-300 hover:text-white transition duration-300 text-2xl" onClick={toggleMenu}>{t('profile')}</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-gray-300 hover:text-red-600 transition duration-300 text-2xl">{t('logout')}</button>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
      {username && (
        <h1 className="text-gray-300 text-2xl text-center">{t('welcome', { username })}</h1>
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
