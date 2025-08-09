import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { projectService } from '../services/projectService';
import { productService } from '../services/productService';
import { homepageSettingsService } from '../services/homepageSettingsService';
import useLanguage from '../hooks/useLanguage';

const HomePage = () => {
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const [projects, setProjects] = useState([]);
  const [products, setProducts] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState(null);
  const [productsError, setProductsError] = useState(null);

  // Mouse tracking refs
  const heroMainIconRef = useRef(null);
  const heroSideIcon1Ref = useRef(null);
  const heroSideIcon2Ref = useRef(null);
  const heroSideIcon3Ref = useRef(null);
  const heroSideIcon4Ref = useRef(null);

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
        title: 'Projekti',
        viewAll: 'Pogledaj sve projekte'
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
          title: 'Sertifikati i partneri',
          iso: 'ISO 9001:2015',
          ce: 'CE označavanje'
        },
        company: {
          description: 'Vrhunski aluminijumski sistemi za modernu gradnju. Kvalitet, inovacija i pouzdanost od 2008. godine.'
        },
        copyright: '© 2024 Nissal d.o.o. Sva prava zadržana.',
        legal: {
          privacy: 'Politika privatnosti',
          terms: 'Uslovi korišćenja',
          cookies: 'Cookies'
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
          title: 'Certificates and partners',
          iso: 'ISO 9001:2015',
          ce: 'CE Marking'
        },
        company: {
          description: 'Premium aluminum systems for modern construction. Quality, innovation and reliability since 2008.'
        },
        copyright: '© 2024 Nissal d.o.o. All rights reserved.',
        legal: {
          privacy: 'Privacy Policy',
          terms: 'Terms of Use',
          cookies: 'Cookies'
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
        title: 'Nissal – Weltweit anerkannte Aluminiumsysteme',
        subtitle: 'Wir schaffen innovative Lösungen für modernes Bauen, die den Bedürfnissen von Planern und Investoren gerecht werden',
        ctaPrimary: 'Produkte ansehen',
        ctaSecondary: 'Angebot anfordern'
      },
      values: {
        title: 'Unsere Kernwerte',
        quality: {
          title: 'Qualität und Zuverlässigkeit',
          description: 'Wir fertigen nach höchsten Qualitätsstandards mit ISO- und CE-Zertifikaten'
        },
        innovation: {
          title: 'Innovation und Technologie',
          description: 'Wir verwenden neueste Produktionstechnologien und bieten maßgeschneiderte Lösungen'
        },
        experience: {
          title: 'Erfahrung und Support',
          description: 'Über 15 Jahre Erfahrung mit Expertenteam für Beratung und Unterstützung'
        }
      },
      products: {
        title: 'Unsere Aluminiumprofile',
        windows: {
          title: 'Fenstersysteme',
          description: 'Hochwertige Aluminiumfenster für Wohn- und Geschäftsgebäude'
        },
        doors: {
          title: 'Türsysteme',
          description: 'Elegante und funktionale Lösungen für Eingangs- und Innentüren'
        },
        facades: {
          title: 'Fassadensysteme',
          description: 'Moderne Fassadenlösungen für Gewerbe- und Wohngebäude'
        },
        industrial: {
          title: 'Industrieprofile',
          description: 'Spezialisierte Profile für industrielle und technologische Anwendungen'
        }
      },
      stats: {
        title: 'Warum Nissal wählen',
        projects: 'abgeschlossene Projekte',
        experience: 'Jahre Erfahrung',
        clients: 'zufriedene Kunden',
        support: 'technischer Support'
      },
      recentProjects: {
        title: 'Neueste Projekte',
        viewAll: 'Alle Projekte ansehen'
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
          title: 'Zertifikate und Partner',
          iso: 'ISO 9001:2015',
          ce: 'CE-Kennzeichnung'
        },
        company: {
          description: 'Hochwertige Aluminiumsysteme für modernes Bauen. Qualität, Innovation und Zuverlässigkeit seit 2008.'
        },
        copyright: '© 2024 Nissal d.o.o. Alle Rechte vorbehalten.',
        legal: {
          privacy: 'Datenschutzrichtlinie',
          terms: 'Nutzungsbedingungen',
          cookies: 'Cookies'
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
    const fetchFeaturedProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);
        const response = await homepageSettingsService.getFeaturedProducts();
        
        if (response.success && response.data) {
          setProducts(response.data);
        } else {
          // Fallback to regular products if no featured products are set
          const fallbackResponse = await productService.getProducts({ limit: 4 });
          if (fallbackResponse.success && fallbackResponse.data.products) {
            setProducts(fallbackResponse.data.products);
          } else {
            setProductsError('Failed to fetch products');
          }
        }
      } catch (error) {
        console.error('Error fetching featured products:', error);
        // Fallback to regular products on error
        try {
          const fallbackResponse = await productService.getProducts({ limit: 4 });
          if (fallbackResponse.success && fallbackResponse.data.products) {
            setProducts(fallbackResponse.data.products);
          } else {
            setProductsError(error.message || 'Failed to fetch products');
          }
        } catch (fallbackError) {
          setProductsError(fallbackError.message || 'Failed to fetch products');
        }
      } finally {
        setProductsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  // Mouse tracking effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Main icon - same behavior as other pages
      if (heroMainIconRef.current) {
        const rect = heroMainIconRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.01;
        const deltaY = (e.clientY - centerY) * 0.01;
        
        heroMainIconRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }

      // Side icons - more movement and slight overlap
      const sideRefs = [heroSideIcon1Ref, heroSideIcon2Ref, heroSideIcon3Ref, heroSideIcon4Ref];
      const multipliers = [0.015, 0.018, 0.02, 0.017]; // Different speeds for variation
      
      sideRefs.forEach((ref, index) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const deltaX = (e.clientX - centerX) * multipliers[index];
          const deltaY = (e.clientY - centerY) * multipliers[index];
          
          ref.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="home-page">
      {/* Header Section */}
      <Header 
        language={language} 
        onLanguageChange={changeLanguage} 
        content={currentContent} 
      />

      {/* Hero Section */}
      <section className="home-hero">
        <div className="hero-background">
          <img src="/images/header/pocetna-background.jpg" alt="" className="background-image" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">{currentContent.hero.title}</h1>
              <p className="hero-subtitle">{currentContent.hero.subtitle}</p>
              <div className="hero-actions">
                <button 
                  className="btn btn-primary"
                  onClick={() => navigate('/products')}
                >
                  {currentContent.hero.ctaPrimary}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => navigate('/contact')}
                >
                  {currentContent.hero.ctaSecondary}
                </button>
              </div>
            </div>
            <div className="hero-icons">
              <div className="hero-icon main-icon" ref={heroMainIconRef}>
                <img src="/images/header/pocetna-icon-main.png" alt="Main Icon" className="icon-image" />
              </div>
              <div className="hero-icon side-icon side-icon-1" ref={heroSideIcon1Ref}>
                <img src="/images/header/pocetna-icon-side1.png" alt="Side Icon 1" className="icon-image" />
              </div>
              <div className="hero-icon side-icon side-icon-2" ref={heroSideIcon2Ref}>
                <img src="/images/header/pocetna-icon-side3.png" alt="Side Icon 2" className="icon-image" />
              </div>
              <div className="hero-icon side-icon side-icon-3" ref={heroSideIcon3Ref}>
                <img src="/images/header/pocetna-icon-side2.png" alt="Side Icon 3" className="icon-image" />
              </div>
              <div className="hero-icon side-icon side-icon-4" ref={heroSideIcon4Ref}>
                <img src="/images/header/pocetna-icon-side4.png" alt="Side Icon 4" className="icon-image" />
              </div>
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
                <div 
                  key={product._id} 
                  className="product-slide"
                  onClick={() => navigate(`/products/${product._id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="product-image">
                    <img 
                      src={product.gallery?.[0]?.url || '/images/placeholder/product-placeholder.jpg'} 
                      alt={product.title}
                      loading="lazy"
                    />
                    <div className="product-overlay">
                      <div className="product-details">
                        <h3>{product.title}</h3>
                        <div className="product-button-container">
                          <button 
                            className="btn btn-primary"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/products/${product._id}`);
                            }}
                          >
                            {language === 'SR' ? 'Vidi jos' : 'View More'}
                          </button>
                        </div>
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

      

      {/* Latest Projects Section */}
      <section className="recent-projects">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{currentContent.recentProjects.title}</h2>
            <button 
              className="btn btn-outline"
              onClick={() => navigate('/projekti')}
            >
              {currentContent.recentProjects.viewAll}
            </button>
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
                <div 
                  key={project._id} 
                  className="project-slide"
                  onClick={() => navigate(`/projekti/${project._id}`)}
                  style={{ cursor: 'pointer' }}
                >
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


      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default HomePage;