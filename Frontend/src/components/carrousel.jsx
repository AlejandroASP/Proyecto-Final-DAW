import { useState } from 'react';

function Index() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "https://cdn.akamai.steamstatic.com/steam/apps/1145350/capsule_616x353.jpg?t=1715021715",
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
            <div className="carousel-container overflow-hidden relative w-1/2">
                <div className="carousel flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.5s ease-in-out' }}>
                    {images.map((image, index) => (
                        <img key={index} src={image} alt={`Slide ${index}`} className="w-screen h-auto" />
                    ))}
                </div>
                <button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-full" onClick={prevSlide}>Anterior</button>
                <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-full" onClick={nextSlide}>Siguiente</button>
            </div>
        </div>
    );
}

export default Index;