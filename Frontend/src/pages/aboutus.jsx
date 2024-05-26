import Header from "../components/header";
import Footer from "../components/footer";

// import { useTranslation } from 'react-i18next';

function AboutUs() {
  // const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-violet-900 to-pink-900 p-3 min-h-screen flex flex-col items-center">
        <div className="container px-8 pt-6 pb-8 mx-auto flex flex-col bg-black bg-opacity-45 border-white-500 border-4 rounded md:w-2/3">
          <h1 className="text-3xl font-extrabold text-white mb-6 text-center ">
            Sobre Nosotros
          </h1>
          <p className="text-white text-lg mb-4">
            Bienvenido a nuestro proyecto, una plataforma creada por jugadores
            para jugadores. Nuestro viaje comenzó con tres personas apasionadas
            que vieron la necesidad en la comunidad de jugadores de tener un
            lugar donde los entusiastas pudieran acceder a juegos a precios
            competitivos.
          </p>
          <div className="w-2/3 border-4 border-white rounded mx-auto mb-4">
            <img
              src="https://img.freepik.com/foto-gratis/experiencia-programacion-persona-que-trabaja-codigos-computadora_23-2150010125.jpg?w=740&t=st=1716738910~exp=1716739510~hmac=3bb6b0c0fb7f2250739c63f2f0437402fe4f9639b8554c059cd623a35bccf4a7"
              alt="Foto de tres trabajadores"
            />
          </div>
          <p className="text-white text-lg mb-4">
            Como jugadores ávidos, entendemos los desafíos y gastos asociados
            con perseguir nuestra pasión. Es por eso que emprendimos esta
            misión: crear un espacio donde cualquier amante de los videojuegos
            pueda encontrar opciones asequibles sin comprometer la calidad o la
            selección.
          </p>
          <p className="text-white text-lg mb-4">
            Nuestro equipo se dedica a mejorar constantemente la plataforma,
            asegurando que nuestros usuarios tengan la mejor experiencia
            posible. Ya sea que busques los últimos lanzamientos o los clásicos
            favoritos, nuestro objetivo es hacer que los videojuegos sean
            accesibles para todos.
          </p>
          <div className="w-2/3 border-4 border-white rounded mx-auto mb-4">
            <img
              src="https://img.freepik.com/foto-gratis/grupo-jovenes-empresarios-que-trabajan-oficina_158595-5210.jpg?t=st=1716740025~exp=1716743625~hmac=90e6212ffbcff288510cf4a120e5de6eeb0322c2fb7a0cef2a1aaee67e951072&w=740"
              alt="Foto de tres trabajadores"
            />
          </div>
          <p className="text-white text-lg mb-4">
            Gracias por ser parte de nuestra comunidad. Juntos, podemos hacer
            que los videojuegos sean más inclusivos y disfrutables para todos.
          </p>
          <div className="w-1/5 mx-auto">
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/6/61/Vault_Boy_artwork.png/220px-Vault_Boy_artwork.png"
              alt="Foto de tres trabajadores"
            />
          </div>
          <div className="text-white text-center text-lg mt-6"></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
