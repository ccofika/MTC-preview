import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { translationService } from '../services/translationService';
import { getLocalizedContent } from '../utils/multilingual';
import { safeRender } from '../utils/safeRender';
import './ProductManager.css';

const ProductManager = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'edit'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showHidden, setShowHidden] = useState(false);
  const [catalogPdfFile, setCatalogPdfFile] = useState(null);
  const [uploadingCatalog, setUploadingCatalog] = useState(null);
  const [translatingProducts, setTranslatingProducts] = useState(new Set());
  const [currentLanguage, setCurrentLanguage] = useState('SR'); // SR, EN, DE

  // Form state - now multilingual
  const [formData, setFormData] = useState({
    title: { sr: '', en: '', de: '' },
    description: { sr: '', en: '', de: '' },
    catalog: {
      catalogNumber: '',
      category: { sr: '', en: '', de: '' },
      subcategory: { sr: '', en: '', de: '' },
      tags: { sr: [], en: [], de: [] }
    },
    colors: [],
    sizes: [],
    price: {
      amount: '',
      currency: 'RSD'
    },
    availability: {
      inStock: true,
      quantity: 0
    },
    measurements: [],
    plastificationTypes: {
      sjajna: false,
      matt: false,
      strukturalna: false,
      showOnProduct: false
    }
  });

  const [images, setImages] = useState([]);
  const [currentColor, setCurrentColor] = useState({ name: '', hexCode: '#000000', category: 'Aloksaza' });
  const [currentSize, setCurrentSize] = useState({ name: '', code: '' });
  const [currentMeasurement, setCurrentMeasurement] = useState({
    size: '',
    dimensions: { length: '', width: '', height: '', weight: '' }
  });

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [isReordering, setIsReordering] = useState(false);

  // Categories dropdown options
  const categoryOptions = [
    'Prozorski sistemi',
    'Vrata sistemi', 
    'Fasadni sistemi',
    'Industrijski profili',
    'Ograde i balustrade',
    'Roletne i žaluzine'
  ];

  useEffect(() => {
    if (activeTab === 'list') {
      fetchProducts();
    }
  }, [activeTab, showHidden]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await productService.getAllProductsForAdmin({ 
        limit: 50, 
        includeHidden: showHidden.toString() 
      }, token);
      setProducts(response.data.products || []);
    } catch (err) {
      setError('Greška pri učitavanju proizvoda');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const fieldParts = field.split('.');
      if (fieldParts.length === 2) {
        const [parent, child] = fieldParts;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: value
          }
        }));
      }
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  // New multilingual input handler
  const handleMultilingualInputChange = (field, value, language = currentLanguage) => {
    const langCode = language.toLowerCase();
    
    if (field.includes('.')) {
      const fieldParts = field.split('.');
      if (fieldParts.length === 2) {
        const [parent, child] = fieldParts;
        setFormData(prev => ({
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: {
              ...prev[parent][child],
              [langCode]: value
            }
          }
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: {
          ...prev[field],
          [langCode]: value
        }
      }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const addColor = () => {
    if (currentColor.name && currentColor.hexCode && currentColor.category) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, { ...currentColor, available: true }]
      }));
      setCurrentColor({ name: '', hexCode: '#000000', category: 'Aloksaza' });
    }
  };

  const removeColor = (index) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };

  const addSize = () => {
    if (currentSize.name && currentSize.code) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, { ...currentSize, available: true }]
      }));
      setCurrentSize({ name: '', code: '' });
    }
  };

  const removeSize = (index) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const addMeasurement = () => {
    if (currentMeasurement.size) {
      setFormData(prev => ({
        ...prev,
        measurements: [...prev.measurements, { ...currentMeasurement }]
      }));
      setCurrentMeasurement({
        size: '',
        dimensions: { length: '', width: '', height: '', weight: '' }
      });
    }
  };

  const removeMeasurement = (index) => {
    setFormData(prev => ({
      ...prev,
      measurements: prev.measurements.filter((_, i) => i !== index)
    }));
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
    const langCode = currentLanguage.toLowerCase();
    setFormData(prev => ({
      ...prev,
      catalog: { 
        ...prev.catalog, 
        tags: {
          ...prev.catalog.tags,
          [langCode]: tags
        }
      }
    }));
  };

  const validateForm = () => {
    // Check if at least Serbian version is filled (as it's the default language)
    if (!formData.title.sr?.trim()) return 'Naziv proizvoda na srpskom je obavezan';
    if (!formData.description.sr?.trim()) return 'Opis proizvoda na srpskom je obavezan';
    if (!formData.catalog.catalogNumber.trim()) return 'Kataloski broj je obavezan';
    if (!formData.catalog.category.sr?.trim()) return 'Kategorija na srpskom je obavezna';
    if (!formData.price.amount || formData.price.amount <= 0) return 'Cena mora biti veća od 0';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const submitData = new FormData();
      
      // Add form data - now multilingual
      submitData.append('title', JSON.stringify(formData.title));
      submitData.append('description', JSON.stringify(formData.description));
      submitData.append('catalog', JSON.stringify(formData.catalog));
      submitData.append('colors', JSON.stringify(formData.colors));
      submitData.append('sizes', JSON.stringify(formData.sizes));
      submitData.append('price', JSON.stringify(formData.price));
      submitData.append('availability', JSON.stringify(formData.availability));
      submitData.append('measurements', JSON.stringify(formData.measurements));
      submitData.append('plastificationTypes', JSON.stringify(formData.plastificationTypes));
      
      // Debug logs
      console.log('FormData before sending:', {
        title: formData.title,
        description: formData.description,
        catalog: formData.catalog
      });
      console.log('Sending plastificationTypes:', formData.plastificationTypes);

      // Add images
      images.forEach((image) => {
        submitData.append('images', image);
      });

      const token = localStorage.getItem('adminToken');
      
      if (editingProduct) {
        await productService.updateProduct(editingProduct._id, submitData, token);
      } else {
        await productService.createProduct(submitData, token);
      }

      // Reset form
      resetForm();
      setActiveTab('list');
      fetchProducts();
      
    } catch (err) {
      setError(err.message || 'Greška pri snimavanju proizvoda');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: { sr: '', en: '', de: '' },
      description: { sr: '', en: '', de: '' },
      catalog: {
        catalogNumber: '',
        category: { sr: '', en: '', de: '' },
        subcategory: { sr: '', en: '', de: '' },
        tags: { sr: [], en: [], de: [] }
      },
      colors: [],
      sizes: [],
      price: {
        amount: '',
        currency: 'RSD'
      },
      availability: {
        inStock: true,
        quantity: 0
      },
      measurements: [],
      plastificationTypes: {
        sjajna: false,
        matt: false,
        strukturalna: false,
        showOnProduct: false
      }
    });
    setImages([]);
    setEditingProduct(null);
    setCurrentLanguage('SR');
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    
    // Helper function to ensure multilingual structure
    const ensureMultilingual = (field, fallback = '') => {
      if (typeof field === 'string') {
        return { sr: field, en: fallback, de: fallback };
      }
      return field || { sr: fallback, en: fallback, de: fallback };
    };
    
    const ensureMultilingualArray = (field) => {
      if (Array.isArray(field)) {
        return { sr: field, en: [], de: [] };
      }
      return field || { sr: [], en: [], de: [] };
    };
    
    setFormData({
      title: ensureMultilingual(product.title),
      description: ensureMultilingual(product.description),
      catalog: {
        catalogNumber: product.catalog?.catalogNumber || '',
        category: ensureMultilingual(product.catalog?.category),
        subcategory: ensureMultilingual(product.catalog?.subcategory),
        tags: ensureMultilingualArray(product.catalog?.tags)
      },
      colors: product.colors || [],
      sizes: product.sizes || [],
      price: product.price,
      availability: product.availability,
      measurements: product.measurements || [],
      plastificationTypes: product.plastificationTypes || {
        sjajna: false,
        matt: false,
        strukturalna: false,
        showOnProduct: false
      }
    });
    setActiveTab('add');
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await productService.deleteProduct(productId, token);
      fetchProducts();
    } catch (err) {
      setError('Greška pri brisanju proizvoda');
    }
  };

  const handleHideProduct = async (productId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await productService.hideProduct(productId, token);
      fetchProducts();
    } catch (err) {
      setError('Greška pri sakrivanju proizvoda');
    }
  };

  const handleShowProduct = async (productId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await productService.showProduct(productId, token);
      fetchProducts();
    } catch (err) {
      setError('Greška pri prikazivanju proizvoda');
    }
  };

  const handleCatalogUpload = async (productId, file) => {
    if (!file) return;

    console.log('Starting catalog upload:', { productId, fileName: file.name, fileType: file.type });
    
    setUploadingCatalog(productId);
    try {
      const token = localStorage.getItem('adminToken');
      const result = await productService.uploadCatalogPdf(productId, file, token);
      console.log('Upload successful:', result);
      fetchProducts();
    } catch (err) {
      console.error('Upload error:', err);
      setError('Greška pri otpremanju kataloga: ' + err.message);
    } finally {
      setUploadingCatalog(null);
    }
  };

  const handleCatalogDelete = async (productId) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete katalog?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await productService.deleteCatalogPdf(productId, token);
      fetchProducts();
    } catch (err) {
      setError('Greška pri brisanju kataloga');
    }
  };

  const handleTranslateProduct = async (productId) => {
    if (!window.confirm('Da li ste sigurni da želite da prevedete ovaj proizvod na engleski i nemački jezik pomoću AI?')) {
      return;
    }

    setTranslatingProducts(prev => new Set(prev.add(productId)));
    
    try {
      const token = localStorage.getItem('adminToken');
      await translationService.translateProduct(productId, ['en', 'de'], token);
      setError(null);
      alert('Proizvod je uspešno preveden!');
      fetchProducts(); // Refresh the list
    } catch (err) {
      console.error('Translation error:', err);
      setError('Greška pri prevođenju proizvoda: ' + err.message);
    } finally {
      setTranslatingProducts(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const handleImageColorAssociation = async (imageIndex, colorName) => {
    if (!editingProduct) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await productService.associateImageWithColor(
        editingProduct._id, 
        imageIndex, 
        colorName || null, 
        token
      );
      
      // Update the editing product with new data
      setEditingProduct(response.data);
      
      // Show success message (optional)
      console.log('Image-color association updated successfully');
    } catch (err) {
      setError('Greška pri vezivanju slike za boju: ' + err.message);
    }
  };

  const handleImageCategoryAssociation = async (imageIndex, category) => {
    if (!editingProduct) return;
    
    try {
      const token = localStorage.getItem('adminToken');
      const response = await productService.associateImageWithCategory(
        editingProduct._id, 
        imageIndex, 
        category || null, 
        token
      );
      
      // Update the editing product with new data
      setEditingProduct(response.data);
      
      // Show success message (optional)
      console.log('Image-category association updated successfully');
    } catch (err) {
      setError('Greška pri vezivanju slike za kategoriju: ' + err.message);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (e, index) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
    setDraggedIndex(index);
    
    // Add visual feedback to the dragged element
    setTimeout(() => {
      e.target.style.opacity = '0.5';
    }, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
  };

  const handleDrop = async (e, dropIndex) => {
    e.preventDefault();
    
    const draggedIndexFromData = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (draggedIndexFromData === dropIndex || draggedIndex === null) {
      setDraggedIndex(null);
      return;
    }

    try {
      setIsReordering(true);
      
      // Create new gallery array with reordered images
      const newGallery = [...editingProduct.gallery];
      const draggedImage = newGallery[draggedIndexFromData];
      
      // Remove dragged image
      newGallery.splice(draggedIndexFromData, 1);
      
      // Insert at new position
      newGallery.splice(dropIndex, 0, draggedImage);
      
      // Update local state immediately for visual feedback
      setEditingProduct(prev => ({
        ...prev,
        gallery: newGallery
      }));

      // Save new order to backend
      const token = localStorage.getItem('adminToken');
      const response = await productService.reorderGalleryImages(
        editingProduct._id,
        newGallery.map((img, idx) => ({ 
          imageUrl: img.url, 
          newPosition: idx,
          colorAssociation: img.colorAssociation 
        })),
        token
      );

      // Update with response from server to ensure consistency
      if (response.success) {
        setEditingProduct(response.data);
        console.log('Image order updated successfully');
      }
      
    } catch (err) {
      setError('Greška pri ažuriranju redosleda slika: ' + err.message);
      // Revert local changes on error
      fetchProducts();
    } finally {
      setIsReordering(false);
      setDraggedIndex(null);
    }
  };

  const handleDragEnd = (e) => {
    // Reset visual feedback
    e.target.style.opacity = '1';
    setDraggedIndex(null);
  };

  const handleDeleteImage = async (imageIndex) => {
    if (!editingProduct || !window.confirm('Da li ste sigurni da želite da obrišete ovu sliku?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await productService.deleteImage(editingProduct._id, imageIndex, token);
      
      // Update local state
      const updatedGallery = [...editingProduct.gallery];
      updatedGallery.splice(imageIndex, 1);
      
      setEditingProduct(prev => ({
        ...prev,
        gallery: updatedGallery
      }));

      console.log('Image deleted successfully');
    } catch (err) {
      setError('Greška pri brisanju slike: ' + err.message);
    }
  };

  return (
    <div className="product-manager">
      <div className="product-manager-content">
        <div className="product-manager-header">
        <h2>Upravljanje aluminijumskim sistemima</h2>
        <button className="close-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

      <div className="product-manager-tabs">
        <button 
          className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
          onClick={() => { setActiveTab('list'); resetForm(); }}
        >
          Lista sistema
        </button>
        <button 
          className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => { setActiveTab('add'); resetForm(); }}
        >
          {editingProduct ? 'Uredi sistem' : 'Dodaj novi sistem'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {error}
        </div>
      )}

      {activeTab === 'list' && (
        <div className="products-list">
          {/* Filter Toggle */}
          <div className="products-list-controls">
            <label className="show-hidden-toggle">
              <input
                type="checkbox"
                checked={showHidden}
                onChange={(e) => setShowHidden(e.target.checked)}
              />
              Prikaži sakrivene proizvode
            </label>
          </div>

          {loading ? (
            <div className="loading-state">Učitavanje...</div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <div key={product._id} className={`product-item ${product.isHidden ? 'hidden-product' : ''}`}>
                  <div className="product-image">
                    <img 
                      src={product.gallery?.[0]?.url || '/images/placeholder/product-placeholder.jpg'} 
                      alt={safeRender(product.title, 'SR')}
                    />
                    {product.isHidden && (
                      <div className="hidden-overlay">
                        <span>SAKRIVENO</span>
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <h4>{safeRender(product.title, 'SR')}</h4>
                    <p>{safeRender(product.catalog?.category, 'SR')}</p>
                    <p>Br: {product.catalog.catalogNumber}</p>
                    <div className="product-status">
                      {product.isHidden ? (
                        <span className="status-hidden">Sakriveno sa sajta</span>
                      ) : (
                        <span className="status-visible">Prikazano na sajtu</span>
                      )}
                    </div>
                  </div>

                  {/* Catalog Management */}
                  <div className="catalog-management">
                    <div className="catalog-status">
                      {product.catalogPdf?.publicId ? (
                        <div className="catalog-exists">
                          <span>📋 Katalog: {product.catalogPdf.filename}</span>
                          <div className="catalog-actions">
                            <a 
                              href={`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/products/${product._id}/catalog/download`}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="view-catalog-btn"
                            >
                              Prikaži
                            </a>
                            <button 
                              onClick={() => handleCatalogDelete(product._id)}
                              className="delete-catalog-btn"
                            >
                              Obriši
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="catalog-upload">
                          <span>📋 Nema kataloga</span>
                          <p className="catalog-size-limit">Max veličina: 10MB</p>
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                const file = e.target.files[0];
                                const fileSizeMB = file.size / (1024 * 1024);
                                if (fileSizeMB > 10) {
                                  alert(`PDF fajl je prevelik (${fileSizeMB.toFixed(2)} MB). Maksimalna veličina je 10MB. Molimo kompresujte PDF pre otpreme.`);
                                  e.target.value = ''; // Reset file input
                                  return;
                                }
                                handleCatalogUpload(product._id, file);
                              }
                            }}
                            disabled={uploadingCatalog === product._id}
                            id={`catalog-${product._id}`}
                            style={{ display: 'none' }}
                          />
                          <label 
                            htmlFor={`catalog-${product._id}`}
                            className={`upload-catalog-btn ${uploadingCatalog === product._id ? 'uploading' : ''}`}
                          >
                            {uploadingCatalog === product._id ? 'Otprema...' : 'Otpremi PDF'}
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="product-actions">
                    <button onClick={() => handleEdit(product)} className="edit-btn">
                      Uredi
                    </button>
                    
                    <button 
                      onClick={() => handleTranslateProduct(product._id)} 
                      className="translate-btn"
                      disabled={translatingProducts.has(product._id)}
                      title="Prevedi na drugi jezici pomoću AI"
                    >
                      {translatingProducts.has(product._id) ? (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="spinning">
                            <path d="M12 2V6M12 18V22M4.93 4.93L7.76 7.76M16.24 16.24L19.07 19.07M2 12H6M18 12H22M4.93 19.07L7.76 16.24M16.24 7.76L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                          Prevodi...
                        </>
                      ) : (
                        <>
                          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 8L3 6L5 4M9 20L7 18L9 16M15 4L17 6L15 8M19 16L21 18L19 20M2 12H8M16 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          AI prevod
                        </>
                      )}
                    </button>
                    
                    {product.isHidden ? (
                      <button 
                        onClick={() => handleShowProduct(product._id)} 
                        className="show-btn"
                      >
                        Vrati
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleHideProduct(product._id)} 
                        className="hide-btn"
                      >
                        Sakrij
                      </button>
                    )}
                    
                    <button onClick={() => handleDelete(product._id)} className="delete-btn">
                      Obriši
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'add' && (
        <form className="product-form" onSubmit={handleSubmit}>
          {/* Language Switcher */}
          <div className="language-switcher" style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: '5px' }}>
            <label style={{ marginRight: '10px', fontWeight: 'bold' }}>Jezik editovanja:</label>
            <button 
              type="button" 
              className={currentLanguage === 'SR' ? 'active' : ''}
              onClick={() => setCurrentLanguage('SR')}
              style={{ 
                margin: '0 5px', 
                padding: '5px 10px', 
                backgroundColor: currentLanguage === 'SR' ? '#007bff' : '#fff',
                color: currentLanguage === 'SR' ? '#fff' : '#000',
                border: '1px solid #007bff',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Srpski
            </button>
            <button 
              type="button" 
              className={currentLanguage === 'EN' ? 'active' : ''}
              onClick={() => setCurrentLanguage('EN')}
              style={{ 
                margin: '0 5px', 
                padding: '5px 10px', 
                backgroundColor: currentLanguage === 'EN' ? '#007bff' : '#fff',
                color: currentLanguage === 'EN' ? '#fff' : '#000',
                border: '1px solid #007bff',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Engleski
            </button>
            <button 
              type="button" 
              className={currentLanguage === 'DE' ? 'active' : ''}
              onClick={() => setCurrentLanguage('DE')}
              style={{ 
                margin: '0 5px', 
                padding: '5px 10px', 
                backgroundColor: currentLanguage === 'DE' ? '#007bff' : '#fff',
                color: currentLanguage === 'DE' ? '#fff' : '#000',
                border: '1px solid #007bff',
                borderRadius: '3px',
                cursor: 'pointer'
              }}
            >
              Nemački
            </button>
          </div>

          {/* Basic Info */}
          <div className="form-section">
            <h3>Osnovne informacije</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Naziv sistema *</label>
                <input
                  type="text"
                  value={formData.title[currentLanguage.toLowerCase()] || ''}
                  onChange={(e) => handleMultilingualInputChange('title', e.target.value)}
                  placeholder={`Unesite naziv na ${currentLanguage === 'SR' ? 'srpskom' : currentLanguage === 'EN' ? 'engleskom' : 'nemačkom'} jeziku`}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Kataloski broj *</label>
                <input
                  type="text"
                  value={formData.catalog.catalogNumber}
                  onChange={(e) => handleInputChange('catalog.catalogNumber', e.target.value)}
                  placeholder="Npr. ALU-001"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Kategorija *</label>
                <select
                  value={formData.catalog.category[currentLanguage.toLowerCase()] || ''}
                  onChange={(e) => handleMultilingualInputChange('catalog.category', e.target.value)}
                  required
                >
                  <option value="">Izaberite kategoriju</option>
                  {categoryOptions.map((cat, index) => (
                    <option key={`category-${index}`} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Potkategorija</label>
                <input
                  type="text"
                  value={formData.catalog.subcategory[currentLanguage.toLowerCase()] || ''}
                  onChange={(e) => handleMultilingualInputChange('catalog.subcategory', e.target.value)}
                  placeholder="Opciono"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Opis sistema *</label>
              <textarea
                value={formData.description[currentLanguage.toLowerCase()] || ''}
                onChange={(e) => handleMultilingualInputChange('description', e.target.value)}
                placeholder={`Detaljni opis na ${currentLanguage === 'SR' ? 'srpskom' : currentLanguage === 'EN' ? 'engleskom' : 'nemačkom'} jeziku...`}
                rows="4"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Tagovi (odvojeni zarezom)</label>
              <input
                type="text"
                value={formData.catalog.tags[currentLanguage.toLowerCase()]?.join(', ') || ''}
                onChange={handleTagsChange}
                placeholder="aluminum, prozor, modern"
              />
            </div>
          </div>

          {/* Images */}
          <div className="form-section">
            <h3>Slike sistema</h3>
            <div className="form-group">
              <label>Upload slike</label>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
              <p className="form-help">Izaberite više slika (prva će biti glavna)</p>
            </div>

            {/* Show existing images with drag & drop reordering and color association */}
            {editingProduct && editingProduct.gallery && editingProduct.gallery.length > 0 && (
              <div className="existing-images">
                <h4>Postojeće slike</h4>
                <p className="reorder-instruction">
                  Prevucite slike da promenite redosled prikazivanja u galeriji
                </p>
                <div className={`images-grid-sortable ${isReordering ? 'loading' : ''}`}>
                  {editingProduct.gallery.map((image, index) => (
                    <div 
                      key={`image-${index}`}
                      className={`image-item-sortable ${draggedIndex === index ? 'dragging' : ''} ${isReordering ? 'reordering' : ''}`}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragOver={handleDragOver}
                      onDragEnter={handleDragEnter}
                      onDrop={(e) => handleDrop(e, index)}
                      onDragEnd={handleDragEnd}
                    >
                      <div className="drag-handle">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M8 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M8 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M3 6H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M3 12H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M3 18H3.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="image-preview">
                        <img src={image.url} alt={image.alt || 'Product image'} />
                        <div className="image-position">#{index + 1}</div>
                      </div>
                      <div className="image-controls">
                        <div className="category-association">
                          <label>Kategorija:</label>
                          <select
                            value={image.categoryAssociation || 'Aloksaza'}
                            onChange={(e) => handleImageCategoryAssociation(index, e.target.value)}
                            className="category-select"
                          >
                            <option value="Aloksaza">Aloksaza</option>
                            <option value="Plastifikacija">Plastifikacija</option>
                            <option value="">Generička (za sve)</option>
                          </select>
                        </div>
                        <div className="color-association">
                          <label>Vezuj za boju:</label>
                          <select
                            value={image.colorAssociation || ''}
                            onChange={(e) => handleImageColorAssociation(index, e.target.value)}
                            className="color-select"
                          >
                            <option value="">Generička slika</option>
                            {formData.colors
                              .filter(color => !image.categoryAssociation || color.category === image.categoryAssociation)
                              .map((color, index) => (
                              <option key={`color-${index}-${color.name}`} value={safeRender(color.name, 'SR')}>
                                {safeRender(color.name, 'SR')} ({color.category})
                              </option>
                            ))}
                          </select>
                        </div>
                        <button
                          type="button"
                          className="delete-image-btn"
                          onClick={() => handleDeleteImage(index)}
                          title="Obriši sliku"
                        >
                          🗑️
                        </button>
                      </div>
                      {image.colorAssociation && (
                        <div className="color-indicator">
                          <span 
                            className="color-dot"
                            style={{ 
                              backgroundColor: formData.colors.find(c => safeRender(c.name, 'SR') === image.colorAssociation)?.hexCode || '#000' 
                            }}
                          ></span>
                          <span>{safeRender(image.colorAssociation, 'SR')}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="form-section">
            <h3>Dostupne boje</h3>
            <div className="color-input-group">
              <input
                type="text"
                placeholder="Naziv boje"
                value={currentColor.name}
                onChange={(e) => setCurrentColor(prev => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="color"
                value={currentColor.hexCode}
                onChange={(e) => setCurrentColor(prev => ({ ...prev, hexCode: e.target.value }))}
              />
              <select
                value={currentColor.category}
                onChange={(e) => setCurrentColor(prev => ({ ...prev, category: e.target.value }))}
              >
                <option value="Aloksaza">Aloksaza</option>
                <option value="Plastifikacija">Plastifikacija</option>
              </select>
              <button type="button" onClick={addColor} className="add-btn">Dodaj</button>
            </div>
            
            {/* Display colors by category */}
            <div className="colors-by-category">
              <div className="color-category">
                <h4>Aloksaza boje</h4>
                <div className="added-items">
                  {formData.colors.filter(color => color.category === 'Aloksaza').map((color, index) => {
                    const originalIndex = formData.colors.findIndex(c => c === color);
                    return (
                      <div key={originalIndex} className="color-item">
                        <span 
                          className="color-preview" 
                          style={{ backgroundColor: color.hexCode }}
                        ></span>
                        <span>{safeRender(color.name, 'SR')}</span>
                        <span className="color-category-badge">Aloksaza</span>
                        <button type="button" onClick={() => removeColor(originalIndex)} className="remove-btn">×</button>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="color-category">
                <h4>Plastifikacija boje</h4>
                <div className="added-items">
                  {formData.colors.filter(color => color.category === 'Plastifikacija').map((color, index) => {
                    const originalIndex = formData.colors.findIndex(c => c === color);
                    return (
                      <div key={originalIndex} className="color-item">
                        <span 
                          className="color-preview" 
                          style={{ backgroundColor: color.hexCode }}
                        ></span>
                        <span>{safeRender(color.name, 'SR')}</span>
                        <span className="color-category-badge">Plastifikacija</span>
                        <button type="button" onClick={() => removeColor(originalIndex)} className="remove-btn">×</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Plastification Types */}
          <div className="form-section">
            <h3>Završna obrada plastifikacije</h3>
            <div className="plastification-options">
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.plastificationTypes.sjajna}
                    onChange={(e) => handleInputChange('plastificationTypes.sjajna', e.target.checked)}
                  />
                  Sjajna
                </label>
              </div>
              
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.plastificationTypes.matt}
                    onChange={(e) => handleInputChange('plastificationTypes.matt', e.target.checked)}
                  />
                  Matt
                </label>
              </div>
              
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.plastificationTypes.strukturalna}
                    onChange={(e) => handleInputChange('plastificationTypes.strukturalna', e.target.checked)}
                  />
                  Strukturalna
                </label>
              </div>
              
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.plastificationTypes.showOnProduct}
                    onChange={(e) => handleInputChange('plastificationTypes.showOnProduct', e.target.checked)}
                  />
                  Prikaži na stranici proizvoda
                </label>
              </div>
            </div>
          </div>

          {/* Sizes */}
          <div className="form-section">
            <h3>Dostupne veličine</h3>
            <div className="size-input-group">
              <input
                type="text"
                placeholder="Naziv veličine"
                value={currentSize.name}
                onChange={(e) => setCurrentSize(prev => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="text"
                placeholder="Kod"
                value={currentSize.code}
                onChange={(e) => setCurrentSize(prev => ({ ...prev, code: e.target.value }))}
              />
              <button type="button" onClick={addSize} className="add-btn">Dodaj</button>
            </div>
            
            <div className="added-items">
              {formData.sizes.map((size, index) => (
                <div key={index} className="size-item">
                  <span>{safeRender(size.name, 'SR')} ({size.code})</span>
                  <button type="button" onClick={() => removeSize(index)} className="remove-btn">×</button>
                </div>
              ))}
            </div>
          </div>

          {/* Price and Availability */}
          <div className="form-section">
            <h3>Cena i dostupnost</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Cena *</label>
                <input
                  type="number"
                  value={formData.price.amount}
                  onChange={(e) => handleInputChange('price.amount', e.target.value)}
                  placeholder="0"
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Valuta</label>
                <select
                  value={formData.price.currency}
                  onChange={(e) => handleInputChange('price.currency', e.target.value)}
                >
                  <option value="RSD">RSD</option>
                  <option value="EUR">EUR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              
              <div className="form-group">
                <label>Količina na stanju</label>
                <input
                  type="number"
                  value={formData.availability.quantity}
                  onChange={(e) => handleInputChange('availability.quantity', e.target.value)}
                  placeholder="0"
                  min="0"
                />
              </div>
              
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.availability.inStock}
                    onChange={(e) => handleInputChange('availability.inStock', e.target.checked)}
                  />
                  Dostupno na stanju
                </label>
              </div>
            </div>
          </div>

          {/* Measurements */}
          <div className="form-section">
            <h3>Mere i dimenzije</h3>
            <div className="measurement-input-group">
              <input
                type="text"
                placeholder="Veličina (npr. Standard, Large)"
                value={currentMeasurement.size}
                onChange={(e) => setCurrentMeasurement(prev => ({ ...prev, size: e.target.value }))}
              />
              <input
                type="number"
                placeholder="Dužina (mm)"
                value={currentMeasurement.dimensions.length}
                onChange={(e) => setCurrentMeasurement(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, length: e.target.value }
                }))}
              />
              <input
                type="number"
                placeholder="Širina (mm)"
                value={currentMeasurement.dimensions.width}
                onChange={(e) => setCurrentMeasurement(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, width: e.target.value }
                }))}
              />
              <input
                type="number"
                placeholder="Visina (mm)"
                value={currentMeasurement.dimensions.height}
                onChange={(e) => setCurrentMeasurement(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, height: e.target.value }
                }))}
              />
              <input
                type="number"
                placeholder="Težina (kg)"
                value={currentMeasurement.dimensions.weight}
                onChange={(e) => setCurrentMeasurement(prev => ({ 
                  ...prev, 
                  dimensions: { ...prev.dimensions, weight: e.target.value }
                }))}
              />
              <button type="button" onClick={addMeasurement} className="add-btn">Dodaj</button>
            </div>
            
            <div className="added-items">
              {formData.measurements.map((measurement, index) => (
                <div key={index} className="measurement-item">
                  <span>
                    {safeRender(measurement.size, 'SR')}: {measurement.dimensions.length}×{measurement.dimensions.width}×{measurement.dimensions.height}mm 
                    {measurement.dimensions.weight && `, ${measurement.dimensions.weight}kg`}
                  </span>
                  <button type="button" onClick={() => removeMeasurement(index)} className="remove-btn">×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" onClick={() => { setActiveTab('list'); resetForm(); }} className="cancel-btn">
              Otkaži
            </button>
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Snimanje...' : (editingProduct ? 'Ažuriraj sistem' : 'Dodaj sistem')}
            </button>
          </div>
        </form>
      )}
      </div>
    </div>
  );
};

export default ProductManager;