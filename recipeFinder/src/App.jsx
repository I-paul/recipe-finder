import React, {useContext} from 'react';
import {User, X } from 'lucide-react';
import './components/styling/App.css';
import { AuthContext } from './main';
import Login from './components/Login';
import Signup from './components/Signup';
import ContactSection from './components/contact';
import Levels from './components/levels-sec';
import Slider from './components/image-slider';
const App = () => {
  const { 
    isAuthenticated, 
    logout, 
    showAuthModal, 
    authMode, 
    openLogin, 
    closeAuthModal 
  } = useContext(AuthContext);

  

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
              <a href="#">Home</a>
			  <a href="#about">About</a>
              <a href="#levels">Levels</a>
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
      <Slider/>
      <div className="section" id='about'>
        <p>
          Cooking made effortless! Our web app helps you discover the perfect dishes based on your preferences and the ingredients available near you. <br />
          Take the guesswork out of meal planning by simply uploading an image of a dish to get its recipe and step-by-step instructions. <br /> <br />
          To keep your meals fresh and exciting, the app tracks the dishes you've prepared over the past month, ensuring no repetitive suggestions. <br />
          Plus, connect with other food enthusiasts through the comment section under each recipe—share tips, ask questions, and make cooking a collaborative experience. <br /> <br />
          Say goodbye to mealtime dilemmas and start exploring new flavors with ease!
        </p>
      </div>
      <Levels/>
      <ContactSection/>
      <div className='copyright'>
        <footer className="foot">
          <p>&copy; {new Date().getFullYear()} Paul. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default App;