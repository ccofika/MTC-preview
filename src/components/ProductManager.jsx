import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import './ProductManager.css';

const ProductManager = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'edit'
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

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
  }, [activeTab]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getProducts({ limit: 50 });
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
          {loading ? (
            <div className="loading-state">Učitavanje...</div>
          ) : (
            <div className="products-grid">
              {products.map(product => (
                <div key={product._id} className="product-item">
                  <div className="product-image">
                    <img 
                      src={product.gallery?.[0]?.url || '/images/placeholder/product-placeholder.jpg'} 
                      alt={product.title}
                    />
                  </div>
                  <div className="product-info">
                    <h4>{product.title}</h4>
                    <p>{product.catalog.category}</p>
                    <p>Br: {product.catalog.catalogNumber}</p>
                    <p>{product.price.amount} {product.price.currency}</p>
                  </div>
                  <div className="product-actions">
                    <button onClick={() => handleEdit(product)} className="edit-btn">
                      Uredi
                    </button>
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