import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './App.css'

function App() {
    const images = [
        { 
            src: "/api/placeholder/1200/600", 
            alt: "Slide 1",
            title: "Delicious Recipes",
            subtitle: "Discover your next favorite meal"
        },
        { 
            src: "/api/placeholder/1200/600", 
            alt: "Slide 2",
            title: "Quick & Easy",
            subtitle: "30-minute meals for busy days"
        },
        { 
            src: "/api/placeholder/1200/600", 
            alt: "Slide 3",
            title: "Healthy Choices",
            subtitle: "Nutritious and delicious options"
        },
    ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => 
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 5000);
        
        return () => clearInterval(timer);
    }, [images.length]);
    
    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };
    
    const goToNext = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <>
            <nav className="navbar">
                <div className="logo">
                    <p className="underline-animation">Recipe Finder</p>
                </div>
                <div className="nav-links">
                    <a href="#home">Home</a>
                    <a href="#recipes">Recipes</a>
                    <a href="#categories">Categories</a>
                    <a href="#about">About</a>
                </div>
            </nav>

            <div className="relative w-full h-[600px] overflow-hidden">
                {/* Images with Overlay Text */}
                <div 
                    className="flex transition-transform duration-500 ease-in-out h-full"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((image, index) => (
                        <div 
                            key={index}
                            className="min-w-full h-full flex-shrink-0 relative"
                        >
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-white">
                                <h2 className="text-4xl font-bold mb-4">{image.title}</h2>
                                <p className="text-xl">{image.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>

                {/* Dots Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-colors ${
                                currentIndex === index ? 'bg-white' : 'bg-white/50'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default App