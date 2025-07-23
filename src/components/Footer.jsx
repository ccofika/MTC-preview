import React from 'react';
import './Footer.css';

const Footer = ({ content }) => {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section footer-contact">
            <h3>{content.footer.contact.title}</h3>
            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p>{content.footer.contact.address}</p>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22 16.92V19.92C22 20.5 21.39 21 20.83 21C9.28 21 0 11.72 0 0.169999C0 0.649999 0.5 0 1 0H4C4.58 0 5.09 0.39 5.09 0.97C5.52 4.43 6.59 7.7 8.21 10.58C8.5 11.09 8.39 11.79 7.97 12.21L6.09 14.09C7.57 17.19 10.81 20.43 13.91 21.91L15.79 20.03C16.21 19.61 16.91 19.5 17.42 19.79C20.3 21.41 23.57 22.48 27.03 22.91C27.61 22.91 28 23.42 28 24V27C28 27.61 27.5 28.22 26.92 28.22Z" fill="currentColor"/>
                  </svg>
                </div>
                <a href="tel:+38111123456">{content.footer.contact.phone}</a>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="L22 6L12 13L2 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <a href="mailto:info@nissal.rs">{content.footer.contact.email}</a>
              </div>
              
              <div className="contact-item">
                <div className="contact-icon">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p>{content.footer.contact.workingHours}</p>
              </div>
            </div>
          </div>
          
          <div className="footer-section footer-links">
            <h3>{content.footer.quickLinks.title}</h3>
            <ul className="footer-links-list">
              <li><a href="#products">{content.footer.quickLinks.products}</a></li>
              <li><a href="#services">{content.footer.quickLinks.services}</a></li>
              <li><a href="#projects">{content.footer.quickLinks.projects}</a></li>
              <li><a href="#contact">{content.footer.quickLinks.contact}</a></li>
            </ul>
          </div>
          
          <div className="footer-section footer-social">
            <h3>{content.footer.social.title}</h3>
            <div className="social-links">
              <a href="#" aria-label={content.footer.social.facebook} className="social-link facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span>{content.footer.social.facebook}</span>
              </a>
              <a href="#" aria-label={content.footer.social.instagram} className="social-link instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.596-3.205-1.529l1.42-1.165c.47.579 1.18.959 1.967.959 1.297 0 2.346-1.049 2.346-2.346s-1.049-2.346-2.346-2.346c-.787 0-1.497.38-1.967.959L4.244 9.355c.757-.933 1.908-1.529 3.205-1.529 2.245 0 4.062 1.817 4.062 4.062s-1.817 4.1-4.062 4.1zm7.441 0c-2.245 0-4.062-1.817-4.062-4.062s1.817-4.062 4.062-4.062c1.297 0 2.448.596 3.205 1.529l-1.42 1.165c-.47-.579-1.18-.959-1.967-.959-1.297 0-2.346 1.049-2.346 2.346s1.049 2.346 2.346 2.346c.787 0 1.497-.38 1.967-.959l1.42 1.165c-.757.933-1.908 1.529-3.205 1.529z"/>
                </svg>
                <span>{content.footer.social.instagram}</span>
              </a>
              <a href="#" aria-label={content.footer.social.linkedin} className="social-link linkedin">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span>{content.footer.social.linkedin}</span>
              </a>
            </div>
          </div>
          
          <div className="footer-section footer-certificates">
            <h3>{content.footer.certificates.title}</h3>
            <div className="certificates">
              <div className="certificate-item">
                <img src="/images/certificates/iso-cert.png" alt="ISO Certificate" />
                <span>ISO 9001:2015</span>
              </div>
              <div className="certificate-item">
                <img src="/images/certificates/ce-cert.png" alt="CE Certificate" />
                <span>CE Marking</span>
              </div>
            </div>
            
            <div className="company-info">
              <div className="company-logo">
                <img src="/images/logo/nissal-logo-white.svg" alt="Nissal" />
              </div>
              <p className="company-description">
                Vrhunski aluminijumski sistemi za modernu gradnju. 
                Kvalitet, inovacija i pouzdanost od 2008. godine.
              </p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              &copy; 2024 Nissal d.o.o. Sva prava zadržana.
            </p>
            <div className="footer-bottom-links">
              <a href="#privacy">Politika privatnosti</a>
              <a href="#terms">Uslovi korišćenja</a>
              <a href="#cookies">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;