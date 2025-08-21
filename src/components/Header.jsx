import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logoWhite from '../assets/images/FINAL-LOGO-BELI.png';
import logoBlack from '../assets/images/FINAL-LOGO-CRNI.png';
import { ChevronDown, X } from 'lucide-react';

const Header = ({ language, onLanguageChange, content }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(true);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // Language options
  const languageOptions = [
    { code: 'SR', name: 'Srpski', flag: '🇷🇸' },
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'DE', name: 'Deutsch', flag: '🇩🇪' }
  ];

  // Handle language selection
  const handleLanguageSelect = (languageCode) => {
    onLanguageChange(languageCode);
    setIsLanguageDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageDropdownOpen && !event.target.closest('.language-switcher')) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLanguageDropdownOpen]);

  // Check if current page has a hero section
  const hasHeroSection = () => {
    const heroPages = ['/', '/home', '/products', '/services', '/projekti', '/projects', '/ecology', '/about', '/contact'];
    return heroPages.includes(location.pathname);
  };

  // Handle scroll events for header styling
  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = 0;
      
      // Check if we're on homepage with custom scroll container
      if (location.pathname === '/' || location.pathname === '/home') {
        const homePageContainer = document.querySelector('.home-page');
        if (homePageContainer) {
          scrollTop = homePageContainer.scrollTop;
        } else {
          scrollTop = window.scrollY;
        }
      } else {
        scrollTop = window.scrollY;
      }
      
      const scrolled = scrollTop > 50;
      setIsScrolled(scrolled);
      
      const currentHasHero = hasHeroSection();
      
      if (currentHasHero) {
        // Show transparent navbar only at very top, white background after minimal scroll
        const scrollThreshold = 50; // Show transparent only until 50px scroll
        const isStillOverHero = scrollTop < scrollThreshold;
        setIsOverHero(isStillOverHero);
      } else {
        setIsOverHero(false);
      }
    };

    handleScroll(); // Check initial state
    
    // Add scroll listener to both window and homepage container
    if (location.pathname === '/' || location.pathname === '/home') {
      const homePageContainer = document.querySelector('.home-page');
      if (homePageContainer) {
        homePageContainer.addEventListener('scroll', handleScroll);
      }
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        if (homePageContainer) {
          homePageContainer.removeEventListener('scroll', handleScroll);
        }
        window.removeEventListener('scroll', handleScroll);
      };
    } else {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname]);

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
    <header className={`site-header ${isScrolled ? 'scrolled' : ''} ${isOverHero && hasHeroSection() ? 'over-hero' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <Link to="/">
              <img 
                src={isOverHero && hasHeroSection() ? logoWhite : logoBlack} 
                alt="MTC" 
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="main-navigation desktop-nav">
            <ul>
              <li><Link to="/" className={location.pathname === '/' || location.pathname === '/home' ? 'active' : ''}>{content.nav.home}</Link></li>
              <li><Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>{content.nav.products}</Link></li>
              <li><Link to="/projekti" className={location.pathname === '/projekti' ? 'active' : ''}>{content.nav.projects}</Link></li>
              <li><Link to="/ecology" className={location.pathname === '/ecology' ? 'active' : ''}>{content.nav.ecology}</Link></li>
              <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>{content.nav.about}</Link></li>
              <li><Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>{content.nav.contact}</Link></li>
            </ul>
          </nav>
          
          {/* Desktop Header Actions */}
          <div className="header-actions desktop-actions">
            <div className="language-switcher">
              <button 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className={`language-btn ${isLanguageDropdownOpen ? 'active' : ''}`}
                aria-expanded={isLanguageDropdownOpen}
              >
{languageOptions.find(lang => lang.code === language)?.name}
                <ChevronDown size={16} />
              </button>
              {isLanguageDropdownOpen && (
                <div className="language-dropdown">
                  {languageOptions.map(option => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageSelect(option.code)}
                      className={`language-option ${language === option.code ? 'active' : ''}`}
                    >
                      <span className="name">{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="contact-info">
              <span className="phone">+381 18 415 63 32</span>
              <span className="email">office@mtc.co.rs</span>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="mobile-actions">
            <div className="language-switcher mobile-language-switcher">
              <button 
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className={`language-btn mobile-lang-btn ${isLanguageDropdownOpen ? 'active' : ''}`}
                aria-expanded={isLanguageDropdownOpen}
              >
{languageOptions.find(lang => lang.code === language)?.name}
              </button>
              {isLanguageDropdownOpen && (
                <div className="language-dropdown mobile-dropdown">
                  {languageOptions.map(option => (
                    <button
                      key={option.code}
                      onClick={() => handleLanguageSelect(option.code)}
                      className={`language-option ${language === option.code ? 'active' : ''}`}
                    >
                      <span className="name">{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
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
          <X size={24} />
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
                to="/projekti" 
                className={location.pathname === '/projekti' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.nav.projects}
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
                to="/about" 
                className={location.pathname === '/about' ? 'active' : ''}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {content.nav.about}
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
              <a href="tel:+381184156332" className="contact-value">+381 18 415 63 32</a>
            </div>
            <div className="mobile-contact-item">
              <span className="contact-label">Email:</span>
              <a href="mailto:office@mtc.co.rs" className="contact-value">office@mtc.co.rs</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;