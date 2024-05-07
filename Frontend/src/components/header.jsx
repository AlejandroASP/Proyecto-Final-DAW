const Header = () => {
    return (
      <header className="bg-gray-900">
        <div className="container mx-auto flex items-center justify-between py-4 px-8">
          <div className="flex items-center justify-center">
            <img
              src="../img/logo.png"
              alt="Logo"
              className="h-8 w-auto mr-4"
            />
            <h1 className="text-white text-xl font-semibold">Vortex</h1>
          </div>
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Tienda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Iniciar Sesión
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  Registro
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
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
      </header>
    );
  };
  
  export default Header;
  