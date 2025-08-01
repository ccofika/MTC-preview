import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ProductsPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { productService } from '../services/productService';

const ProductsPage = () => {
  const [language, setLanguage] = useState('SR');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [pagination, setPagination] = useState({});

  // Filter states
  const [filters, setFilters] = useState({
    category: '',
    colors: [],
    sizes: [],
    minPrice: '',
    maxPrice: '',
    inStock: false,
    search: '',
    page: 1,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const toggleLanguage = () => {
    setLanguage(language === 'SR' ? 'EN' : 'SR');
  };

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesData, colorsData, sizesData] = await Promise.all([
          productService.getCategories(),
          productService.getAvailableColors(),
          productService.getAvailableSizes()
        ]);

        setCategories(categoriesData.data || []);
        setColors(colorsData.data || []);
        setSizes(sizesData.data || []);
      } catch (err) {
        console.error('Error fetching initial data:', err);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await productService.getProducts(filters);
        setProducts(response.data.products || []);
        setPagination(response.data.pagination || {});
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters]);

  // Handle filter changes
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handleMultiSelectFilter = (key, value) => {
    setFilters(prev => {
      const currentValues = prev[key] || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
      
      return {
        ...prev,
        [key]: newValues,
        page: 1
      };
    });
  };

  const handlePageChange = (newPage) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      colors: [],
      sizes: [],
      minPrice: '',
      maxPrice: '',
      inStock: false,
      search: '',
      page: 1,
      sortBy: 'createdAt',
      sortOrder: 'desc'
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: price.currency || 'RSD',
      minimumFractionDigits: 0
    }).format(price.amount);
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
        title: 'Naši aluminijumski sistemi',
        subtitle: 'Vrhunski aluminijumski profili i sistemi za moderne arhitektonske rešenja'
      },
      filters: {
        title: 'Filteri',
        category: 'Kategorija',
        allCategories: 'Sve kategorije',
        colors: 'Boje',
        sizes: 'Veličine',
        priceRange: 'Opseg cena',
        minPrice: 'Min. cena',
        maxPrice: 'Maks. cena',
        inStock: 'Samo na stanju',
        search: 'Pretraži proizvode...',
        clearFilters: 'Obriši filtere',
        sortBy: 'Sortiranje',
        sortOptions: {
          'createdAt-desc': 'Najnoviji',
          'createdAt-asc': 'Najstariji',
          'price.amount-asc': 'Cena: rastućе',
          'price.amount-desc': 'Cena: opadajuće',
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
        subtitle: 'Premium aluminum profiles and systems for modern architectural solutions'
      },
      filters: {
        title: 'Filters',
        category: 'Category',
        allCategories: 'All Categories',
        colors: 'Colors',
        sizes: 'Sizes',
        priceRange: 'Price Range',
        minPrice: 'Min. Price',
        maxPrice: 'Max. Price',
        inStock: 'In Stock Only',
        search: 'Search products...',
        clearFilters: 'Clear Filters',
        sortBy: 'Sort By',
        sortOptions: {
          'createdAt-desc': 'Newest',
          'createdAt-asc': 'Oldest',
          'price.amount-asc': 'Price: Low to High',
          'price.amount-desc': 'Price: High to Low',
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
        onLanguageToggle={toggleLanguage} 
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
      <section className="products-main">
        <div className="container">
          <div className="products-layout">
            
            {/* Filters Sidebar */}
            <aside className="filters-sidebar">
              <div className="filters-header">
                <h3 className="filters-title">{currentContent.filters.title}</h3>
                <button 
                  className="clear-filters-btn"
                  onClick={clearFilters}
                  type="button"
                >
                  {currentContent.filters.clearFilters}
                </button>
              </div>

              <div className="filters-content">
                {/* Search */}
                <div className="filter-group">
                  <input
                    type="text"
                    className="search-input"
                    placeholder={currentContent.filters.search}
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                  />
                </div>

                {/* Category Filter */}
                <div className="filter-group">
                  <label className="filter-label">{currentContent.filters.category}</label>
                  <select
                    className="filter-select"
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                  >
                    <option value="">{currentContent.filters.allCategories}</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Colors Filter */}
                {colors.length > 0 && (
                  <div className="filter-group">
                    <label className="filter-label">{currentContent.filters.colors}</label>
                    <div className="color-filters">
                      {colors.map(color => (
                        <label key={color.name} className="color-filter-item">
                          <input
                            type="checkbox"
                            checked={filters.colors.includes(color.name)}
                            onChange={() => handleMultiSelectFilter('colors', color.name)}
                          />
                          <span 
                            className="color-sample"
                            style={{ backgroundColor: color.hexCode }}
                            title={color.name}
                          ></span>
                          <span className="color-name">{color.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sizes Filter */}
                {sizes.length > 0 && (
                  <div className="filter-group">
                    <label className="filter-label">{currentContent.filters.sizes}</label>
                    <div className="size-filters">
                      {sizes.map(size => (
                        <label key={size.code} className="size-filter-item">
                          <input
                            type="checkbox"
                            checked={filters.sizes.includes(size.name)}
                            onChange={() => handleMultiSelectFilter('sizes', size.name)}
                          />
                          <span className="size-label">{size.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Price Range */}
                <div className="filter-group">
                  <label className="filter-label">{currentContent.filters.priceRange}</label>
                  <div className="price-range-inputs">
                    <input
                      type="number"
                      className="price-input"
                      placeholder={currentContent.filters.minPrice}
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                    />
                    <input
                      type="number"
                      className="price-input"
                      placeholder={currentContent.filters.maxPrice}
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                    />
                  </div>
                </div>

                {/* In Stock Filter */}
                <div className="filter-group">
                  <label className="checkbox-filter-item">
                    <input
                      type="checkbox"
                      checked={filters.inStock}
                      onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                    />
                    <span>{currentContent.filters.inStock}</span>
                  </label>
                </div>
              </div>
            </aside>

            {/* Products Content */}
            <main className="products-content">
              
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

                <div className="sort-controls">
                  <label className="sort-label">{currentContent.filters.sortBy}:</label>
                  <select
                    className="sort-select"
                    value={`${filters.sortBy}-${filters.sortOrder}`}
                    onChange={(e) => {
                      const [sortBy, sortOrder] = e.target.value.split('-');
                      setFilters(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
                    }}
                  >
                    {Object.entries(currentContent.filters.sortOptions).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Grid */}
              <div className="products-container">
                {loading ? (
                  <div className="loading-state">
                    <div className="loading-spinner">
                      <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                          <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                          <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                        </circle>
                      </svg>
                    </div>
                    <p>{currentContent.products.loading}</p>
                  </div>
                ) : error ? (
                  <div className="error-state">
                    <div className="error-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
                        <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>
                    <h3>{currentContent.products.error}</h3>
                    <p>{error}</p>
                  </div>
                ) : products.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 7L4 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <path d="M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
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
                            <div className="product-price">
                              {formatPrice(product.price)}
                            </div>
                            
                            <div className="product-stock">
                              {product.availability.inStock ? (
                                <span className="in-stock">
                                  {currentContent.products.inStock} ({product.availability.quantity} {currentContent.products.pieces})
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
        </div>
      </section>

      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default ProductsPage;