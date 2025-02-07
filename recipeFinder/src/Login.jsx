import React, { useState } from 'react';
import './App.css';
const Login = ({ onLogin }) => {
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

    // You can add more validation here

    // Call the onLogin function passed from the parent
    onLogin({ email, password });
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Recipe Finder</h1>
          <p>Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="error-message" style={{ color: 'var(--spice-red)', marginBottom: '1rem' }}>
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
            />
          </div>
          <button type="submit" className="login-button">Sign In</button>
        </form>
        <div className="login-footer">
          <p>Don't have an account? <a href="#signup">Sign up</a></p>
          <a href="#forgot-password">Forgot password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;