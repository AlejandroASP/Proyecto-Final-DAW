import Header from '../src/components/header';
import Footer from '../src/components/footer';
import Carrousel from '../src/components/carrousel';


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