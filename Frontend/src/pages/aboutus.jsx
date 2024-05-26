import Header from "../components/header";
import Footer from "../components/footer";
import Carrousel from "../components/carrousel";
import { useTranslation } from 'react-i18next';

function Index() {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="bg-gradient-to-b from-violet-900 to-pink-900">
        <h1 className="text-white text-3xl font-semibold flex items-center justify-center">
          {t('latest_news')}
        </h1>
        <Carrousel />
      </div>
      <Footer />
    </>
  );
}

export default Index;