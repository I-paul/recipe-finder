import React, { useState, useContext } from 'react';
import { AuthContext } from '../main';
import './styling/App.css';

const Login = () => {
  const { login, toggleAuthMode } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Add validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Call the login function from AuthContext
    login({ email, password });
  };

  return (
    <div className="auth-form-container login-form">
      <div className="auth-header">
        <h2>Welcome Back</h2>
        <p>Sign in to your Recipe Finder account</p>
      </div>
      <form onSubmit={handleSubmit} className="auth-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="your@email.com"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="••••••••"
          />
        </div>
        <div className="forgot-password">
          <a href="#forgot-password">Forgot password?</a>
        </div>
        <button type="submit" className="auth-button">Sign In</button>
      </form>
      <div className="auth-footer">
        <p>
          Don't have an account?{' '}
          <button 
            onClick={toggleAuthMode}
            className="auth-toggle-button"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;