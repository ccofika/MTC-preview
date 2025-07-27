import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(credentials.username, credentials.password);
      // Navigation will be handled by the useEffect hook
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-header">
            <div className="admin-logo">
              <img src="/images/logo-mtc.png" alt="Nissal Admin" />
            </div>
            <h1 className="admin-login-title">Admin Panel</h1>
            <p className="admin-login-subtitle">Prijavite se da pristupite admin panelu</p>
          </div>

          <form className="admin-login-form" onSubmit={handleSubmit}>
            {error && (
              <div className="admin-error-message">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="admin-form-group">
              <label htmlFor="username" className="admin-form-label">
                Korisničko ime
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="admin-form-input"
                value={credentials.username}
                onChange={handleInputChange}
                placeholder="Unesite korisničko ime"
                required
                autoComplete="username"
              />
            </div>

            <div className="admin-form-group">
              <label htmlFor="password" className="admin-form-label">
                Lozinka
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="admin-form-input"
                value={credentials.password}
                onChange={handleInputChange}
                placeholder="Unesite lozinku"
                required
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              className="admin-login-button"
              disabled={loading || !credentials.username || !credentials.password}
            >
              {loading ? (
                <>
                  <div className="admin-loading-spinner">
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                      </circle>
                    </svg>
                  </div>
                  Prijavljivanje...
                </>
              ) : (
                'Prijavite se'
              )}
            </button>
          </form>

          <div className="admin-login-footer">
            <p className="admin-footer-text">
              Nissal d.o.o. - Admin Panel
            </p>
            <p className="admin-footer-version">
              v1.0.0
            </p>
          </div>
        </div>

        <div className="admin-login-background">
          <div className="admin-bg-shape admin-bg-shape-1"></div>
          <div className="admin-bg-shape admin-bg-shape-2"></div>
          <div className="admin-bg-shape admin-bg-shape-3"></div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;