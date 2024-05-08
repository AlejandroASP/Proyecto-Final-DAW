import Header from '../components/header';
import Footer from '../components/footer';
import Carrousel from '../components/carrousel';


function Index() {

    return (
        <>
        <div className='bg-violet-900'>
            <Header />
            <h1 className="text-white text-3xl font-semibold flex items-center justify-center">Últimas novedades</h1>   
            <Carrousel />
            <Footer />
            </div>
        </>
    );
}
export default Index;