import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ProductsPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { productService } from '../services/productService';
import useLanguage from '../hooks/useLanguage';
import { Loader, XCircle, Package } from 'lucide-react';

const ProductsPage = () => {
  const { language, changeLanguage } = useLanguage();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const productsSectionRef = useRef(null);



  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await productService.getProducts();
        let products = response.data.products || [];
        
        // Custom sort order: ALT 7500, ALS 57, ALS 57 vrata, staklene ograde, then others
        const customOrder = ['ALT-7500', 'ALS-57', 'ALU-004', 'ALU-007'];
        
        products.sort((a, b) => {
          const aIndex = customOrder.indexOf(a.catalog?.catalogNumber);
          const bIndex = customOrder.indexOf(b.catalog?.catalogNumber);
          
          // If both products are in custom order, sort by their positions
          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }
          
          // If only one product is in custom order, prioritize it
          if (aIndex !== -1) return -1;
          if (bIndex !== -1) return 1;
          
          // If neither is in custom order, maintain original order
          return 0;
        });
        
        setProducts(products);
        setPagination(response.data.pagination || {});
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const handlePageChange = (newPage) => {
    // Handle pagination if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Removed formatPrice function - price display is no longer needed

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
        title: 'Naši aluminijumski sistemi',
        subtitle: 'Kvalitetno urađeni sa pažnjom na detalje i besprekoran kvalitet'
      },
      filters: {
        title: 'Filteri',
        category: 'Kategorija',
        allCategories: 'Sve kategorije',
        colors: 'Boje',
        sizes: 'Veličine',
        // Removed price range filters
        inStock: 'Samo na stanju',
        search: 'Pretraži proizvode...',
        clearFilters: 'Obriši filtere',
        sortBy: 'Sortiranje',
        sortOptions: {
          'createdAt-desc': 'Najnoviji',
          'createdAt-asc': 'Najstariji',
          // Removed price sorting options
          'title-asc': 'Naziv: A-Z',
          'title-desc': 'Naziv: Z-A'
        }
      },
      products: {
        loading: 'Učitavaju se aluminijumski sistemi...',
        error: 'Greška pri učitavanju aluminijumskih sistema',
        noProducts: 'Nisu pronađeni aluminijumski sistemi',
        tryDifferentFilters: 'Pokušajte sa drugim filterima',
        viewDetails: 'Pogledaj specifikacije',
        requestQuote: 'Zatraži ponudu',
        inStock: 'Dostupno',
        outOfStock: 'Trenutno nedostupno',
        pieces: 'm',
        catalogNumber: 'Sistem br.'
      },
      pagination: {
        showing: 'Prikaz',
        of: 'od',
        products: 'sistema',
        page: 'Strana',
        previous: 'Prethodna',
        next: 'Sledeća'
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
        title: 'Unsere Aluminiumsysteme',
        subtitle: 'Qualitätsarbeit mit Liebe zum Detail und tadellose Qualität'
      },
      filters: {
        title: 'Filter',
        category: 'Kategorie',
        allCategories: 'Alle Kategorien',
        colors: 'Farben',
        sizes: 'Größen',
        // Removed price range filters
        inStock: 'Auf Lager',
        search: 'Suchen...',
        clearFilters: 'Filter löschen',
        sortBy: 'Sortieren nach',
        sortOptions: {
          'createdAt-desc': 'Neueste',
          'createdAt-asc': 'Älteste',
          // Removed price sorting options
          'title-asc': 'Name: A-Z',
          'title-desc': 'Name: Z-A'
        }
      },
      products: {
        loading: 'Aluminiumsysteme werden geladen...',
        error: 'Fehler beim Laden der Aluminiumsysteme',
        noProducts: 'Keine Aluminiumsysteme gefunden',
        tryDifferentFilters: 'Versuchen Sie andere Filter',
        viewDetails: 'Spezifikationen ansehen',
        requestQuote: 'Angebot anfordern',
        inStock: 'Verfügbar',
        outOfStock: 'Derzeit nicht verfügbar',
        pieces: 'm',
        catalogNumber: 'System Nr.'
      },
      pagination: {
        showing: 'Zeige',
        of: 'von',
        products: 'Systeme',
        page: 'Seite',
        previous: 'Vorherige',
        next: 'Nächste'
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
        title: 'Our Aluminum Systems',
        subtitle: 'Quality crafted with attention to detail and impeccable quality'
      },
      filters: {
        title: 'Filters',
        category: 'Category',
        allCategories: 'All Categories',
        colors: 'Colors',
        sizes: 'Sizes',
        // Removed price range filters
        inStock: 'In Stock Only',
        search: 'Search products...',
        clearFilters: 'Clear Filters',
        sortBy: 'Sort By',
        sortOptions: {
          'createdAt-desc': 'Newest',
          'createdAt-asc': 'Oldest',
          // Removed price sorting options
          'title-asc': 'Name: A-Z',
          'title-desc': 'Name: Z-A'
        }
      },
      products: {
        loading: 'Loading aluminum systems...',
        error: 'Error loading aluminum systems',
        noProducts: 'No aluminum systems found',
        tryDifferentFilters: 'Try different filters',
        viewDetails: 'View Specifications',
        requestQuote: 'Request Quote',
        inStock: 'Available',
        outOfStock: 'Currently Unavailable',
        pieces: 'm',
        catalogNumber: 'System No.'
      },
      pagination: {
        showing: 'Showing',
        of: 'of',
        products: 'systems',
        page: 'Page',
        previous: 'Previous',
        next: 'Next'
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
          title: 'Certificates and Partners'
        }
      }
    }
  };

  const currentContent = content[language];

  return (
    <div className="products-page">
      {/* Header Section */}
      <Header 
        language={language} 
        onLanguageChange={changeLanguage} 
        content={currentContent} 
      />

      {/* Hero Section */}
      <section className="products-hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{currentContent.hero.title}</h1>
            <p className="hero-subtitle">{currentContent.hero.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section ref={productsSectionRef} className="products-main">
        <div className="container">

            {/* Products Content */}
            <main 
              className="products-content"
            >
              
              {/* Toolbar */}
              <div className="products-toolbar">
                <div className="results-info">
                  {pagination.total && (
                    <span>
                      {currentContent.pagination.showing} {((pagination.page - 1) * pagination.limit) + 1}-
                      {Math.min(pagination.page * pagination.limit, pagination.total)} {currentContent.pagination.of} {pagination.total} {currentContent.pagination.products}
                    </span>
                  )}
                </div>
              </div>

              {/* Products Grid */}
              <div className="products-container">
                {loading ? (
                  <div className="loading-state">
                    <div className="loading-spinner">
                      <Loader size={48} className="spinner-animate" />
                    </div>
                    <p>{currentContent.products.loading}</p>
                  </div>
                ) : error ? (
                  <div className="error-state">
                    <div className="error-icon">
                      <XCircle size={48} />
                    </div>
                    <h3>{currentContent.products.error}</h3>
                    <p>{error}</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <Package size={48} />
                    </div>
                    <h3>{currentContent.products.noProducts}</h3>
                    <p>{currentContent.products.tryDifferentFilters}</p>
                  </div>
                ) : (
                  <div className="products-grid">
                    {products.map(product => (
                      <div key={product._id} className="product-card">
                        <div className="product-image">
                          <img 
                            src={product.gallery?.[0]?.url || '/images/placeholder/product-placeholder.jpg'} 
                            alt={product.gallery?.[0]?.alt || product.title}
                            loading="lazy"
                          />
                          {!product.availability.inStock && (
                            <div className="stock-overlay">
                              <span>{currentContent.products.outOfStock}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="product-info">
                          <div className="product-category">
                            {product.catalog.category}
                          </div>
                          <h3 className="product-title">{product.title}</h3>
                          <p className="product-description">
                            {product.description.length > 120 
                              ? `${product.description.substring(0, 120)}...` 
                              : product.description
                            }
                          </p>
                          
                          <div className="product-details">
                            <div className="catalog-number">
                              {currentContent.products.catalogNumber}: {product.catalog.catalogNumber}
                            </div>
                            
                            {product.colors.length > 0 && (
                              <div className="product-colors">
                                {product.colors.slice(0, 4).map(color => (
                                  <span 
                                    key={color.name}
                                    className="color-dot"
                                    style={{ backgroundColor: color.hexCode }}
                                    title={color.name}
                                  ></span>
                                ))}
                                {product.colors.length > 4 && (
                                  <span className="more-colors">+{product.colors.length - 4}</span>
                                )}
                              </div>
                            )}
                          </div>

                          <div className="product-footer">
                            <div className="product-stock">
                              {product.availability.inStock ? (
                                <span className="in-stock">
                                  {currentContent.products.inStock}
                                </span>
                              ) : (
                                <span className="out-of-stock">
                                  {currentContent.products.outOfStock}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="product-actions">
                            <Link 
                              to={`/products/${product._id}`} 
                              className="btn btn-outline btn-sm"
                            >
                              {currentContent.products.viewDetails}
                            </Link>
                            <button className="btn btn-primary btn-sm">
                              {currentContent.products.requestQuote}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="pagination">
                  <div className="pagination-info">
                    {currentContent.pagination.page} {pagination.page} {currentContent.pagination.of} {pagination.pages}
                  </div>
                  
                  <div className="pagination-controls">
                    <button
                      className="pagination-btn"
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page <= 1}
                    >
                      {currentContent.pagination.previous}
                    </button>
                    
                    {Array.from({ length: pagination.pages }, (_, i) => i + 1)
                      .filter(page => 
                        page === 1 || 
                        page === pagination.pages || 
                        (page >= pagination.page - 2 && page <= pagination.page + 2)
                      )
                      .map((page, index, array) => (
                        <React.Fragment key={page}>
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span className="pagination-ellipsis">...</span>
                          )}
                          <button
                            className={`pagination-btn ${page === pagination.page ? 'active' : ''}`}
                            onClick={() => handlePageChange(page)}
                          >
                            {page}
                          </button>
                        </React.Fragment>
                      ))
                    }
                    
                    <button
                      className="pagination-btn"
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page >= pagination.pages}
                    >
                      {currentContent.pagination.next}
                    </button>
                  </div>
                </div>
              )}
            </main>
        </div>
      </section>

      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default ProductsPage;