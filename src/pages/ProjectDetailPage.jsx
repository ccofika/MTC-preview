import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projectService } from '../services/projectService';
import useLanguage from '../hooks/useLanguage';
import { getLocalizedProject } from '../utils/multilingual';
import { safeRender } from '../utils/safeRender';
import './ProjectDetailPage.css';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const { language, changeLanguage } = useLanguage();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [relatedProjects, setRelatedProjects] = useState([]);

  // Create localized project that updates when language changes
  const localizedProject = React.useMemo(() => {
    return project ? getLocalizedProject(project, language) : null;
  }, [project, language]);

  useEffect(() => {
    loadProject();
  }, [id]);

  useEffect(() => {
    if (project) {
      loadRelatedProjects();
    }
  }, [project]);

  const loadProject = async () => {
    setLoading(true);
    try {
      const response = await projectService.getProjectById(id);
      setProject(response.data);
    } catch (err) {
      setError('Projekat nije pronađen');
      console.error('Error loading project:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProjects = async () => {
    try {
      const response = await projectService.getProjectsByCategory(project.category, {
        limit: 4,
        page: 1
      });
      
      // Filter out current project from related projects
      const filtered = response.data.projects.filter(p => p._id !== project._id);
      setRelatedProjects(filtered.slice(0, 3));
    } catch (err) {
      console.error('Error loading related projects:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('sr-RS', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handlePrevImage = () => {
    setSelectedImageIndex(prev => 
      prev === 0 ? project.gallery.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImageIndex(prev => 
      prev === project.gallery.length - 1 ? 0 : prev + 1
    );
  };


  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrevImage();
    } else if (e.key === 'ArrowRight') {
      handleNextImage();
    } else if (e.key === 'Escape') {
      // Close lightbox if implemented
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [project]);

  const content = {
    SR: {
      nav: {
        home: 'Početna',
        products: 'Proizvodi',
        services: 'Usluge',
        projects: 'Projekti',
        about: 'O nama',
        ecology: 'Ekologija',
        contact: 'Kontakt'
      },
      footer: {
        contact: {
          title: 'Kontakt informacije',
          address: 'Industrijska zona bb, 11000 Beograd',
          phone: '+381 11 123 4567',
          email: 'info@nissal.rs',
          workingHours: 'Pon-Pet: 08:00-16:00'
        },
        quickLinks: {
          title: 'Brzi linkovi',
          products: 'Proizvodi',
          services: 'Usluge',
          projects: 'Projekti',
          contact: 'Kontakt'
        },
        social: {
          title: 'Pratite nas',
          facebook: 'Facebook',
          instagram: 'Instagram',
          linkedin: 'LinkedIn'
        },
        certificates: {
          title: 'Sertifikati i partneri'
        }
      }
    },
    EN: {
      nav: {
        home: 'Home',
        products: 'Products',
        services: 'Services',
        projects: 'Projects',
        about: 'About',
        ecology: 'Ecology',
        contact: 'Contact'
      },
      footer: {
        contact: {
          title: 'Contact Information',
          address: 'Industrial zone bb, 11000 Belgrade',
          phone: '+381 11 123 4567',
          email: 'info@nissal.rs',
          workingHours: 'Mon-Fri: 08:00-16:00'
        },
        quickLinks: {
          title: 'Quick Links',
          products: 'Products',
          services: 'Services',
          projects: 'Projects',
          contact: 'Contact'
        },
        social: {
          title: 'Follow Us',
          facebook: 'Facebook',
          instagram: 'Instagram',
          linkedin: 'LinkedIn'
        },
        certificates: {
          title: 'Certificates & Partners'
        }
      }
    },
    DE: {
      nav: {
        home: 'Startseite',
        products: 'Produkte',
        services: 'Dienstleistungen',
        projects: 'Projekte',
        about: 'Über uns',
        ecology: 'Ökologie',
        contact: 'Kontakt'
      },
      footer: {
        contact: {
          title: 'Kontaktinformationen',
          address: 'Industriezone bb, 11000 Belgrad',
          phone: '+381 11 123 4567',
          email: 'info@nissal.rs',
          workingHours: 'Mo-Fr: 08:00-16:00'
        },
        quickLinks: {
          title: 'Schnelllinks',
          products: 'Produkte',
          services: 'Dienstleistungen',
          projects: 'Projekte',
          contact: 'Kontakt'
        },
        social: {
          title: 'Folgen Sie uns',
          facebook: 'Facebook',
          instagram: 'Instagram',
          linkedin: 'LinkedIn'
        },
        certificates: {
          title: 'Zertifikate & Partner'
        }
      }
    }
  };

  const currentContent = content[language];

  if (loading) {
    return (
      <div className="project-detail-page">
        <Header 
          language={language} 
          onLanguageChange={changeLanguage} 
          content={currentContent} 
        />
        <div className="container">
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Učitavanje projekta...</p>
          </div>
        </div>
        <Footer content={currentContent} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="project-detail-page">
        <Header 
          language={language} 
          onLanguageChange={changeLanguage} 
          content={currentContent} 
        />
        <div className="container">
          <div className="error-state">
            <svg viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
              <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <h2>Greška pri učitavanju</h2>
            <p>{error}</p>
            <div className="error-actions">
              <button onClick={loadProject} className="retry-btn">Pokušaj ponovo</button>
              <Link to="/projekti" className="back-btn">Nazad na projekte</Link>
            </div>
          </div>
        </div>
        <Footer content={currentContent} />
      </div>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <div className="project-detail-page">
      <Header 
        language={language} 
        onLanguageChange={changeLanguage} 
        content={currentContent} 
      />
      
      {/* Breadcrumb */}
      <div className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">Početna</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/projekti">Projekti</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">{safeRender(localizedProject?.localizedTitle, language)}</span>
          </nav>
        </div>
      </div>

      <div className="container">
        <div className="project-detail-content">
          {/* Project Header */}
          <header className="project-header">
            <div className="project-meta">
              <span className="project-category">{safeRender(localizedProject?.localizedCategory, language)}</span>
              {project.featured && (
                <span className="featured-badge">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                      fill="currentColor"
                    />
                  </svg>
                  Izdvojeno
                </span>
              )}
            </div>
            <h1 className="project-title">{safeRender(localizedProject?.localizedTitle, language)}</h1>
            <div className="project-details">
              {localizedProject?.localizedClient && (
                <div className="detail-item">
                  <span className="detail-label">Klijent:</span>
                  <span className="detail-value">{safeRender(localizedProject?.localizedClient, language)}</span>
                </div>
              )}
              {localizedProject?.localizedLocation && (
                <div className="detail-item">
                  <span className="detail-label">Lokacija:</span>
                  <span className="detail-value">{safeRender(localizedProject?.localizedLocation, language)}</span>
                </div>
              )}
              {project.completionDate && (
                <div className="detail-item">
                  <span className="detail-label">Datum završetka:</span>
                  <span className="detail-value">{formatDate(project.completionDate)}</span>
                </div>
              )}
            </div>
          </header>

          {/* Image Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section className="project-gallery">
              <div className="main-image">
                <img
                  src={project.gallery[selectedImageIndex]?.url}
                  alt={project.gallery[selectedImageIndex]?.alt || safeRender(localizedProject?.localizedTitle, language)}
                  className="gallery-main-img"
                />
                {project.gallery.length > 1 && (
                  <div className="image-navigation">
                    <button
                      onClick={handlePrevImage}
                      className="nav-btn prev-btn"
                      aria-label="Prethodna slika"
                    >
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="nav-btn next-btn"
                      aria-label="Sledeća slika"
                    >
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                )}
                <div className="image-counter">
                  {selectedImageIndex + 1} / {project.gallery.length}
                </div>
              </div>
              
              {project.gallery.length > 1 && (
                <div className="thumbnail-strip">
                  {project.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => handleImageClick(index)}
                      className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                    >
                      <img
                        src={image.url}
                        alt={image.alt || `${safeRender(localizedProject?.localizedTitle, language)} ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* Project Description */}
          <section className="project-description">
            <h2>O projektu</h2>
            <div className="description-content">
              {safeRender(localizedProject?.localizedDescription, language).split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </section>

          {/* Project Tags */}
          {project.tags && project.tags.length > 0 && (
            <section className="project-tags">
              <h3>Ključne reči</h3>
              <div className="tags-list">
                {project.tags.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            </section>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <section className="related-projects">
              <h2>Slični projekti</h2>
              <div className="related-projects-grid">
                {relatedProjects.map(relatedProject => (
                  <Link
                    key={relatedProject._id}
                    to={`/projekti/${relatedProject._id}`}
                    className="related-project-card"
                  >
                    <div className="related-project-image">
                      <img
                        src={relatedProject.gallery?.[0]?.url || '/images/placeholder/project-placeholder.jpg'}
                        alt={relatedProject.title}
                      />
                    </div>
                    <div className="related-project-content">
                      <h3>{relatedProject.title}</h3>
                      <p className="related-project-category">{relatedProject.category}</p>
                      {relatedProject.completionDate && (
                        <p className="related-project-date">
                          {formatDate(relatedProject.completionDate)}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Navigation */}
          <section className="project-navigation">
            <Link to="/projekti" className="back-to-projects">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Nazad na sve projekte
            </Link>
          </section>
        </div>
      </div>
      
      <Footer content={currentContent} />
    </div>
  );
};

export default ProjectDetailPage;