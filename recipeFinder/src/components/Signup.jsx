import React, { useState, useContext } from 'react';
import { AuthContext } from '../main';
import './styling/App.css';

const Signup = () => {
  const { signup, toggleAuthMode } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Call the signup function from AuthContext
    signup(formData);
  };

  return (
    <div className="auth-form-container signup-form">
      <div className="auth-header">
        <h2>Create Account</h2>
        <p>Join Recipe Finder and start your culinary journey</p>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={formData.password}
            onChange={handleChange}
            required 
            placeholder="••••••••"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={formData.confirmPassword}
            onChange={handleChange}
            required 
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="auth-button">Create Account</button>
      </form>
      <div className="auth-footer">
        <p>
          Already have an account?{' '}
          <button 
            onClick={toggleAuthMode}
            className="auth-toggle-button"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;