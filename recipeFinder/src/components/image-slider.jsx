import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight} from 'lucide-react';
import './styling/slider-styles.css';

const Slider =() => {
    const images = [
        {
          src: "../src/assets/slide1.jpg",
          alt: "Delicious Recipes",
          title: "Delicious Recipes",
          subtitle: "Discover your next favorite meal"
        },
        {
          src: "../src/assets/slide4.jpg",
          alt: "Quick & Easy",
          title: "Quick & Easy",
          subtitle: "30-minute meals for busy days"
        },
        {
          src: "../src/assets/slide3.jpg",
          alt: "Healthy Choices",
          title: "Healthy Choices",
          subtitle: "Nutritious and delicious options"
        },
        {
          src: "../src/assets/slide2.jpg",
          alt: "Seasonal Specials",
          title: "Seasonal Specials",
          subtitle: "Fresh and seasonal ingredients"
        },
      ];
    
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const getSlideIndex = (index) => {
        if (index < 0) return images.length - 1;
        if (index >= images.length) return 0;
        return index;
    };

    useEffect(() => {
        const timer = setInterval(() => {
            if (!isAnimating) {
            goToNext();
            }
        }, 6000);

        return () => clearInterval(timer);
    }, [isAnimating]);

    const goToPrevious = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => getSlideIndex(prevIndex - 1));
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const goToNext = () => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentIndex((prevIndex) => getSlideIndex(prevIndex + 1));
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    const goToSlide = (index) => {
        if (!isAnimating && index !== currentIndex) {
            setIsAnimating(true);
            setCurrentIndex(index);
            setTimeout(() => setIsAnimating(false), 500);
        }
    };

    return (
        <section className='slider-wrapper'>
            <div className="slider-container">
                <div className="slider-track">
                    {[-1, 0, 1].map((offset) => {
                    const slideIndex = getSlideIndex(currentIndex + offset);
                    const image = images[slideIndex];
                    return (
                    <div
                        key={slideIndex}
                        className={`slide ${offset === 0 ? 'active' : ''} ${
                        offset === -1 ? 'prev' : offset === 1 ? 'next' : ''
                        }`}>
                        <img src={image.src} alt={image.alt} />
                        {offset === 0 && (
                        <div className="slide-overlay">
                            <div className="slide-content">
                                <h2>{image.title}</h2>
                                <p>{image.subtitle}</p>
                            </div>
                        </div>
                        )}
                    </div>
                    );
                    })}
                </div>

                <button className="nav-button prev-button" onClick={goToPrevious}>
                <ChevronLeft size={24} />
                </button>
                <button className="nav-button next-button" onClick={goToNext}>
                <ChevronRight size={24} />
                </button>

                <div className="slider-dots">
                    {images.map((_, index) => (
                    <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`dot ${index === currentIndex ? 'active' : ''}`}
                    />
                    ))}
                </div>
            </div>
        </section>
    );

};

export default Slider;