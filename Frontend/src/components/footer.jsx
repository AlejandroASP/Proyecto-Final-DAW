const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 225" style={{ transform: 'scaleY(-1) scaleX(-1)' }}>
          <path
            fill="#4c1d95"
            d="M0,32L80,64C160,96,320,160,480,160C640,160,800,96,960,96C1120,96,1280,160,1360,192L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-8">
          {/* Primera columna */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-semibold mb-4">Conócenos</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Acerca de Vortex
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Empleo
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Folletos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Videojuegos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  APP Vortex
                </a>
              </li>
            </ul>
          </div>
          {/* Segunda columna */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-semibold mb-4">Atención al cliente</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contáctanos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Comprar en Vortex
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Reservas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Mi pedido
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Facturación
                </a>
              </li>
            </ul>
          </div>
          {/* Tercera columna */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h2 className="text-xl font-semibold mb-4">Síguenos</h2>
            <ul className="space-y-2">
              <li>
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/x-social-media-white-round-icon.png"
                  alt="X Logo"
                  className="h-5 w-auto inline-block mr-1"
                />
                <a href="#" className="hover:text-gray-300">
                  Twitter
                </a>
              </li>
              <li>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
                  alt="Instagram Logo"
                  className="h-5 w-auto inline-block mr-1"
                />
                <a href="#" className="hover:text-gray-300">
                  Instagram
                </a>
              </li>
              <li>
                <img
                  src="https://cdn.pixabay.com/photo/2022/02/09/08/24/tiktok-7002866_1280.png"
                  alt="TikTok Logo"
                  className="h-5 w-auto inline-block mr-1"
                />
                <a href="#" className="hover:text-gray-300">
                  TikTok
                </a>
              </li>
              <li>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
                  alt="Facebook Logo"
                  className="h-5 w-auto inline-block mr-1"
                />
                <a href="#" className="hover:text-gray-300">
                  Facebook
                </a>
              </li>
              <li>
                <img
                  src="https://images.vexels.me/media/users/3/137425/isolated/preview/f2ea1ded4d037633f687ee389a571086-youtube-icon-logo.png"
                  alt="Youtube Logo"
                  className="h-5 w-auto inline-block mr-1"
                />
                <a href="#" className="hover:text-gray-300">
                  Youtube
                </a>
              </li>
            </ul>
          </div>
          {/* Cuarta columna */}
          <div className="text-center md:text-left">
            <h2 className="text-xl font-semibold mb-4">Legal</h2>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-gray-300">
                  Condiciones de venta
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Información legal
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Pólitica de privacidad
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Pólitica de cookies
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-300">
                  Contratos
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
