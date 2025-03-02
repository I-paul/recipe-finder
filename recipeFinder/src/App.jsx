import React, { useState, useEffect, useContext } from 'react';
import { ChevronLeft, ChevronRight, User, X } from 'lucide-react';
import './App.css';
import { AuthContext } from './main';
import Login from './Login';
import Signup from './signup';

const App = () => {
  const { 
    isAuthenticated, 
    logout, 
    showAuthModal, 
    authMode, 
    openLogin, 
    closeAuthModal 
  } = useContext(AuthContext);

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

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <div className="navbar-content">
            <div className="logo">
              Recipe Finder
            </div>
            <div className="nav-links">
              <a href="#home">Home</a>
			  <a href="#about">About</a>
              <a href="#categories">Categories</a>
              <a href="#contact">Contact</a>
              {isAuthenticated ? (
                <button onClick={logout} >
                  <User size={16} />
                  Logout
                </button>
              ) : (
                <button onClick={openLogin}>
                  <User size={16} />
                  Login
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      {showAuthModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={closeAuthModal}>
              <X size={24} />
            </button>
            <div className="auth-container">
              {authMode === 'login' ? <Login /> : <Signup />}
            </div>
          </div>
        </div>
      )}

      <div className="slider-wrapper">
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
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                  />
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
      </div>
      <div className="section" id='about'>
        <p>
		Cooking made effortless! Our web app helps you discover the perfect dishes based on your preferences and the ingredients available near you. <br />
		Take the guesswork out of meal planning by simply uploading an image of a dish to get its recipe and step-by-step instructions. <br /> <br />
		To keep your meals fresh and exciting, the app tracks the dishes you've prepared over the past month, ensuring no repetitive suggestions. <br />
		Plus, connect with other food enthusiasts through the comment section under each recipe—share tips, ask questions, and make cooking a collaborative experience. <br /> <br />
		Say goodbye to mealtime dilemmas and start exploring new flavors with ease!
        </p>
      </div>
      <div className="levels-section" id='categories'>
        <div className="levels-grid">
          <div className="level-card">
            <h3 className="level-title">Beginner</h3>
            <p className="level-description">
              Perfect for those just starting their culinary journey. Learn basic techniques, 
              simple recipes, and essential kitchen safety.
            </p>
          </div>
          <div className="level-card">
            <h3 className="level-title">Intermediate</h3>
            <p className="level-description">
              Ready to expand your skills? Discover more complex techniques, international 
              cuisines, and flavor combinations.
            </p>
          </div>
          <div className="level-card">
            <h3 className="level-title">Advanced</h3>
            <p className="level-description">
              For experienced cooks looking to master sophisticated techniques, gourmet 
              dishes, and professional presentation.
            </p>
          </div>
          <div className="level-card">
            <h3 className="level-title">Master Chef</h3>
            <p className="level-description">
              Challenge yourself with expert-level recipes, innovative cooking methods, 
              and creative culinary experiments.
            </p>
          </div>
        </div>
      </div>
	  <div className='copyright'>
		<footer className="bg-gray-900 text-white text-center p-4">
		<p>&copy; {new Date().getFullYear()} Paul. All rights reserved.</p>
    	</footer>
	  </div>
    </>
  );
};

export default App;