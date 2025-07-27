import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProductDetailPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { productService } from '../services/productService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [language, setLanguage] = useState('SR');
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');

  const toggleLanguage = () => {
    setLanguage(language === 'SR' ? 'EN' : 'SR');
  };

  // Function to determine if a color is light or dark
  const isLightColor = (hexColor) => {
    // Remove # if present
    const hex = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate relative luminance using WCAG formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return true if color is light (luminance > 0.5)
    return luminance > 0.5;
  };

  // Function to update checkmark color based on background
  const updateCheckmarkColor = (hexColor) => {
    const isLight = isLightColor(hexColor);
    
    // Set CSS custom properties for checkmark color
    const root = document.documentElement;
    if (isLight) {
      // Dark checkmark for light backgrounds
      root.style.setProperty('--check-color', '#000000');
      root.style.setProperty('--check-shadow', 'rgba(255, 255, 255, 0.8)');
    } else {
      // Light checkmark for dark backgrounds  
      root.style.setProperty('--check-color', '#ffffff');
      root.style.setProperty('--check-shadow', 'rgba(0, 0, 0, 0.8)');
    }
  };

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      setLoading(true);
      setError(null);

      try {
        const response = await productService.getProductById(id);
        if (response.success) {
          setProduct(response.data);
          const initialColor = response.data.colors?.[0];
          if (initialColor) {
            setSelectedColor(initialColor.name);
            // Set initial checkmark color based on first color
            updateCheckmarkColor(initialColor.hexCode);
          }
          setSelectedSize(response.data.sizes?.[0]?.name || '');
          
          // Fetch related products from same category
          if (response.data.catalog?.category) {
            try {
              const relatedResponse = await productService.getProductsByCategory(
                response.data.catalog.category, 
                { limit: 4 }
              );
              if (relatedResponse.success) {
                // Filter out current product
                const filtered = relatedResponse.data.products.filter(p => p._id !== id);
                setRelatedProducts(filtered.slice(0, 3));
              }
            } catch (relatedError) {
              console.error('Error fetching related products:', relatedError);
            }
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('sr-RS', {
      style: 'currency',
      currency: price.currency || 'RSD',
      minimumFractionDigits: 0
    }).format(price.amount);
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const handleColorSelect = (colorName) => {
    setSelectedColor(colorName);
    
    // Find the selected color object to get hex code
    const selectedColorObj = product.colors.find(color => color.name === colorName);
    if (selectedColorObj) {
      updateCheckmarkColor(selectedColorObj.hexCode);
    }
  };

  const handleSizeSelect = (sizeName) => {
    setSelectedSize(sizeName);
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
      breadcrumb: {
        home: 'Početna',
        products: 'Aluminijumski sistemi'
      },
      product: {
        loading: 'Učitava se aluminijumski sistem...',
        error: 'Greška pri učitavanju aluminijumskog sistema',
        notFound: 'Aluminijumski sistem nije pronađen',
        backToProducts: 'Nazad na sisteme',
        catalogNumber: 'Sistem br.',
        category: 'Kategorija',
        inStock: 'Dostupno',
        outOfStock: 'Trenutno nedostupno',
        pieces: 'm',
        colors: 'Dostupne RAL boje',
        sizes: 'Dostupni profili',
        price: 'Cena po metru',
        requestQuote: 'Zatraži ponudu',
        addToCart: 'Dodaj u specifikaciju',
        downloadCatalog: 'Preuzmi tehnički katalog',
        shareProduct: 'Podeli sistem'
      },
      tabs: {
        description: 'Opis',
        specifications: 'Specifikacije',
        installation: 'Ugradnja',
        certificates: 'Sertifikati'
      },
      specifications: {
        material: 'Aluminijumska legura',
        dimensions: 'Dimenzije profila',
        weight: 'Težina po metru',
        length: 'Standardna dužina',
        width: 'Širina profila',
        height: 'Visina profila',
        measurements: 'Tehnička specifikacija',
        size: 'Tip profila'
      },
      relatedProducts: {
        title: 'Slični aluminijumski sistemi',
        viewAll: 'Pogledaj sve sisteme',
        viewDetails: 'Specifikacije'
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
      breadcrumb: {
        home: 'Home',
        products: 'Aluminum Systems'
      },
      product: {
        loading: 'Loading aluminum system...',
        error: 'Error loading aluminum system',
        notFound: 'Aluminum system not found',
        backToProducts: 'Back to Systems',
        catalogNumber: 'System No.',
        category: 'Category',
        inStock: 'Available',
        outOfStock: 'Currently Unavailable',
        pieces: 'm',
        colors: 'Available RAL Colors',
        sizes: 'Available Profiles',
        price: 'Price per meter',
        requestQuote: 'Request Quote',
        addToCart: 'Add to Specification',
        downloadCatalog: 'Download Technical Catalog',
        shareProduct: 'Share System'
      },
      tabs: {
        description: 'Description',
        specifications: 'Specifications',
        installation: 'Installation',
        certificates: 'Certificates'
      },
      specifications: {
        material: 'Aluminum Alloy',
        dimensions: 'Profile Dimensions',
        weight: 'Weight per meter',
        length: 'Standard Length',
        width: 'Profile Width',
        height: 'Profile Height',
        measurements: 'Technical Specification',
        size: 'Profile Type'
      },
      relatedProducts: {
        title: 'Related Aluminum Systems',
        viewAll: 'View All Systems',
        viewDetails: 'Specifications'
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

  if (loading) {
    return (
      <div className="product-detail-page">
        <Header 
          language={language} 
          onLanguageToggle={toggleLanguage} 
          content={currentContent} 
        />
        <div className="loading-container">
          <div className="loading-spinner">
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
              </circle>
            </svg>
          </div>
          <p>{currentContent.product.loading}</p>
        </div>
        <Footer content={currentContent} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail-page">
        <Header 
          language={language} 
          onLanguageToggle={toggleLanguage} 
          content={currentContent} 
        />
        <div className="error-container">
          <div className="error-content">
            <h1>{currentContent.product.error}</h1>
            <p>{error || currentContent.product.notFound}</p>
            <Link to="/products" className="btn btn-primary">
              {currentContent.product.backToProducts}
            </Link>
          </div>
        </div>
        <Footer content={currentContent} />
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      {/* Header Section */}
      <Header 
        language={language} 
        onLanguageToggle={toggleLanguage} 
        content={currentContent} 
      />

      {/* Breadcrumb */}
      <section className="breadcrumb-section">
        <div className="container">
          <nav className="breadcrumb">
            <Link to="/">{currentContent.breadcrumb.home}</Link>
            <span className="breadcrumb-separator">›</span>
            <Link to="/products">{currentContent.breadcrumb.products}</Link>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="product-detail-section">
        <div className="container">
          <div className="product-detail-layout">
            
            {/* Product Images */}
            <div className="product-images">
              <div className="main-image">
                <img 
                  src={product.gallery?.[selectedImageIndex]?.url || '/images/placeholder/product-placeholder.jpg'} 
                  alt={product.gallery?.[selectedImageIndex]?.alt || product.title}
                />
                {!product.availability.inStock && (
                  <div className="stock-overlay">
                    <span>{currentContent.product.outOfStock}</span>
                  </div>
                )}
              </div>
              
              {product.gallery && product.gallery.length > 1 && (
                <div className="image-thumbnails">
                  {product.gallery.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                      onClick={() => handleImageSelect(index)}
                    >
                      <img src={image.url} alt={image.alt || product.title} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-meta">
                <span className="product-category">{product.catalog.category}</span>
                <span className="catalog-number">
                  {currentContent.product.catalogNumber}: {product.catalog.catalogNumber}
                </span>
              </div>

              <h1 className="product-title">{product.title}</h1>
              
              <div className="product-price">
                {formatPrice(product.price)}
              </div>

              <div className="product-stock">
                {product.availability.inStock ? (
                  <span className="in-stock">
                    {currentContent.product.inStock} ({product.availability.quantity} {currentContent.product.pieces})
                  </span>
                ) : (
                  <span className="out-of-stock">
                    {currentContent.product.outOfStock}
                  </span>
                )}
              </div>

              <div className="product-description">
                <p>{product.description}</p>
              </div>

              {/* Colors */}
              {product.colors && product.colors.length > 0 && (
                <div className="product-options">
                  <h4>{currentContent.product.colors}:</h4>
                  <div className="color-options">
                    {product.colors.map(color => (
                      <button
                        key={color.name}
                        className={`color-option ${selectedColor === color.name ? 'selected' : ''} ${!color.available ? 'unavailable' : ''}`}
                        onClick={() => handleColorSelect(color.name)}
                        disabled={!color.available}
                        title={color.name}
                      >
                        <span 
                          className="color-sample"
                          style={{ backgroundColor: color.hexCode }}
                        ></span>
                        <span className="color-name">{color.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="product-options">
                  <h4>{currentContent.product.sizes}:</h4>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button
                        key={size.code}
                        className={`size-option ${selectedSize === size.name ? 'selected' : ''} ${!size.available ? 'unavailable' : ''}`}
                        onClick={() => handleSizeSelect(size.name)}
                        disabled={!size.available}
                      >
                        {size.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="product-actions">
                <button className="btn btn-primary btn-lg">
                  {currentContent.product.requestQuote}
                </button>
                <button className="btn btn-outline btn-lg">
                  {currentContent.product.downloadCatalog}
                </button>
              </div>

              {/* Additional Actions */}
              <div className="additional-actions">
                <button className="action-btn">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.34C15.11 18.55 15.08 18.77 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor"/>
                  </svg>
                  {currentContent.product.shareProduct}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="product-tabs-section">
        <div className="container">
          <div className="product-tabs">
            <div className="tab-navigation">
              <button 
                className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                {currentContent.tabs.description}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'specifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('specifications')}
              >
                {currentContent.tabs.specifications}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'installation' ? 'active' : ''}`}
                onClick={() => setActiveTab('installation')}
              >
                {currentContent.tabs.installation}
              </button>
              <button 
                className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
                onClick={() => setActiveTab('certificates')}
              >
                {currentContent.tabs.certificates}
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'description' && (
                <div className="tab-panel">
                  <div className="description-content">
                    <p>{product.description}</p>
                    {product.catalog.tags && product.catalog.tags.length > 0 && (
                      <div className="product-tags">
                        <h4>{language === 'SR' ? 'Ključne reči:' : 'Keywords:'}</h4>
                        <div className="tags">
                          {product.catalog.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'specifications' && (
                <div className="tab-panel">
                  <div className="specifications-content">
                    <div className="spec-grid">
                      <div className="spec-group">
                        <h4>{currentContent.specifications.measurements}</h4>
                        {product.measurements && product.measurements.length > 0 && (
                          <div className="measurements">
                            {product.measurements.map((measurement, index) => (
                              <div key={index} className="measurement-item">
                                <h5>{measurement.size}</h5>
                                <div className="measurement-details">
                                  {measurement.dimensions.length && (
                                    <div className="measurement-row">
                                      <span>{currentContent.specifications.length}:</span>
                                      <span>{measurement.dimensions.length} mm</span>
                                    </div>
                                  )}
                                  {measurement.dimensions.width && (
                                    <div className="measurement-row">
                                      <span>{currentContent.specifications.width}:</span>
                                      <span>{measurement.dimensions.width} mm</span>
                                    </div>
                                  )}
                                  {measurement.dimensions.height && (
                                    <div className="measurement-row">
                                      <span>{currentContent.specifications.height}:</span>
                                      <span>{measurement.dimensions.height} mm</span>
                                    </div>
                                  )}
                                  {measurement.dimensions.weight && (
                                    <div className="measurement-row">
                                      <span>{currentContent.specifications.weight}:</span>
                                      <span>{measurement.dimensions.weight} kg</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'installation' && (
                <div className="tab-panel">
                  <div className="installation-content">
                    <h4>{language === 'SR' ? 'Uputstvo za ugradnju aluminijumskog sistema' : 'Aluminum System Installation Guide'}</h4>
                    <p>{language === 'SR' ? 'Detaljno uputstvo za profesionalnu ugradnju ovog aluminijumskog sistema.' : 'Detailed instructions for professional installation of this aluminum system.'}</p>
                    <div className="installation-steps">
                      <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                          <h5>{language === 'SR' ? 'Priprema i merenje' : 'Preparation and Measuring'}</h5>
                          <p>{language === 'SR' ? 'Proverite sve aluminijumske profile i alate potrebne za ugradnju. Precizno izmerite otvore.' : 'Check all aluminum profiles and tools needed for installation. Measure openings precisely.'}</p>
                        </div>
                      </div>
                      <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                          <h5>{language === 'SR' ? 'Montaža rama' : 'Frame Assembly'}</h5>
                          <p>{language === 'SR' ? 'Sastavljanje aluminijumskog rama prema tehničkoj specifikaciji.' : 'Assemble aluminum frame according to technical specifications.'}</p>
                        </div>
                      </div>
                      <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                          <h5>{language === 'SR' ? 'Ugradnja i podešavanje' : 'Installation and Adjustment'}</h5>
                          <p>{language === 'SR' ? 'Ugradite sistem i podesi funkcionalnost prema standardima.' : 'Install the system and adjust functionality according to standards.'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="tab-panel">
                  <div className="certificates-content">
                    <h4>{language === 'SR' ? 'Sertifikati i standardi' : 'Certificates and Standards'}</h4>
                    <div className="certificates-grid">
                      <div className="certificate-item">
                        <img src="/images/sertifikat1.png" alt="ISO Certificate" />
                        <div className="certificate-info">
                          <h5>ISO 9001:2015</h5>
                          <p>{language === 'SR' ? 'Sistem upravljanja kvalitetom' : 'Quality Management System'}</p>
                        </div>
                      </div>
                      <div className="certificate-item">
                        <img src="/images/sertifikat2.png" alt="CE Certificate" />
                        <div className="certificate-info">
                          <h5>CE {language === 'SR' ? 'Označavanje' : 'Marking'}</h5>
                          <p>{language === 'SR' ? 'Evropski standardi usaglašenosti' : 'European Conformity Standards'}</p>
                        </div>
                      </div>
                      <div className="certificate-item">
                        <img src="/images/sertifikat3.png" alt="EN Standards" />
                        <div className="certificate-info">
                          <h5>EN 14351-1</h5>
                          <p>{language === 'SR' ? 'Evropski standard za prozore i vrata' : 'European Standard for Windows and Doors'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">{currentContent.relatedProducts.title}</h2>
              <Link to="/products" className="view-all-btn">
                {currentContent.relatedProducts.viewAll}
              </Link>
            </div>
            
            <div className="related-products-grid">
              {relatedProducts.map(relatedProduct => (
                <div key={relatedProduct._id} className="related-product-card">
                  <div className="product-image">
                    <img 
                      src={relatedProduct.gallery?.[0]?.url || '/images/placeholder/product-placeholder.jpg'} 
                      alt={relatedProduct.gallery?.[0]?.alt || relatedProduct.title}
                    />
                  </div>
                  <div className="product-info">
                    <h4 className="product-title">{relatedProduct.title}</h4>
                    <div className="product-price">{formatPrice(relatedProduct.price)}</div>
                    <Link 
                      to={`/products/${relatedProduct._id}`} 
                      className="btn btn-outline btn-sm"
                    >
                      {currentContent.relatedProducts.viewDetails}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Footer Section */}
      <Footer content={currentContent} />
    </div>
  );
};

export default ProductDetailPage;