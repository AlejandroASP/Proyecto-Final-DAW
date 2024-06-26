import { useState } from 'react';

function Index() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "https://images.ctfassets.net/5owu3y35gz1g/5PnCYhBVZSF2NwNpkoVCcC/70a4d2ef7299a2cb2d76a9db0ca177cd/HadesIIDevUpdateSep23.png",
        "https://gaming-cdn.com/images/products/9575/orig/helldivers-2-pc-juego-steam-europe-cover.jpg?v=1714742438",
        "https://media.tycsports.com/files/2023/12/08/654147/baldurs-gate-3-_1440x810_wmk.webp"
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="carousel-container overflow-hidden relative w-full md:w-1/2">
                <div className="carousel flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Slide ${index}`} className="w-full md:w-auto h-auto md:h-auto" />
                    ))}
                </div>
                <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gradient-to-r from-black to-transparent bg-opacity-35 h-full text-white px-3 py-1" onClick={prevSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                        <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/>
                    </svg>
                </button>
                <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gradient-to-l from-black to-transparent bg-opacity-35  h-full text-white px-3 py-1" onClick={nextSlide}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#FFFFFF">
                        <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default Index;
