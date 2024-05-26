import Header from "../components/header";
import Footer from "../components/footer";
import { useTranslation } from 'react-i18next';

function AboutUs() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-violet-900 to-pink-900 p-3 flex flex-col items-center">
        <div className="container px-8 pt-6 pb-8 mx-auto flex flex-col bg-black bg-opacity-45 border-white-500 border-4 rounded md:w-2/3">
          <h1 className="text-3xl font-extrabold text-white mb-6 text-center ">
            {t('about')}
          </h1>
          <p className="text-white text-lg mb-4">
          {t('info_1')}
          </p>
          <div className="w-2/3 border-4 border-white rounded mx-auto mb-4">
            <img
              src="https://img.freepik.com/foto-gratis/experiencia-programacion-persona-que-trabaja-codigos-computadora_23-2150010125.jpg?w=740&t=st=1716738910~exp=1716739510~hmac=3bb6b0c0fb7f2250739c63f2f0437402fe4f9639b8554c059cd623a35bccf4a7"
              alt="Foto de tres trabajadores"
            />
          </div>
          <p className="text-white text-lg mb-4">
          {t('info_2')}
          </p>
          <p className="text-white text-lg mb-4">
          {t('info_3')}
          </p>
          <div className="w-2/3 border-4 border-white rounded mx-auto mb-4">
            <img
              src="https://img.freepik.com/foto-gratis/grupo-jovenes-empresarios-que-trabajan-oficina_158595-5210.jpg?t=st=1716740025~exp=1716743625~hmac=90e6212ffbcff288510cf4a120e5de6eeb0322c2fb7a0cef2a1aaee67e951072&w=740"
              alt="Foto de tres trabajadores"
            />
          </div>
          <p className="text-white text-lg mb-4">
            
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
