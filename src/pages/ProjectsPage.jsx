import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projectService } from '../services/projectService';
import useLanguage from '../hooks/useLanguage';
import { getLocalizedProject } from '../utils/multilingual';
import { safeRender } from '../utils/safeRender';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const { language, changeLanguage } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    year: '',
    search: '',
    page: 1,
    limit: 12
  });
  const [pagination, setPagination] = useState({});
  const [categories, setCategories] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    loadProjects();
  }, [filters]);

  const loadInitialData = async () => {
    try {
      const [categoriesResponse, yearsResponse] = await Promise.all([
        projectService.getCategories(),
        projectService.getAvailableYears()
      ]);

      setCategories(categoriesResponse.data || []);
      setYears(yearsResponse.data || []);
    } catch (err) {
      console.error('Error loading initial data:', err);
    }
  };

  const loadProjects = async () => {
    setLoading(true);
    try {
      const response = await projectService.getProjects(filters);
      setProjects(response.data.projects || []);
      setPagination(response.data.pagination || {});
    } catch (err) {
      setError('Greška pri učitavanju projekata');
      console.error('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Search is already handled by useEffect when filters.search changes
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      year: '',
      search: '',
      page: 1,
      limit: 12
    });
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('sr-RS', {
      year: 'numeric',
      month: 'long'
    });
  };

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
      hero: {
        title: 'Prikaz potencijalnih projekata',
        subtitle: 'Naš cilj je da budući projekti koje realizujemo prikažu kvalitet, pažljivo odabrane detalje i usklađene boje.'
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
      hero: {
        title: 'Showcase of potential projects',
        subtitle: 'Our goal is that the future projects we realize demonstrate quality, carefully selected details and coordinated colors.'
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
      hero: {
        title: 'Präsentation potenzieller Projekte',
        subtitle: 'Unser Ziel ist es, dass die zukünftigen Projekte, die wir realisieren, Qualität, sorgfältig ausgewählte Details und abgestimmte Farben zeigen.'
      },
      filters: {
        title: 'Filter',
        category: 'Kategorie',
        allCategories: 'Alle Kategorien',
        location: 'Standort',
        allLocations: 'Alle Standorte',
        year: 'Jahr',
        allYears: 'Alle Jahre',
        search: 'Projekte suchen...',
        apply: 'Anwenden',
        clear: 'Löschen'
      },
      sorting: {
        sortBy: 'Sortieren nach',
        name: 'Name',
        date: 'Datum',
        location: 'Standort',
        category: 'Kategorie',
        asc: 'Aufsteigend',
        desc: 'Absteigend'
      },
      project: {
        viewDetails: 'Details ansehen',
        completed: 'Abgeschlossen',
        inProgress: 'In Bearbeitung',
        category: 'Kategorie',
        location: 'Standort',
        completionDate: 'Fertigstellungsdatum',
        duration: 'Projektdauer',
        client: 'Auftraggeber',
        size: 'Projektgröße',
        gallery: 'Bildergalerie',
        specifications: 'Spezifikationen'
      },
      categories: {
        residential: 'Wohngebäude',
        commercial: 'Gewerbegebäude',
        industrial: 'Industriegebäude',
        institutional: 'Öffentliche Gebäude',
        renovation: 'Renovierung',
        facade: 'Fassadensanierung'
      },
      pagination: {
        previous: 'Vorherige',
        next: 'Nächste',
        page: 'Seite',
        of: 'von',
        showing: 'Zeige',
        to: 'bis',
        projects: 'Projekte'
      },
      stats: {
        title: 'Projektstatistiken',
        totalProjects: 'Gesamtprojekte',
        completedProjects: 'Abgeschlossene Projekte',
        activeProjects: 'Aktive Projekte',
        totalArea: 'Gesamtfläche (m²)'
      },
      testimonials: {
        title: 'Was unsere Kunden sagen',
        viewMore: 'Mehr Bewertungen'
      },
      cta: {
        title: 'Haben Sie ein Projekt im Sinn?',
        subtitle: 'Kontaktieren Sie uns für ein kostenloses Beratungsgespräch',
        primaryButton: 'Projekt starten',
        secondaryButton: 'Portfolio ansehen'
      },
      noResults: {
        title: 'Keine Projekte gefunden',
        description: 'Versuchen Sie andere Suchkriterien oder Filter',
        clearFilters: 'Filter löschen'
      },
      error: {
        title: 'Fehler beim Laden der Projekte',
        retry: 'Erneut versuchen'
      },
      loading: {
        projects: 'Projekte werden geladen...',
        filters: 'Filter werden geladen...'
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
          title: 'Zertifikate und Partner'
        }
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="projects-page">
      {/* Header Section */}
      <Header 
        language={language} 
        onLanguageChange={changeLanguage} 
        content={currentContent} 
      />

      {/* Hero Section */}
      <section className="projects-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{currentContent.hero.title}</h1>
            <p className="hero-subtitle">{currentContent.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="projects-content">
          {/* Sidebar with filters */}
          <aside className="projects-sidebar">
            <div className="sidebar-section search-section">
              <h3>Pretraga</h3>
              <form onSubmit={handleSearchSubmit} className="search-form">
                <input
                  type="text"
                  placeholder="Pretraži projekte..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  <svg viewBox="0 0 24 24" fill="none">
                    <path
                      d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>

            <div className="sidebar-section">
              <h3>Kategorija</h3>
              <select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="filter-select"
              >
                <option value="">Sve kategorije</option>
                {categories.map(category => (
                  <option key={category} value={category}>{safeRender(category, language)}</option>
                ))}
              </select>
            </div>

            <div className="sidebar-section">
              <h3>Godina realizacije</h3>
              <select
                value={filters.year}
                onChange={(e) => handleFilterChange('year', e.target.value)}
                className="filter-select"
              >
                <option value="">Sve godine</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {(filters.category || filters.year || filters.search) && (
              <div className="sidebar-section">
                <button onClick={clearFilters} className="clear-filters-btn">
                  Obriši filtere
                </button>
              </div>
            )}
          </aside>

          {/* Main content area */}
          <main className="projects-main">
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Učitavanje projekata...</p>
              </div>
            ) : error ? (
              <div className="error-state">
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                  <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <h3>Greška pri učitavanju</h3>
                <p>{error}</p>
                <button onClick={loadProjects} className="retry-btn">Pokušaj ponovo</button>
              </div>
            ) : projects.length === 0 ? (
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M9 17H7C4.79086 17 3 15.2091 3 13V7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V13C21 15.2091 19.2091 17 17 17H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 21H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3>Nema rezultata</h3>
                <p>Nije pronađen nijedan projekat koji odgovara vašim kriterijumima.</p>
                <button onClick={clearFilters} className="clear-filters-btn">
                  Obriši filtere
                </button>
              </div>
            ) : (
              <>
                {/* Results header */}
                <div className="results-header">
                  <div className="results-info">
                    <h2>
                      Pronađeno {pagination.total || 0} projekata
                      {filters.category && ` u kategoriji "${safeRender(filters.category, language)}"`}
                      {filters.year && ` iz ${filters.year}. godine`}
                      {filters.search && ` za "${filters.search}"`}
                    </h2>
                  </div>
                </div>

                {/* Projects grid */}
                <div className="projects-grid">
                  {projects.map(project => {
                    const localizedProject = getLocalizedProject(project, language);
                    return (
                      <Link
                        key={project._id}
                        to={`/projekti/${project._id}`}
                        className="project-card"
                      >
                        <div className="project-image">
                          <img
                            src={project.gallery?.[0]?.url || '/images/placeholder/project-placeholder.jpg'}
                            alt={safeRender(localizedProject.localizedTitle, language)}
                            loading="lazy"
                          />
                          {project.featured && (
                            <div className="featured-badge">
                              <svg viewBox="0 0 24 24" fill="none">
                                <path
                                  d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z"
                                  fill="currentColor"
                                />
                              </svg>
                            </div>
                          )}
                        </div>
                        <div className="project-content">
                          <div className="project-meta">
                            <span className="project-category">{safeRender(localizedProject.localizedCategory, language)}</span>
                            {project.completionDate && (
                              <span className="project-date">{formatDate(project.completionDate)}</span>
                            )}
                          </div>
                          <h3 className="project-title">{safeRender(localizedProject.localizedTitle, language)}</h3>
                          <p className="project-description">
                            {safeRender(localizedProject.localizedDescription, language).length > 120
                              ? `${safeRender(localizedProject.localizedDescription, language).substring(0, 120)}...`
                              : safeRender(localizedProject.localizedDescription, language)
                            }
                          </p>
                          {localizedProject.localizedClient && (
                            <div className="project-client">
                              <span>Klijent: {safeRender(localizedProject.localizedClient, language)}</span>
                            </div>
                          )}
                          {localizedProject.localizedLocation && (
                          <div className="project-location">
                            <svg viewBox="0 0 24 24" fill="none">
                              <path
                                d="M21 10C21 17 12 23 12 23S3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z"
                                stroke="currentColor"
                                strokeWidth="2"
                              />
                              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                            </svg>
                            <span>{safeRender(localizedProject.localizedLocation, language)}</span>
                          </div>
                        )}
                        </div>
                      </Link>
                    );
                  })}
                </div>

                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="pagination">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                      className="pagination-btn"
                    >
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Prethodna
                    </button>

                    <div className="pagination-numbers">
                      {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                        .filter(page => {
                          const current = pagination.page;
                          return page === 1 || page === pagination.pages || 
                                 (page >= current - 2 && page <= current + 2);
                        })
                        .map((page, index, array) => (
                          <React.Fragment key={page}>
                            {index > 0 && array[index - 1] !== page - 1 && (
                              <span className="pagination-dots">...</span>
                            )}
                            <button
                              onClick={() => handlePageChange(page)}
                              className={`pagination-number ${page === pagination.page ? 'active' : ''}`}
                            >
                              {page}
                            </button>
                          </React.Fragment>
                        ))
                      }
                    </div>

                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.pages}
                      className="pagination-btn"
                    >
                      Sledeća
                      <svg viewBox="0 0 24 24" fill="none">
                        <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default ProjectsPage;