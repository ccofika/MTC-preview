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
  const heroIconRef = useRef(null);

  // Section refs for scroll snap functionality
  const homePageRef = useRef(null);
  const heroRef = useRef(null);
  const valuesRef = useRef(null);
  const productsRef = useRef(null);
  const projectsRef = useRef(null);

  // Scroll navigation state
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showScrollDots, setShowScrollDots] = useState(false);
  const [elementsVisible, setElementsVisible] = useState({
    hero: false,
    values: false,
    products: false,
    projects: false
  });
  
  // Ref to track current section index to avoid stale closure
  const currentSectionIndexRef = useRef(0);
  
  // Trackpad scroll handling
  const scrollAccumulatorRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

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
      if (heroIconRef.current) {
        const rect = heroIconRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) * 0.01;
        const deltaY = (e.clientY - centerY) * 0.01;
        
        heroIconRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Enhanced scroll snap functionality with animations for desktop
  useEffect(() => {
    // Only apply scroll snap behavior on desktop
    const isDesktop = window.innerWidth > 768;
    setShowScrollDots(isDesktop);
    
    if (!isDesktop) return;

    // Fix navbar to not overlap scrollbar - clean approach
    const adjustForScrollbar = () => {
      const homePageContainer = homePageRef.current;
      const header = document.querySelector('header, .header, .site-header');
      
      if (!header) return;
      
      // Don't apply scrollbar adjustments on mobile/tablet (let CSS handle responsiveness)
      if (window.innerWidth <= 1305) {
        header.style.width = '';
        header.style.right = '';
        header.style.left = '';
        header.style.borderRight = '';
        header.style.boxShadow = '';
        return;
      }
      
      // Only apply on large desktop screens when not over hero
      const isOverHero = header.classList.contains('over-hero');
      if (isOverHero) {
        // When over hero, let CSS handle styling completely
        header.style.width = '';
        header.style.right = '';
        header.style.left = '';
        header.style.borderRight = '';
        header.style.boxShadow = '';
        return;
      }
      
      let scrollbarWidth = 0;
      
      if (homePageContainer) {
        scrollbarWidth = homePageContainer.offsetWidth - homePageContainer.clientWidth;
      }
      
      // Use exact scrollbar width for perfect fit
      if (scrollbarWidth === 0) {
        scrollbarWidth = 17; // Standard scrollbar width
      }
      
      header.style.width = `calc(100% - ${scrollbarWidth}px)`;
      header.style.right = 'auto';
      header.style.left = '0px';
      header.style.borderRight = 'none';
      header.style.boxShadow = 'none';
    };

    // Initial adjustment
    adjustForScrollbar();
    
    // Re-adjust when scroll state changes (for over-hero detection)
    const handleScrollbarAdjustment = () => {
      setTimeout(adjustForScrollbar, 100); // Small delay to let header class changes apply
    };
    
    window.addEventListener('scroll', handleScrollbarAdjustment);

    const sections = [
      { ref: heroRef, name: 'hero' },
      { ref: valuesRef, name: 'values' },
      { ref: productsRef, name: 'products' },
      { ref: projectsRef, name: 'projects' }
    ];

    // Function to trigger scroll animations
    const triggerSectionAnimations = (sectionName) => {
      setElementsVisible(prev => ({
        ...prev,
        [sectionName]: true
      }));
    };

    const scrollToSection = (index) => {
      if (index < 0 || index >= sections.length || !sections[index].ref.current || !homePageRef.current) return;
      
      setIsScrolling(true);
      currentSectionIndexRef.current = index;
      setActiveSection(index);
      
      const container = homePageRef.current;
      const targetElement = sections[index].ref.current;
      const targetTop = targetElement.offsetTop;
      
      container.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      // Trigger animations for the target section immediately
      triggerSectionAnimations(sections[index].name);

      setTimeout(() => {
        setIsScrolling(false);
      }, 800);
    };

    // Handle navigation dots click
    window.scrollToSection = scrollToSection;

    const handleWheel = (e) => {
      if (isScrolling) {
        e.preventDefault();
        return;
      }

      const container = homePageRef.current;
      if (!container) return;

      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
      
      const now = Date.now();
      const timeDelta = now - lastScrollTimeRef.current;
      
      // Detect if this is likely a trackpad gesture (smaller deltaY values, rapid succession)
      const isTrackpadLikely = Math.abs(e.deltaY) < 50 && timeDelta < 100;
      
      // For trackpad gestures, use accumulator to require sustained scrolling
      if (isTrackpadLikely) {
        scrollAccumulatorRef.current += e.deltaY;
        lastScrollTimeRef.current = now;
        
        // Reset accumulator if direction changes or too much time has passed
        if ((scrollAccumulatorRef.current > 0 && e.deltaY < 0) || 
            (scrollAccumulatorRef.current < 0 && e.deltaY > 0) ||
            timeDelta > 150) {
          scrollAccumulatorRef.current = e.deltaY;
        }
        
        // Require larger accumulated scroll for section change
        const threshold = 150;
        
        if (Math.abs(scrollAccumulatorRef.current) < threshold) {
          // Allow small natural scrolling within sections for trackpad
          return;
        }
        
        // Reset accumulator after triggering section change
        const scrollDirection = scrollAccumulatorRef.current > 0 ? 1 : -1;
        scrollAccumulatorRef.current = 0;
        
        if (scrollDirection > 0) {
          // Scrolling down
          if (currentSectionIndexRef.current < sections.length - 1) {
            e.preventDefault();
            scrollToSection(currentSectionIndexRef.current + 1);
          } else if (currentSectionIndexRef.current === sections.length - 1 && !isAtBottom) {
            // Allow free scrolling to footer when at last section
          } else if (isAtBottom) {
            e.preventDefault();
          }
        } else {
          // Scrolling up
          if (isAtBottom || scrollTop > sections[sections.length - 1].ref.current.offsetTop + 100) {
            e.preventDefault();
            scrollToSection(sections.length - 1);
          } else if (currentSectionIndexRef.current > 0) {
            e.preventDefault();
            scrollToSection(currentSectionIndexRef.current - 1);
          }
        }
      } else {
        // Traditional mouse wheel - immediate response
        lastScrollTimeRef.current = now;
        scrollAccumulatorRef.current = 0; // Reset accumulator
        
        if (e.deltaY > 0) {
          // Scrolling down
          if (currentSectionIndexRef.current < sections.length - 1) {
            e.preventDefault();
            scrollToSection(currentSectionIndexRef.current + 1);
          } else if (currentSectionIndexRef.current === sections.length - 1 && !isAtBottom) {
            // Allow free scrolling to footer when at last section
          } else if (isAtBottom) {
            e.preventDefault();
          }
        } else {
          // Scrolling up
          if (isAtBottom || scrollTop > sections[sections.length - 1].ref.current.offsetTop + 100) {
            e.preventDefault();
            scrollToSection(sections.length - 1);
          } else if (currentSectionIndexRef.current > 0) {
            e.preventDefault();
            scrollToSection(currentSectionIndexRef.current - 1);
          }
        }
      }
    };

    // Initialize first section as visible immediately
    triggerSectionAnimations('hero');
    setActiveSection(0);
    currentSectionIndexRef.current = 0;

    document.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      document.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScrollbarAdjustment);
      delete window.scrollToSection;
      
      const header = document.querySelector('header, .header, .site-header');
      if (header) {
        header.style.width = '';
        header.style.right = '';
        header.style.left = '';
        header.style.borderRight = '';
        header.style.boxShadow = '';
      }
    };
  }, []);

  return (
    <div className="home-page" ref={homePageRef}>
      {/* Header Section */}
      <Header 
        language={language} 
        onLanguageChange={changeLanguage} 
        content={currentContent} 
      />

      {/* Scroll Navigation Dots - Desktop Only */}
      {showScrollDots && (
        <div className="scroll-navigation">
          <div className="scroll-dots">
            {['hero', 'values', 'products', 'projects'].map((section, index) => (
              <button
                key={section}
                className={`scroll-dot ${activeSection === index ? 'active' : ''}`}
                onClick={() => window.scrollToSection && window.scrollToSection(index)}
                aria-label={`Go to ${section} section`}
                title={section.charAt(0).toUpperCase() + section.slice(1)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className={`home-hero ${elementsVisible.hero ? 'animate-in' : ''}`} ref={heroRef}>
        <div className="hero-background">
          <img src="/images/header/pocetna-background.jpg" alt="" className="background-image" />
        </div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className={`hero-title ${elementsVisible.hero ? 'slide-in-left' : ''}`}>{currentContent.hero.title}</h1>
              <p className={`hero-subtitle ${elementsVisible.hero ? 'slide-in-left delay-200' : ''}`}>{currentContent.hero.subtitle}</p>
              <div className={`hero-actions ${elementsVisible.hero ? 'slide-in-left delay-400' : ''}`}>
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
            <div className="hero-icon" ref={heroIconRef}>
              <img src="/images/header/MAIN-ICON-HOMEPAGE.png" alt="Homepage Icon" className="icon-image" />
            </div>
          </div>
        </div>
      </section>

      {/* Key Values Section */}
      <section className={`values ${elementsVisible.values ? 'animate-in' : ''}`} ref={valuesRef}>
        <div className="container">
          <h2 className={`section-title ${elementsVisible.values ? 'slide-in-up' : ''}`}>{currentContent.values.title}</h2>
          <div className="values-grid">
            <div className={`value-card ${elementsVisible.values ? 'slide-in-up delay-200' : ''}`}>
              <div className="value-icon">
                <img src="/images/icons/quality.png" alt="Quality" />
              </div>
              <h3>{currentContent.values.quality.title}</h3>
              <p>{currentContent.values.quality.description}</p>
            </div>
            <div className={`value-card ${elementsVisible.values ? 'slide-in-up delay-400' : ''}`}>
              <div className="value-icon">
                <img src="/images/icons/idea.png" alt="Innovation" />
              </div>
              <h3>{currentContent.values.innovation.title}</h3>
              <p>{currentContent.values.innovation.description}</p>
            </div>
            <div className={`value-card ${elementsVisible.values ? 'slide-in-up delay-600' : ''}`}>
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
      <section className={`products-overview ${elementsVisible.products ? 'animate-in' : ''}`} ref={productsRef}>
        <div className="container">
          <h2 className={`section-title ${elementsVisible.products ? 'slide-in-up' : ''}`}>{currentContent.products.title}</h2>
          
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
            <div className={`product-slideshow ${elementsVisible.products ? 'fade-in-scale delay-400' : ''}`}>
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
      <section className={`recent-projects ${elementsVisible.projects ? 'animate-in' : ''}`} ref={projectsRef}>
        <div className="container">
          <div className="section-header">
            <h2 className={`section-title ${elementsVisible.projects ? 'slide-in-up' : ''}`}>{currentContent.recentProjects.title}</h2>
            <button 
              className={`btn btn-outline ${elementsVisible.projects ? 'slide-in-right delay-200' : ''}`}
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
            <div className={`projects-slider ${elementsVisible.projects ? 'fade-in-scale delay-400' : ''}`}>
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