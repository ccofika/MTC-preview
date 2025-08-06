import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
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

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    catalog: {
      catalogNumber: '',
      category: '',
      subcategory: '',
      tags: []
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
    measurements: []
  });

  const [images, setImages] = useState([]);
  const [currentColor, setCurrentColor] = useState({ name: '', hexCode: '#000000' });
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
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const addColor = () => {
    if (currentColor.name && currentColor.hexCode) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, { ...currentColor, available: true }]
      }));
      setCurrentColor({ name: '', hexCode: '#000000' });
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
    setFormData(prev => ({
      ...prev,
      catalog: { ...prev.catalog, tags }
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Naziv proizvoda je obavezan';
    if (!formData.description.trim()) return 'Opis proizvoda je obavezan';
    if (!formData.catalog.catalogNumber.trim()) return 'Kataloski broj je obavezan';
    if (!formData.catalog.category.trim()) return 'Kategorija je obavezna';
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
      
      // Add form data
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('catalog', JSON.stringify(formData.catalog));
      submitData.append('colors', JSON.stringify(formData.colors));
      submitData.append('sizes', JSON.stringify(formData.sizes));
      submitData.append('price', JSON.stringify(formData.price));
      submitData.append('availability', JSON.stringify(formData.availability));
      submitData.append('measurements', JSON.stringify(formData.measurements));

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
      title: '',
      description: '',
      catalog: {
        catalogNumber: '',
        category: '',
        subcategory: '',
        tags: []
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
      measurements: []
    });
    setImages([]);
    setEditingProduct(null);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      title: product.title,
      description: product.description,
      catalog: product.catalog,
      colors: product.colors || [],
      sizes: product.sizes || [],
      price: product.price,
      availability: product.availability,
      measurements: product.measurements || []
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
                      alt={product.title}
                    />
                    {product.isHidden && (
                      <div className="hidden-overlay">
                        <span>SAKRIVENO</span>
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <h4>{product.title}</h4>
                    <p>{product.catalog.category}</p>
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
                          <input
                            type="file"
                            accept=".pdf"
                            onChange={(e) => {
                              if (e.target.files[0]) {
                                handleCatalogUpload(product._id, e.target.files[0]);
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
          {/* Basic Info */}
          <div className="form-section">
            <h3>Osnovne informacije</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Naziv sistema *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Unesite naziv aluminijumskog sistema"
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
                  value={formData.catalog.category}
                  onChange={(e) => handleInputChange('catalog.category', e.target.value)}
                  required
                >
                  <option value="">Izaberite kategoriju</option>
                  {categoryOptions.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Potkategorija</label>
                <input
                  type="text"
                  value={formData.catalog.subcategory}
                  onChange={(e) => handleInputChange('catalog.subcategory', e.target.value)}
                  placeholder="Opciono"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label>Opis sistema *</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Detaljni opis aluminijumskog sistema..."
                rows="4"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Tagovi (odvojeni zarezom)</label>
              <input
                type="text"
                value={formData.catalog.tags.join(', ')}
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
                        <label>Vezuj za boju:</label>
                        <select
                          value={image.colorAssociation || ''}
                          onChange={(e) => handleImageColorAssociation(index, e.target.value)}
                          className="color-select"
                        >
                          <option value="">Generička slika</option>
                          {formData.colors.map(color => (
                            <option key={color.name} value={color.name}>
                              {color.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {image.colorAssociation && (
                        <div className="color-indicator">
                          <span 
                            className="color-dot"
                            style={{ 
                              backgroundColor: formData.colors.find(c => c.name === image.colorAssociation)?.hexCode || '#000' 
                            }}
                          ></span>
                          <span>{image.colorAssociation}</span>
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
              <button type="button" onClick={addColor} className="add-btn">Dodaj</button>
            </div>
            
            <div className="added-items">
              {formData.colors.map((color, index) => (
                <div key={index} className="color-item">
                  <span 
                    className="color-preview" 
                    style={{ backgroundColor: color.hexCode }}
                  ></span>
                  <span>{color.name}</span>
                  <button type="button" onClick={() => removeColor(index)} className="remove-btn">×</button>
                </div>
              ))}
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
                  <span>{size.name} ({size.code})</span>
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
                    {measurement.size}: {measurement.dimensions.length}×{measurement.dimensions.width}×{measurement.dimensions.height}mm 
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