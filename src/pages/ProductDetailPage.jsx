import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { productService } from '../services/productService';
import useLanguage from '../hooks/useLanguage';
import { getLocalizedProduct, getLocalizedContent } from '../utils/multilingual';
import { safeRender } from '../utils/safeRender';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, changeLanguage } = useLanguage();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedColorCategory, setSelectedColorCategory] = useState('Aloksaza');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedPlastificationType, setSelectedPlastificationType] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [imageLoading, setImageLoading] = useState(true);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Create localized product that updates when language changes
  const localizedProduct = React.useMemo(() => {
    return product ? getLocalizedProduct(product, language) : null;
  }, [product, language]);

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
          
          // Reset selectedImageIndex if it's beyond the gallery length
          if (response.data.gallery && response.data.gallery.length > 0) {
            setSelectedImageIndex(prev => 
              prev >= response.data.gallery.length ? 0 : prev
            );
            setImageLoading(true); // Start loading the first image
          } else {
            setSelectedImageIndex(0);
          }
          
          
          const initialColor = response.data.colors?.[0];
          if (initialColor) {
            setSelectedColor(safeRender(initialColor.name, language));
            // Set initial checkmark color based on first color
            updateCheckmarkColor(initialColor.hexCode);
          }
          setSelectedSize(response.data.sizes?.[0] ? safeRender(response.data.sizes[0].name, language) : '');
          
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

  // Refresh product data periodically to catch admin updates
  useEffect(() => {
    if (!id || !product) return;

    const refreshProduct = async () => {
      try {
        const response = await productService.getProductById(id);
        if (response.success) {
          // Only update if the gallery has actually changed
          const newGalleryLength = response.data.gallery?.length || 0;
          const currentGalleryLength = product.gallery?.length || 0;
          
          if (newGalleryLength !== currentGalleryLength) {
            setProduct(response.data);
            
            // Reset selectedImageIndex if necessary
            if (selectedImageIndex >= newGalleryLength) {
              setSelectedImageIndex(0);
            }
          }
        }
      } catch (err) {
        console.error('Error refreshing product:', err);
      }
    };

    // Refresh every 30 seconds when product is loaded
    const interval = setInterval(refreshProduct, 30000);
    
    return () => clearInterval(interval);
  }, [id, product, selectedImageIndex]);

  // Update selected color and size labels when language changes
  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      // Find the currently selected color object by Serbian name (stored value)
      const currentColorObj = product.colors.find(color => 
        safeRender(color.name, 'SR') === (typeof selectedColor === 'object' ? safeRender(selectedColor, 'SR') : selectedColor) ||
        safeRender(color.name, language) === selectedColor
      );
      
      if (currentColorObj) {
        const newColorName = safeRender(currentColorObj.name, language);
        if (newColorName !== selectedColor) {
          setSelectedColor(newColorName);
        }
      }
    }
    
    if (product && product.sizes && product.sizes.length > 0) {
      // Find the currently selected size object by Serbian name (stored value)
      const currentSizeObj = product.sizes.find(size => 
        safeRender(size.name, 'SR') === (typeof selectedSize === 'object' ? safeRender(selectedSize, 'SR') : selectedSize) ||
        safeRender(size.name, language) === selectedSize
      );
      
      if (currentSizeObj) {
        const newSizeName = safeRender(currentSizeObj.name, language);
        if (newSizeName !== selectedSize) {
          setSelectedSize(newSizeName);
        }
      }
    }
  }, [language, product]); // Run when language or product changes

  // Load images for initially selected color (but not on initial load)
  useEffect(() => {
    if (product && selectedColor && product.gallery && product.gallery.length > 0) {
      // Find the color object to get Serbian name for image matching
      const selectedColorObj = product.colors.find(color => safeRender(color.name, language) === selectedColor);
      const serbianColorName = selectedColorObj ? safeRender(selectedColorObj.name, 'SR') : selectedColor;
      
      // Only update if we're changing color, not on initial load
      updateImagesForColor(serbianColorName);
    }
  }, [selectedColor, language, product]); // Add language and product dependencies

  // Keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!product?.gallery || product.gallery.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextImage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product]);

  // Function to jump to image based on selected color and category
  const updateImagesForColor = async (colorName, category = null) => {
    if (!product || !product.gallery) {
      return;
    }
    
    const currentCategory = category || selectedColorCategory;
    
    // Find the first image associated with the selected color and category
    const colorImageIndex = product.gallery.findIndex(img => 
      img.colorAssociation === colorName && 
      (img.categoryAssociation === currentCategory || !img.categoryAssociation)
    );
    
    if (colorImageIndex !== -1) {
      // Found an image for this color and category, jump to it
      setSelectedImageIndex(colorImageIndex);
      centerThumbnail(colorImageIndex);
    } else {
      // No specific image for this color, find first category-matching or generic image
      const categoryImageIndex = product.gallery.findIndex(img => 
        img.categoryAssociation === currentCategory || !img.categoryAssociation
      );
      if (categoryImageIndex !== -1) {
        setSelectedImageIndex(categoryImageIndex);
        centerThumbnail(categoryImageIndex);
      }
      // If no matching images either, keep current index (don't reset to 0)
    }
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
    setImageLoading(true);
  };

  // Center selected thumbnail in the slider
  const centerThumbnail = (index) => {
    setTimeout(() => {
      const container = document.querySelector('.image-thumbnails');
      const thumbnails = container?.querySelectorAll('.thumbnail');
      if (container && thumbnails && thumbnails[index]) {
        const thumbnail = thumbnails[index];
        const containerWidth = container.offsetWidth;
        const thumbnailWidth = thumbnail.offsetWidth;
        const thumbnailLeft = thumbnail.offsetLeft;
        const scrollLeft = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2);
        container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
      }
    }, 100);
  };

  // Handle thumbnail navigation arrows
  const handlePrevThumbnail = () => {
    if (product?.gallery && product.gallery.length > 0) {
      const newIndex = selectedImageIndex === 0 ? product.gallery.length - 1 : selectedImageIndex - 1;
      setSelectedImageIndex(newIndex);
      setImageLoading(true);
      centerThumbnail(newIndex);
    }
  };

  const handleNextThumbnail = () => {
    if (product?.gallery && product.gallery.length > 0) {
      const newIndex = selectedImageIndex === product.gallery.length - 1 ? 0 : selectedImageIndex + 1;
      setSelectedImageIndex(newIndex);
      setImageLoading(true);
      centerThumbnail(newIndex);
    }
  };

  const handleImageLoad = (e) => {
    setImageLoading(false);
    const img = e.target;
    setImageDimensions({
      width: img.naturalWidth,
      height: img.naturalHeight
    });
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageDimensions({ width: 500, height: 500 }); // fallback dimensions
  };

  // Calculate adaptive height based on image aspect ratio
  const getAdaptiveImageStyle = () => {
    if (imageLoading || imageDimensions.width === 0 || imageDimensions.height === 0) {
      return { height: '500px' }; // default height while loading
    }

    const containerWidth = 600; // max width for the image container
    const aspectRatio = imageDimensions.height / imageDimensions.width;
    const adaptiveHeight = Math.min(Math.max(containerWidth * aspectRatio, 300), 800); // min 300px, max 800px

    return {
      height: `${adaptiveHeight}px`,
      objectFit: 'contain' // ensure full image is visible
    };
  };

  const handlePrevImage = () => {
    if (product?.gallery && product.gallery.length > 0) {
      setSelectedImageIndex(prev => 
        prev === 0 ? product.gallery.length - 1 : prev - 1
      );
      setImageLoading(true);
    }
  };

  const handleNextImage = () => {
    if (product?.gallery && product.gallery.length > 0) {
      setSelectedImageIndex(prev => 
        prev === product.gallery.length - 1 ? 0 : prev + 1
      );
      setImageLoading(true);
    }
  };

  const handleDownloadCatalog = () => {
    if (product && product.catalogPdf && product.catalogPdf.publicId) {
      // Use our backend download endpoint
      const downloadUrl = `${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/products/${product._id}/catalog/download`;
      console.log('Opening PDF download URL:', downloadUrl);
      window.open(downloadUrl, '_blank', 'noopener,noreferrer');
    } else {
      console.log('No catalog PDF available for product:', product);
      alert(language === 'SR' ? 'Katalog nije dostupan za ovaj proizvod.' : 
            language === 'EN' ? 'Catalog is not available for this product.' :
            'Katalog ist für dieses Produkt nicht verfügbar.');
    }
  };

  const handleColorSelect = async (colorName, category = null) => {
    setSelectedColor(colorName);
    
    // Find the selected color object to get hex code and category
    const selectedColorObj = product.colors.find(color => safeRender(color.name, language) === colorName);
    if (selectedColorObj) {
      updateCheckmarkColor(selectedColorObj.hexCode);
      if (selectedColorObj.category !== selectedColorCategory) {
        setSelectedColorCategory(selectedColorObj.category);
        // Reset plastification type when switching away from Plastifikacija
        if (selectedColorObj.category !== 'Plastifikacija') {
          setSelectedPlastificationType('');
        }
      }
    }
    
    // Update images based on selected color and its category - use Serbian name for backend matching
    const serbianColorName = selectedColorObj ? safeRender(selectedColorObj.name, 'SR') : colorName;
    await updateImagesForColor(serbianColorName, selectedColorObj?.category);
  };

  const handleSizeSelect = (sizeName) => {
    setSelectedSize(sizeName);
  };

  const handlePlastificationTypeSelect = (typeName) => {
    setSelectedPlastificationType(typeName);
  };

  const handleRequestQuote = () => {
    if (!product) return;
    
    // Combine color and plastification type when both are selected
    let colorDescription = selectedColor;
    if (selectedColorCategory === 'Plastifikacija' && selectedPlastificationType) {
      const plastificationTypeLabel = language === 'SR' ? 
        (selectedPlastificationType === 'sjajna' ? 'Sjajna' : 
         selectedPlastificationType === 'matt' ? 'Matt' : 
         selectedPlastificationType === 'strukturalna' ? 'Strukturalna' : selectedPlastificationType) :
        language === 'EN' ? 
        (selectedPlastificationType === 'sjajna' ? 'Glossy' : 
         selectedPlastificationType === 'matt' ? 'Matte' : 
         selectedPlastificationType === 'strukturalna' ? 'Textured' : selectedPlastificationType) :
        (selectedPlastificationType === 'sjajna' ? 'Glänzend' : 
         selectedPlastificationType === 'matt' ? 'Matt' : 
         selectedPlastificationType === 'strukturalna' ? 'Strukturiert' : selectedPlastificationType);
      
      colorDescription = `${selectedColor} - ${plastificationTypeLabel}`;
    }
    
    // Create URL parameters with product details
    const params = new URLSearchParams({
      product: safeRender(product.title, language),
      color: colorDescription,
      profile: selectedSize,
      focus: 'contact-form'
    });
    
    // Navigate to contact page with parameters
    navigate(`/contact?${params.toString()}`);
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
        aloksazaColors: 'Dostupne boje za anodnu oksidaciju',
        plastifikacijaColors: 'Dostupne boje za plastifikaciju',
        tigerCatalogInfo: 'Dostupne su i dodatne boje iz Tiger kataloga. Za upit o specifičnim bojama koristite dugme ispod.',
        requestColorInquiry: 'Zatraži upit za boju',
        sizes: 'Dostupni profili',
        // price: 'Cena po metru', // Removed price label
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
        aloksazaColors: 'Available Colors for Anodizing',
        plastifikacijaColors: 'Available Colors for Powder Coating',
        tigerCatalogInfo: 'Additional colors from Tiger catalog are available. Use the button below to inquire about specific colors.',
        requestColorInquiry: 'Request Color Inquiry',
        sizes: 'Available Profiles',
        // price: 'Price per meter', // Removed price label
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
      breadcrumb: {
        home: 'Startseite',
        products: 'Aluminiumsysteme'
      },
      product: {
        loading: 'Aluminiumsystem wird geladen...',
        error: 'Fehler beim Laden des Aluminiumsystems',
        notFound: 'Aluminiumsystem nicht gefunden',
        backToProducts: 'Zurück zu Systemen',
        catalogNumber: 'System Nr.',
        category: 'Kategorie',
        inStock: 'Verfügbar',
        outOfStock: 'Derzeit nicht verfügbar',
        pieces: 'm',
        colors: 'Verfügbare RAL-Farben',
        aloksazaColors: 'Verfügbare Farben für Eloxierung',
        plastifikacijaColors: 'Verfügbare Farben für Pulverbeschichtung',
        tigerCatalogInfo: 'Zusätzliche Farben aus dem Tiger-Katalog sind verfügbar. Verwenden Sie die Schaltfläche unten, um nach bestimmten Farben zu fragen.',
        requestColorInquiry: 'Farbanfrage stellen',
        sizes: 'Verfügbare Profile',
        // price: 'Preis pro Meter', // Removed price label
        requestQuote: 'Angebot anfordern',
        addToCart: 'Zur Spezifikation hinzufügen',
        downloadCatalog: 'Technischen Katalog herunterladen',
        shareProduct: 'System teilen'
      },
      tabs: {
        description: 'Beschreibung',
        specifications: 'Spezifikationen',
        installation: 'Installation',
        certificates: 'Zertifikate'
      },
      specifications: {
        material: 'Aluminiumlegierung',
        dimensions: 'Profilabmessungen',
        weight: 'Gewicht pro Meter',
        length: 'Standardlänge',
        width: 'Profilbreite',
        height: 'Profilhöhe',
        measurements: 'Technische Spezifikation',
        size: 'Profiltyp'
      },
      relatedProducts: {
        title: 'Ähnliche Aluminiumsysteme',
        viewAll: 'Alle Systeme anzeigen',
        viewDetails: 'Spezifikationen'
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
          title: 'Schnellzugriff',
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

  if (loading) {
    return (
      <div className="product-detail-page">
        <Header 
          language={language} 
          onLanguageChange={changeLanguage} 
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
          onLanguageChange={changeLanguage} 
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
        onLanguageChange={changeLanguage} 
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
            <span className="breadcrumb-current">{safeRender(localizedProduct?.localizedTitle, language)}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail Section */}
      <section className="product-detail-section">
        <div className="container">
          <div className="product-detail-layout">
            
            {/* Product Images */}
            <div className="product-images">
              <div className="main-image-container">
                <div className="main-image">
                  {imageLoading && (
                    <div className="image-loading">
                      <div className="loading-spinner">
                        <svg viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                            <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                            <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                          </circle>
                        </svg>
                      </div>
                    </div>
                  )}
                  <img 
                    src={
                      product?.gallery?.[selectedImageIndex]?.url || 
                      '/images/placeholder/product-placeholder.jpg'
                    } 
                    alt={
                      product?.gallery?.[selectedImageIndex]?.alt || 
                      product?.title
                    }
                    style={getAdaptiveImageStyle()}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    className={imageLoading ? 'loading' : ''}
                  />

                  {!product.availability.inStock && (
                    <div className="stock-overlay">
                      <span>{currentContent.product.outOfStock}</span>
                    </div>
                  )}
                  
                  {/* Arrows removed from main image as requested */}
                </div>
                
              </div>
              
              {/* Product Image Thumbnail Slider */}
              {product && product.gallery && product.gallery.length > 0 && (
                <div className="image-thumbnails-container">
                  <div className="thumbnails-label">
                    <span>{language === 'SR' ? 'Galerija slika' : language === 'EN' ? 'Image Gallery' : 'Bildergalerie'}</span>
                    <span className="thumbnails-count">
                      ({product.gallery.length} {language === 'SR' ? 'slika' : language === 'EN' ? 'images' : 'Bilder'})
                    </span>
                  </div>
                  
                  <div className="thumbnails-wrapper">
                    {/* Navigation Arrows for Thumbnails */}
                    {product.gallery.length > 1 && (
                      <button 
                        className="thumbnail-nav-btn prev-thumb-btn"
                        onClick={handlePrevThumbnail}
                        aria-label="Previous image"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                    
                    <div className="image-thumbnails">
                      {product.gallery.map((image, index) => (
                        <button
                          key={index}
                          className={`thumbnail ${index === selectedImageIndex ? 'active' : ''}`}
                          onClick={() => {
                            handleImageSelect(index);
                            centerThumbnail(index);
                          }}
                          title={`${language === 'SR' ? 'Slika' : language === 'EN' ? 'Image' : 'Bild'} ${index + 1}`}
                        >
                          <img src={image.url} alt={image.alt || `${safeRender(localizedProduct?.localizedTitle, language)} - Image ${index + 1}`} />
                        </button>
                      ))}
                    </div>
                    
                    {/* Navigation Arrows for Thumbnails */}
                    {product.gallery.length > 1 && (
                      <button 
                        className="thumbnail-nav-btn next-thumb-btn"
                        onClick={handleNextThumbnail}
                        aria-label="Next image"
                      >
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="product-info">
              <div className="product-meta">
                <span className="product-category">{safeRender(product.catalog.category, language)}</span>
                <span className="catalog-number">
                  {currentContent.product.catalogNumber}: {product.catalog.catalogNumber}
                </span>
              </div>

              <h1 className="product-title">{safeRender(localizedProduct?.localizedTitle, language)}</h1>
              
              {/* Removed product price display */}

              <div className="product-stock">
                {product.availability.inStock ? (
                  <span className="in-stock">
                    {currentContent.product.inStock}
                  </span>
                ) : (
                  <span className="out-of-stock">
                    {currentContent.product.outOfStock}
                  </span>
                )}
              </div>

              <div className="product-description">
                <p>{safeRender(localizedProduct?.localizedDescription, language)}</p>
              </div>

              {/* Aloksaza Colors */}
              {product.colors && product.colors.filter(color => color.category === 'Aloksaza').length > 0 && (
                <div className="product-options">
                  <h4>{currentContent.product.aloksazaColors}:</h4>
                  <div className="color-options">
                    {product.colors.filter(color => color.category === 'Aloksaza').map(color => (
                      <button
                        key={safeRender(color.name, language)}
                        className={`color-option ${selectedColor === safeRender(color.name, language) ? 'selected' : ''} ${!color.available ? 'unavailable' : ''}`}
                        onClick={() => handleColorSelect(safeRender(color.name, language))}
                        disabled={!color.available}
                        title={safeRender(color.name, language)}
                      >
                        <span 
                          className="color-sample"
                          style={{ backgroundColor: color.hexCode }}
                        ></span>
                        <span className="color-name">{safeRender(color.name, language)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Plastifikacija Colors */}
              {product.colors && product.colors.filter(color => color.category === 'Plastifikacija').length > 0 && (
                <div className="product-options">
                  <h4>{currentContent.product.plastifikacijaColors}:</h4>
                  <div className="color-options">
                    {product.colors.filter(color => color.category === 'Plastifikacija').map(color => (
                      <button
                        key={safeRender(color.name, language)}
                        className={`color-option ${selectedColor === safeRender(color.name, language) ? 'selected' : ''} ${!color.available ? 'unavailable' : ''}`}
                        onClick={() => handleColorSelect(safeRender(color.name, language))}
                        disabled={!color.available}
                        title={safeRender(color.name, language)}
                      >
                        <span 
                          className="color-sample"
                          style={{ backgroundColor: color.hexCode }}
                        ></span>
                        <span className="color-name">{safeRender(color.name, language)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Plastification Types - only show when Plastifikacija color is selected */}
              {product.plastificationTypes && product.plastificationTypes.showOnProduct && 
               selectedColorCategory === 'Plastifikacija' && (
                (product.plastificationTypes.sjajna || product.plastificationTypes.matt || product.plastificationTypes.strukturalna) && (
                  <div className="product-options">
                    <h4>{language === 'SR' ? 'Završna obrada plastifikacije:' : language === 'EN' ? 'Plastification Finishing:' : 'Pulverbeschichtungs-Veredelung:'}</h4>
                    <div className="plastification-types">
                      {product.plastificationTypes.sjajna && (
                        <button
                          className={`plastification-type ${selectedPlastificationType === 'sjajna' ? 'selected' : ''}`}
                          onClick={() => handlePlastificationTypeSelect('sjajna')}
                          title={language === 'SR' ? 'Sjajna plastifikacija' : language === 'EN' ? 'Glossy plastification' : 'Glänzende Pulverbeschichtung'}
                        >
                          {language === 'SR' ? 'Sjajna' : language === 'EN' ? 'Glossy' : 'Glänzend'}
                        </button>
                      )}
                      {product.plastificationTypes.matt && (
                        <button
                          className={`plastification-type ${selectedPlastificationType === 'matt' ? 'selected' : ''}`}
                          onClick={() => handlePlastificationTypeSelect('matt')}
                          title={language === 'SR' ? 'Matt plastifikacija' : language === 'EN' ? 'Matte plastification' : 'Matte Pulverbeschichtung'}
                        >
                          {language === 'SR' ? 'Matt' : language === 'EN' ? 'Matte' : 'Matt'}
                        </button>
                      )}
                      {product.plastificationTypes.strukturalna && (
                        <button
                          className={`plastification-type ${selectedPlastificationType === 'strukturalna' ? 'selected' : ''}`}
                          onClick={() => handlePlastificationTypeSelect('strukturalna')}
                          title={language === 'SR' ? 'Strukturalna plastifikacija' : language === 'EN' ? 'Textured plastification' : 'Strukturierte Pulverbeschichtung'}
                        >
                          {language === 'SR' ? 'Strukturalna' : language === 'EN' ? 'Textured' : 'Strukturiert'}
                        </button>
                      )}
                    </div>
                  </div>
                )
              )}

              {/* Tiger Catalog Color Inquiry */}
              <div className="product-options tiger-catalog-section">
                <p className="tiger-info">{currentContent.product.tigerCatalogInfo}</p>
                <div className="tiger-catalog-actions">
                  <button 
                    className="btn btn-outline tiger-catalog-btn"
                    onClick={() => window.open('/documents/tiger-color-catalog.pdf', '_blank')}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                      <polyline points="14,2 14,8 20,8"/>
                    </svg>
                    {language === 'SR' ? 'Pogledaj Tiger katalog' : language === 'EN' ? 'View Tiger Catalog' : 'Tiger-Katalog ansehen'}
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => {
                      const params = new URLSearchParams({
                        product: safeRender(product.title, language),
                        focus: 'contact-form',
                        inquiryType: 'upit za boju'
                      });
                      navigate(`/contact?${params.toString()}`);
                    }}
                  >
                    {currentContent.product.requestColorInquiry}
                  </button>
                </div>
              </div>

              {/* Sizes */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="product-options">
                  <h4>{currentContent.product.sizes}:</h4>
                  <div className="size-options">
                    {product.sizes.map(size => (
                      <button
                        key={size.code}
                        className={`size-option ${selectedSize === safeRender(size.name, language) ? 'selected' : ''} ${!size.available ? 'unavailable' : ''}`}
                        onClick={() => handleSizeSelect(safeRender(size.name, language))}
                        disabled={!size.available}
                      >
                        {safeRender(size.name, language)}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="product-actions">
                <button 
                  className="btn btn-primary btn-lg"
                  onClick={handleRequestQuote}
                >
                  {currentContent.product.requestQuote}
                </button>
                <button 
                  className={`btn btn-outline btn-lg ${!product.catalogPdf?.publicId ? 'disabled' : ''}`}
                  onClick={handleDownloadCatalog}
                  disabled={!product.catalogPdf?.publicId}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
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
                    <p>{safeRender(localizedProduct?.localizedDescription, language)}</p>
                    {product.catalog.tags && product.catalog.tags.length > 0 && (
                      <div className="product-tags">
                        <h4>{language === 'SR' ? 'Ključne reči:' : language === 'EN' ? 'Keywords:' : 'Schlüsselwörter:'}</h4>
                        <div className="tags">
                          {product.catalog.tags.map((tag, index) => (
                            <span key={index} className="tag">{safeRender(tag, language)}</span>
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
                    <h4>{language === 'SR' ? 'Uputstvo za ugradnju aluminijumskog sistema' : language === 'EN' ? 'Aluminum System Installation Guide' : 'Aluminiumsystem-Installationsanleitung'}</h4>
                    <p>{language === 'SR' ? 'Detaljno uputstvo za profesionalnu ugradnju ovog aluminijumskog sistema.' : language === 'EN' ? 'Detailed instructions for professional installation of this aluminum system.' : 'Detaillierte Anweisungen für die professionelle Installation dieses Aluminiumsystems.'}</p>
                    <div className="installation-steps">
                      <div className="step">
                        <div className="step-number">1</div>
                        <div className="step-content">
                          <h5>{language === 'SR' ? 'Priprema i merenje' : language === 'EN' ? 'Preparation and Measuring' : 'Vorbereitung und Vermessung'}</h5>
                          <p>{language === 'SR' ? 'Proverite sve aluminijumske profile i alate potrebne za ugradnju. Precizno izmerite otvore.' : language === 'EN' ? 'Check all aluminum profiles and tools needed for installation. Measure openings precisely.' : 'Überprüfen Sie alle Aluminiumprofile und Werkzeuge, die für die Installation benötigt werden. Messen Sie Öffnungen präzise aus.'}</p>
                        </div>
                      </div>
                      <div className="step">
                        <div className="step-number">2</div>
                        <div className="step-content">
                          <h5>{language === 'SR' ? 'Montaža rama' : language === 'EN' ? 'Frame Assembly' : 'Rahmenmontage'}</h5>
                          <p>{language === 'SR' ? 'Sastavljanje aluminijumskog rama prema tehničkoj specifikaciji.' : language === 'EN' ? 'Assemble aluminum frame according to technical specifications.' : 'Montieren Sie den Aluminiumrahmen gemäß den technischen Spezifikationen.'}</p>
                        </div>
                      </div>
                      <div className="step">
                        <div className="step-number">3</div>
                        <div className="step-content">
                          <h5>{language === 'SR' ? 'Ugradnja i podešavanje' : language === 'EN' ? 'Installation and Adjustment' : 'Installation und Einstellung'}</h5>
                          <p>{language === 'SR' ? 'Ugradite sistem i podesi funkcionalnost prema standardima.' : language === 'EN' ? 'Install the system and adjust functionality according to standards.' : 'Installieren Sie das System und stellen Sie die Funktionalität gemäß den Standards ein.'}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'certificates' && (
                <div className="tab-panel">
                  <div className="certificates-content">
                    <h4>{language === 'SR' ? 'Sertifikati i standardi' : language === 'EN' ? 'Certificates and Standards' : 'Zertifikate und Standards'}</h4>
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
                          <h5>CE {language === 'SR' ? 'Označavanje' : language === 'EN' ? 'Marking' : 'Kennzeichnung'}</h5>
                          <p>{language === 'SR' ? 'Evropski standardi usaglašenosti' : language === 'EN' ? 'European Conformity Standards' : 'Europäische Konformitätsstandards'}</p>
                        </div>
                      </div>
                      <div className="certificate-item">
                        <img src="/images/sertifikat3.png" alt="EN Standards" />
                        <div className="certificate-info">
                          <h5>EN 14351-1</h5>
                          <p>{language === 'SR' ? 'Evropski standard za prozore i vrata' : language === 'EN' ? 'European Standard for Windows and Doors' : 'Europäischer Standard für Fenster und Türen'}</p>
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
                    {/* Removed price from related products */}
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