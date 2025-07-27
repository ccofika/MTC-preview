import React, { useState, useEffect } from 'react';
import './HomePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projectService } from '../services/projectService';
import { productService } from '../services/productService';

const HomePage = () => {
  const [language, setLanguage] = useState('SR');
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);
  const [productsError, setProductsError] = useState(null);

  const toggleLanguage = () => {
    setLanguage(language === 'SR' ? 'EN' : 'SR');
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
        title: 'Nissal – Aluminijumski sistemi priznati širom sveta',
        subtitle: 'Kreiramo inovativna rešenja za modernu gradnju koje zadovoljavaju potrebe projektanata i investitora',
        ctaPrimary: 'Pogledaj proizvode',
        ctaSecondary: 'Traži ponudu'
      },
      values: {
        title: 'Naše ključne vrednosti',
        quality: {
          title: 'Kvalitet i pouzdanost',
          description: 'Proizvodimo prema najvišim standardima kvaliteta sa ISO i CE sertifikatima'
        },
        innovation: {
          title: 'Inovacija i tehnologija',
          description: 'Koristimo najnovije tehnologije u proizvodnji i pružamo prilagođena rešenja'
        },
        experience: {
          title: 'Iskustvo i podrška',
          description: 'Preko 15 godina iskustva sa stručnim timom za konsultacije i podršku'
        }
      },
      products: {
        title: 'Naši aluminijumski profili',
        windows: {
          title: 'Prozorski sistemi',
          description: 'Visokokvalitetni aluminijumski prozori za stambene i komercijalne objekte'
        },
        doors: {
          title: 'Vrata sistemi',
          description: 'Elegantna i funkcionalna rešenja za ulazna i unutrašnja vrata'
        },
        facades: {
          title: 'Fasadni sistemi',
          description: 'Moderna fasadna rešenja za komercijalne i stambene zgrade'
        },
        industrial: {
          title: 'Industrijski profili',
          description: 'Specijalizovani profili za industrijske i tehnološke primene'
        }
      },
      stats: {
        title: 'Zašto odabrati Nissal',
        projects: 'završenih projekata',
        experience: 'godina iskustva',
        clients: 'zadovoljnih klijenata',
        support: 'tehnička podrška'
      },
      recentProjects: {
        title: 'Najnoviji projekti',
        viewAll: 'Pogledaj sve projekte'
      },
      testimonials: {
        title: 'Šta kažu naši klijenti'
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
        title: 'Nissal – Aluminum systems recognized worldwide',
        subtitle: 'We create innovative solutions for modern construction that meet the needs of designers and investors',
        ctaPrimary: 'View products',
        ctaSecondary: 'Request quote'
      },
      values: {
        title: 'Our key values',
        quality: {
          title: 'Quality and reliability',
          description: 'We manufacture according to the highest quality standards with ISO and CE certificates'
        },
        innovation: {
          title: 'Innovation and technology',
          description: 'We use the latest production technologies and provide customized solutions'
        },
        experience: {
          title: 'Experience and support',
          description: 'Over 15 years of experience with expert team for consultations and support'
        }
      },
      products: {
        title: 'Our aluminum profiles',
        windows: {
          title: 'Window systems',
          description: 'High-quality aluminum windows for residential and commercial buildings'
        },
        doors: {
          title: 'Door systems',
          description: 'Elegant and functional solutions for entrance and interior doors'
        },
        facades: {
          title: 'Facade systems',
          description: 'Modern facade solutions for commercial and residential buildings'
        },
        industrial: {
          title: 'Industrial profiles',
          description: 'Specialized profiles for industrial and technological applications'
        }
      },
      stats: {
        title: 'Why choose Nissal',
        projects: 'completed projects',
        experience: 'years of experience',
        clients: 'satisfied clients',
        support: 'technical support'
      },
      recentProjects: {
        title: 'Latest projects',
        viewAll: 'View all projects'
      },
      testimonials: {
        title: 'What our clients say'
      },
      footer: {
        contact: {
          title: 'Contact information',
          address: 'Industrial zone bb, 11000 Belgrade',
          phone: '+381 11 123 4567',
          email: 'info@nissal.rs',
          workingHours: 'Mon-Fri: 08:00-16:00'
        },
        quickLinks: {
          title: 'Quick links',
          products: 'Products',
          services: 'Services',
          projects: 'Projects',
          contact: 'Contact'
        },
        social: {
          title: 'Follow us',
          facebook: 'Facebook',
          instagram: 'Instagram',
          linkedin: 'LinkedIn'
        },
        certificates: {
          title: 'Certificates and partners'
        }
      }
    }
  };

  const currentContent = content[language];

  // Fetch latest projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setProjectsLoading(true);
        setProjectsError(null);
        const response = await projectService.getProjects({
          limit: 3,
          sortBy: 'completionDate',
          sortOrder: 'desc'
        });
        
        if (response.success && response.data.projects) {
          setProjects(response.data.projects);
        } else {
          setProjectsError('Failed to fetch projects');
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjectsError(error.message || 'Failed to fetch projects');
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fetch featured products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);
        const response = await productService.getProducts({ limit: 4 });
        
        if (response.success && response.data.products) {
          setProducts(response.data.products);
        } else {
          setProductsError('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProductsError(error.message || 'Failed to fetch products');
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const testimonials = [
    {
      id: 1,
      name: 'Marko Petrović',
      company: 'ABC Gradnja d.o.o.',
      text: 'Nissal je naš pouzdan partner već 5 godina. Kvalitet njihovih proizvoda je izuzetan, a servis uvek na visokom nivou.',
      image: '/images/placeholder/billgates.jpg'
    },
    {
      id: 2,
      name: 'Ana Jovanović',
      company: 'Projektni biro Delta',
      text: 'Profesionalnost tima Nissal-a se ogleda u svakom projektu. Uvek isporuče u roku i prema specifikaciji.',
      image: '/images/placeholder/sydneysweeny.jpg'
    },
    {
      id: 3,
      name: 'Ilija Musković',
      company: 'NK Invest',
      text: 'Inovativna rešenja koja predlažu uvek prevazilaze naša očekivanja. Preporučujem svima.',
      image: '/images/placeholder/elonmusk.jpg'
    }
  ];

  return (
    <div className="home-page">
      {/* Header Section */}
      <Header 
        language={language} 
        onLanguageToggle={toggleLanguage} 
        content={currentContent} 
      />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{currentContent.hero.title}</h1>
              <p className="hero-subtitle">{currentContent.hero.subtitle}</p>
              <div className="hero-actions">
                <button className="btn btn-primary">{currentContent.hero.ctaPrimary}</button>
                <button className="btn btn-secondary">{currentContent.hero.ctaSecondary}</button>
              </div>
            </div>
            <div className="hero-image">
              <img 
                src="/images/hero-image.png" 
                alt="Nissal Aluminum Systems"
                onError={(e) => {
                  console.error('Image failed to load:', e.target.src);
                  e.target.style.border = '2px solid red';
                  e.target.style.padding = '20px';
                  e.target.alt = 'Image failed to load: ' + e.target.src;
                }}
                onLoad={() => console.log('Image loaded successfully')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Values Section */}
      <section className="values">
        <div className="container">
          <h2 className="section-title">{currentContent.values.title}</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <img src="/images/icons/quality.png" alt="Quality" />
              </div>
              <h3>{currentContent.values.quality.title}</h3>
              <p>{currentContent.values.quality.description}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <img src="/images/icons/idea.png" alt="Innovation" />
              </div>
              <h3>{currentContent.values.innovation.title}</h3>
              <p>{currentContent.values.innovation.description}</p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <img src="/images/icons/customer-support.png" alt="Support" />
              </div>
              <h3>{currentContent.values.experience.title}</h3>
              <p>{currentContent.values.experience.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Overview Section */}
      <section className="products-overview">
        <div className="container">
          <h2 className="section-title">{currentContent.products.title}</h2>
          
          {productsLoading ? (
            <div className="loading-skeleton">
              <div className="product-slideshow">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="product-slide skeleton">
                    <div className="product-image skeleton-image"></div>
                    <div className="skeleton-title"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : productsError ? (
            <div className="error-state">
              <p>{productsError}</p>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                {language === 'SR' ? 'Pokušaj ponovo' : 'Try Again'}
              </button>
            </div>
          ) : (
            <div className="product-slideshow">
              {products.map(product => (
                <div key={product._id} className="product-slide">
                  <div className="product-image">
                    <img 
                      src={product.gallery?.[0]?.url || '/images/placeholder/product-placeholder.jpg'} 
                      alt={product.title}
                      loading="lazy"
                    />
                    <div className="product-overlay">
                      <div className="product-details">
                        <h3>{product.title}</h3>
                        <p>{product.description?.substring(0, 100)}...</p>
                        <button className="btn btn-primary">
                          {language === 'SR' ? 'Vidi više' : 'View More'}
                        </button>
                      </div>
                    </div>
                  </div>
                  <h3 className="product-title">{product.title}</h3>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats">
        <div className="container">
          <h2 className="section-title">{currentContent.stats.title}</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">{currentContent.stats.projects}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">{currentContent.stats.experience}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">{currentContent.stats.clients}</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">{currentContent.stats.support}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Projects Section */}
      <section className="recent-projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.recentProjects.title}</h2>
            <button className="btn btn-outline">{currentContent.recentProjects.viewAll}</button>
          </div>
          
          {projectsLoading ? (
            <div className="loading-skeleton">
              <div className="projects-slider">
                {[1, 2, 3].map(i => (
                  <div key={i} className="project-slide skeleton">
                    <div className="project-image skeleton-image">
                      <div className="skeleton-overlay"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : projectsError ? (
            <div className="error-state">
              <p>{projectsError}</p>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                {language === 'SR' ? 'Pokušaj ponovo' : 'Try Again'}
              </button>
            </div>
          ) : (
            <div className="projects-slider">
              {projects.map(project => (
                <div key={project._id} className="project-slide">
                  <div className="project-image">
                    <img 
                      src={project.gallery?.[0]?.url || '/images/placeholder/project-placeholder.jpg'} 
                      alt={project.title}
                      loading="lazy"
                    />
                    <div className="project-overlay">
                      <h3>{project.title}</h3>
                      <p>{project.location}</p>
                      <span className="project-year">
                        {new Date(project.completionDate).getFullYear()}
                      </span>
                      <span className="project-type">{project.category}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">{currentContent.testimonials.title}</h2>
          <div className="testimonials-slider">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-slide">
                <div className="testimonial-content">
                  <p className="testimonial-text">"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <img src={testimonial.image} alt={testimonial.name} />
                    <div className="author-info">
                      <h4>{testimonial.name}</h4>
                      <span>{testimonial.company}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default HomePage;