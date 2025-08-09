import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ProductManager from '../components/ProductManager';
import ProjectManager from '../components/ProjectManager';
import AdminSettings from '../components/AdminSettings';
import FeaturedProductsManager from '../components/FeaturedProductsManager';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { adminUser, logout } = useAuth();
  const [showProductManager, setShowProductManager] = useState(false);
  const [showProjectManager, setShowProjectManager] = useState(false);
  const [showAdminSettings, setShowAdminSettings] = useState(false);
  const [showFeaturedProductsManager, setShowFeaturedProductsManager] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  if (!adminUser) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
          color: 'white'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255,255,255,0.3)',
            borderTop: '3px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          <p>Učitavanje admin panela...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page">
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-container">
          <div className="admin-header-left">
            <div className="admin-logo">
              <img src="/images/logo-mtc.png" alt="Nissal Admin" />
            </div>
            <h1 className="admin-header-title">Admin Panel</h1>
          </div>
          
          <div className="admin-header-right">
            <div className="admin-user-info">
              <span className="admin-welcome">Dobrodošli, {adminUser.username}</span>
            </div>
            <button className="admin-logout-btn" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 17L21 12L16 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Odjava
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="admin-main">
        <div className="admin-main-container">
          <div className="admin-welcome-section">
            <h2 className="admin-page-title">Pregled administratorskog panela</h2>
            <p className="admin-page-subtitle">
              Dobrodošli u admin panel NISSAL sistema. Ovde možete upravljati svim aspektima vašeg sajta.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="admin-stats-grid">
            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 7L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="admin-stat-content">
                <div className="admin-stat-number">8</div>
                <div className="admin-stat-label">Aluminijumski sistemi</div>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                  <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                  <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="admin-stat-content">
                <div className="admin-stat-number">5</div>
                <div className="admin-stat-label">Završeni projekti</div>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="admin-stat-content">
                <div className="admin-stat-number">247</div>
                <div className="admin-stat-label">Ukupno sati rada</div>
              </div>
            </div>

            <div className="admin-stat-card">
              <div className="admin-stat-icon">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="17,11 19,13 23,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="admin-stat-content">
                <div className="admin-stat-number">2</div>
                <div className="admin-stat-label">Admin korisnici</div>
              </div>
            </div>
          </div>

          {/* Management Cards */}
          <div className="admin-management-grid">
            <div className="admin-management-card">
              <div className="admin-card-header">
                <div className="admin-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <line x1="8" y1="21" x2="16" y2="21" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="17" x2="12" y2="21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="admin-card-title">Upravljanje sistemima</h3>
              </div>
              <p className="admin-card-description">
                Dodajte, uredite ili uklonite aluminijumske sisteme, upravlje specifikacijama i cenama.
              </p>
              <button 
                className="admin-card-button"
                onClick={() => setShowProductManager(true)}
              >
                Upravljaj sistemima
              </button>
            </div>

            <div className="admin-management-card">
              <div className="admin-card-header">
                <div className="admin-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="admin-card-title">Upravljanje projektima</h3>
              </div>
              <p className="admin-card-description">
                Dodajte nove projekte, uredite galerije slika i opise realizovanih radova.
              </p>
              <button 
                className="admin-card-button"
                onClick={() => setShowProjectManager(true)}
              >
                Upravljaj projektima
              </button>
            </div>

            <div className="admin-management-card">
              <div className="admin-card-header">
                <div className="admin-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="admin-card-title">Istaknuti proizvodi</h3>
              </div>
              <p className="admin-card-description">
                Odaberite 4 proizvoda koji će biti prikazani na početnoj stranici.
              </p>
              <button 
                className="admin-card-button"
                onClick={() => setShowFeaturedProductsManager(true)}
              >
                Upravljaj istaknutim proizvodima
              </button>
            </div>

            <div className="admin-management-card">
              <div className="admin-card-header">
                <div className="admin-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <h3 className="admin-card-title">Sertifikati i standardi</h3>
              </div>
              <p className="admin-card-description">
                Upravljajte sertifikatima kvaliteta, standardima i dokumentacijom.
              </p>
              <button className="admin-card-button">
                Upravljaj sertifikatima
              </button>
            </div>

            <div className="admin-management-card">
              <div className="admin-card-header">
                <div className="admin-card-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19.4 15C19.2669 15.3016 19.2272 15.6362 19.286 15.9606C19.3448 16.285 19.4995 16.5843 19.73 16.82L19.79 16.88C19.976 17.0657 20.1235 17.2863 20.2241 17.5291C20.3248 17.7719 20.3766 18.0322 20.3766 18.295C20.3766 18.5578 20.3248 18.8181 20.2241 19.0609C20.1235 19.3037 19.976 19.5243 19.79 19.71C19.6043 19.896 19.3837 20.0435 19.1409 20.1441C18.8981 20.2448 18.6378 20.2966 18.375 20.2966C18.1122 20.2966 17.8519 20.2448 17.6091 20.1441C17.3663 20.0435 17.1457 19.896 16.96 19.71L16.9 19.65C16.6643 19.4195 16.365 19.2648 16.0406 19.206C15.7162 19.1472 15.3816 19.1869 15.08 19.32C14.7842 19.4468 14.532 19.6572 14.3543 19.9255C14.1766 20.1938 14.0813 20.5082 14.08 20.83V21C14.08 21.5304 13.8693 22.0391 13.4942 22.4142C13.1191 22.7893 12.6104 23 12.08 23C11.5496 23 11.0409 22.7893 10.6658 22.4142C10.2907 22.0391 10.08 21.5304 10.08 21V20.91C10.0723 20.579 9.96512 20.258 9.77251 19.9887C9.5799 19.7194 9.31074 19.5143 9 19.4C8.69838 19.2669 8.36381 19.2272 8.03941 19.286C7.71502 19.3448 7.41568 19.4995 7.18 19.73L7.12 19.79C6.93425 19.976 6.71368 20.1235 6.47088 20.2241C6.22808 20.3248 5.96783 20.3766 5.705 20.3766C5.44217 20.3766 5.18192 20.3248 4.93912 20.2241C4.69632 20.1235 4.47575 19.976 4.29 19.79C4.10405 19.6043 3.95653 19.3837 3.85588 19.1409C3.75523 18.8981 3.70343 18.6378 3.70343 18.375C3.70343 18.1122 3.75523 17.8519 3.85588 17.6091C3.95653 17.3663 4.10405 17.1457 4.29 16.96L4.35 16.9C4.58054 16.6643 4.73519 16.365 4.794 16.0406C4.85282 15.7162 4.81312 15.3816 4.68 15.08C4.55324 14.7842 4.34276 14.532 4.07447 14.3543C3.80618 14.1766 3.49179 14.0813 3.17 14.08H3C2.46957 14.08 1.96086 13.8693 1.58579 13.4942C1.21071 13.1191 1 12.6104 1 12.08C1 11.5496 1.21071 11.0409 1.58579 10.6658C1.96086 10.2907 2.46957 10.08 3 10.08H3.09C3.42099 10.0723 3.742 9.96512 4.0113 9.77251C4.28059 9.5799 4.48572 9.31074 4.6 9C4.73312 8.69838 4.77282 8.36381 4.714 8.03941C4.65519 7.71502 4.50054 7.41568 4.27 7.18L4.21 7.12C4.02405 6.93425 3.87653 6.71368 3.77588 6.47088C3.67523 6.22808 3.62343 5.96783 3.62343 5.705C3.62343 5.44217 3.67523 5.18192 3.77588 4.93912C3.87653 4.69632 4.02405 4.47575 4.21 4.29C4.39575 4.10405 4.61632 3.95653 4.85912 3.85588C5.10192 3.75523 5.36217 3.70343 5.625 3.70343C5.88783 3.70343 6.14808 3.75523 6.39088 3.85588C6.63368 3.95653 6.85425 4.10405 7.04 4.29L7.1 4.35C7.33568 4.58054 7.63502 4.73519 7.95941 4.794C8.28381 4.85282 8.61838 4.81312 8.92 4.68H9C9.29577 4.55324 9.54802 4.34276 9.72569 4.07447C9.90337 3.80618 9.99872 3.49179 10 3.17V3C10 2.46957 10.2107 1.96086 10.5858 1.58579C10.9609 1.21071 11.4696 1 12 1C12.5304 1 13.0391 1.21071 13.4142 1.58579C13.7893 1.96086 14 2.46957 14 3V3.09C14.0013 3.41179 14.0966 3.72618 14.2743 3.99447C14.452 4.26276 14.7042 4.47324 15 4.6C15.3016 4.73312 15.6362 4.77282 15.9606 4.714C16.285 4.65519 16.5843 4.50054 16.82 4.27L16.88 4.21C17.0657 4.02405 17.2863 3.87653 17.5291 3.77588C17.7719 3.67523 18.0322 3.62343 18.295 3.62343C18.5578 3.62343 18.8181 3.67523 19.0609 3.77588C19.3037 3.87653 19.5243 4.02405 19.71 4.21C19.896 4.39575 20.0435 4.61632 20.1441 4.85912C20.2448 5.10192 20.2966 5.36217 20.2966 5.625C20.2966 5.88783 20.2448 6.14808 20.1441 6.39088C20.0435 6.63368 19.896 6.85425 19.71 7.04L19.65 7.1C19.4195 7.33568 19.2648 7.63502 19.206 7.95941C19.1472 8.28381 19.1869 8.61838 19.32 8.92V9C19.4468 9.29577 19.6572 9.54802 19.9255 9.72569C20.1938 9.90337 20.5082 9.99872 20.83 10H21C21.5304 10 22.0391 10.2107 22.4142 10.5858C22.7893 10.9609 23 11.4696 23 12C23 12.5304 22.7893 13.0391 22.4142 13.4142C22.0391 13.7893 21.5304 14 21 14H20.91C20.5882 14.0013 20.2738 14.0966 20.0055 14.2743C19.7372 14.452 19.5268 14.7042 19.4 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="admin-card-title">Sistem postavke</h3>
              </div>
              <p className="admin-card-description">
                Konfiguriši sistem postavke, korisnicke naloge i sigurnosne opcije.
              </p>
              <button 
                className="admin-card-button"
                onClick={() => setShowAdminSettings(true)}
              >
                Otvori postavke
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="admin-recent-section">
            <h3 className="admin-section-title">Nedavne aktivnosti</h3>
            <div className="admin-activity-list">
              <div className="admin-activity-item">
                <div className="admin-activity-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 1V3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 21V23" stroke="currentColor" strokeWidth="2"/>
                    <path d="M4.22 4.22L5.64 5.64" stroke="currentColor" strokeWidth="2"/>
                    <path d="M18.36 18.36L19.78 19.78" stroke="currentColor" strokeWidth="2"/>
                    <path d="M1 12H3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M21 12H23" stroke="currentColor" strokeWidth="2"/>
                    <path d="M4.22 19.78L5.64 18.36" stroke="currentColor" strokeWidth="2"/>
                    <path d="M18.36 5.64L19.78 4.22" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="admin-activity-content">
                  <div className="admin-activity-title">Dodato je 2 nova aluminijska sistema</div>
                  <div className="admin-activity-time">Pre 2 sata</div>
                </div>
              </div>

              <div className="admin-activity-item">
                <div className="admin-activity-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="admin-activity-content">
                  <div className="admin-activity-title">Završen projekat "Stambena zgrada Novi Beograd"</div>
                  <div className="admin-activity-time">Pre 4 sata</div>
                </div>
              </div>

              <div className="admin-activity-item">
                <div className="admin-activity-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="21,15 16,10 5,21" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div className="admin-activity-content">
                  <div className="admin-activity-title">Ažuriran projekat "Luksuzna Vila Dedinje"</div>
                  <div className="admin-activity-time">Juče</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Product Manager Modal */}
      {showProductManager && (
        <ProductManager onClose={() => setShowProductManager(false)} />
      )}

      {/* Project Manager Modal */}
      {showProjectManager && (
        <ProjectManager onClose={() => setShowProjectManager(false)} />
      )}

      {/* Admin Settings Modal */}
      {showAdminSettings && (
        <AdminSettings onClose={() => setShowAdminSettings(false)} />
      )}

      {/* Featured Products Manager Modal */}
      {showFeaturedProductsManager && (
        <FeaturedProductsManager onClose={() => setShowFeaturedProductsManager(false)} />
      )}
    </div>
  );
};

export default AdminDashboard;