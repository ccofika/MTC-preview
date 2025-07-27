import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ language, onLanguageToggle, content }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <img src="/images/logo-mtc.png" alt="Nissal" />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="main-navigation desktop-nav">
            <ul>
              <li><Link to="/" className={location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}>{content.nav.home}</Link></li>
              <li><Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>{content.nav.products}</Link></li>
              <li><Link to="/services" className={location.pathname === '/services' ? 'active' : ''}>{content.nav.services}</Link></li>
              <li><Link to="/projekti" className={location.pathname === '/projekti' ? 'active' : ''}>{content.nav.projects}</Link></li>
              <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>{content.nav.about}</Link></li>
              <li><Link to="/ecology" className={location.pathname === '/ecology' ? 'active' : ''}>{content.nav.ecology}</Link></li>
              <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>{content.nav.contact}</Link></li>
            </ul>
          </nav>
          
          {/* Desktop Header Actions */}
          <div className="header-actions desktop-actions">
            <div className="language-switcher">
              <button onClick={onLanguageToggle} className="language-btn">
                {language}
              </button>
            </div>
            <div className="contact-info">
              <span className="phone">+381 11 123 4567</span>
              <span className="email">info@nissal.rs</span>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="mobile-actions">
            <button onClick={onLanguageToggle} className="language-btn mobile-lang-btn">
              {language}
            </button>
            
            {/* Hamburger Menu Button */}
            <button 
              className={`hamburger-btn ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        {/* Close Button */}
        <button 
          className="mobile-menu-close"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close navigation menu"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <nav className="mobile-navigation">
          <ul>
            <li>
              <Link 
                to="/" 
                className={location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.nav.home}
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={location.pathname === '/products' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.nav.products}
              </Link>
            </li>
            <li>
              <Link 
                to="/services" 
                className={location.pathname === '/services' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.nav.services}
              </Link>
            </li>
            <li>
              <Link 
                to="/projekti" 
                className={location.pathname === '/projekti' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.nav.projects}
              </Link>
            </li>
            <li>
              <Link 
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.nav.about}
              </Link>
            </li>
            <li>
              <Link 
                to="/ecology" 
                className={location.pathname === '/ecology' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.nav.ecology}
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={location.pathname === '/contact' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.nav.contact}
              </Link>
            </li>
          </ul>
          
          {/* Mobile Contact Info */}
          <div className="mobile-contact-info">
            <div className="mobile-contact-item">
              <span className="contact-label">Telefon:</span>
              <a href="tel:+381111234567" className="contact-value">+381 11 123 4567</a>
            </div>
            <div className="mobile-contact-item">
              <span className="contact-label">Email:</span>
              <a href="mailto:info@nissal.rs" className="contact-value">info@nissal.rs</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;