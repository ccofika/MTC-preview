import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { homepageSettingsService } from '../services/homepageSettingsService';
import './FeaturedProductsManager.css';

const FeaturedProductsManager = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('adminToken');
      
      // Fetch all products and current featured products
      const [productsResponse, settingsResponse] = await Promise.all([
        productService.getProducts({ limit: 100 }, token),
        homepageSettingsService.getHomepageSettings(token)
      ]);

      if (productsResponse.success && productsResponse.data.products) {
        setProducts(productsResponse.data.products.filter(p => p.isActive));
      }

      if (settingsResponse.success && settingsResponse.data.featuredProducts) {
        // Transform backend data structure to frontend structure
        const transformedFeaturedProducts = settingsResponse.data.featuredProducts.map(fp => ({
          productId: fp.productId._id || fp.productId, // Handle both populated and unpopulated
          order: fp.order,
          _product: fp.productId._id ? fp.productId : null // Store product data if populated
        }));
        setFeaturedProducts(transformedFeaturedProducts);
      }
    } catch (err) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = (product) => {
    if (featuredProducts.length >= 4) {
      setError('Maksimalno 4 proizvoda mogu biti istaknuta');
      return;
    }

    // Check if product is already featured
    if (featuredProducts.some(fp => fp.productId.toString() === product._id.toString())) {
      setError('Proizvod je već istaknut');
      return;
    }

    // Find next available order
    const orders = featuredProducts.map(fp => fp.order).sort((a, b) => a - b);
    let nextOrder = 1;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i] !== nextOrder) break;
      nextOrder++;
    }

    const newFeaturedProduct = {
      productId: product._id,
      order: nextOrder,
      // Add product data for display
      _product: product
    };

    setFeaturedProducts([...featuredProducts, newFeaturedProduct]);
    setError(null);
  };

  const handleRemoveProduct = (productId) => {
    setFeaturedProducts(featuredProducts.filter(fp => fp.productId.toString() !== productId.toString()));
    setError(null);
  };

  const handleOrderChange = (productId, newOrder) => {
    const orderNum = parseInt(newOrder);
    if (orderNum < 1 || orderNum > 4) return;

    setFeaturedProducts(featuredProducts.map(fp => {
      if (fp.productId.toString() === productId.toString()) {
        return { ...fp, order: orderNum };
      }
      return fp;
    }));
    setError(null);
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('adminToken');
      
      // Validate unique orders
      const orders = featuredProducts.map(fp => fp.order);
      const uniqueOrders = [...new Set(orders)];
      if (orders.length !== uniqueOrders.length) {
        throw new Error('Redni brojevi moraju biti jedinstveni');
      }

      // Prepare data for API
      const featuredProductsData = featuredProducts.map(fp => ({
        productId: fp.productId,
        order: fp.order
      }));

      const response = await homepageSettingsService.updateFeaturedProducts(
        featuredProductsData, 
        token
      );

      if (response.success) {
        setSuccess('Istaknuti proizvodi su uspešno ažurirani!');
        // Update local state with response data to avoid refetch issues
        if (response.data && response.data.featuredProducts) {
          const transformedFeaturedProducts = response.data.featuredProducts.map(fp => ({
            productId: fp.productId._id || fp.productId,
            order: fp.order,
            _product: fp.productId._id ? fp.productId : null
          }));
          setFeaturedProducts(transformedFeaturedProducts);
        }
        
        // Auto-close success message after 3 seconds
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to save featured products');
    } finally {
      setSaving(false);
    }
  };

  const handleClear = async () => {
    if (!window.confirm('Da li ste sigurni da želite da uklonite sve istaknute proizvode?')) {
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await homepageSettingsService.clearFeaturedProducts(token);
      
      if (response.success) {
        setFeaturedProducts([]);
        setSuccess('Svi istaknuti proizvodi su uklonjeni!');
        
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      }
    } catch (err) {
      setError(err.message || 'Failed to clear featured products');
    } finally {
      setSaving(false);
    }
  };

  const getProductById = (productId) => {
    return products.find(p => p._id.toString() === productId.toString());
  };

  if (loading) {
    return (
      <div className="featured-products-manager-overlay">
        <div className="featured-products-manager">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Učitavanje...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-products-manager-overlay">
      <div className="featured-products-manager">
        <div className="manager-header">
          <h2>Upravljanje istaknutim proizvodima</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="manager-content">
          {/* Current Featured Products */}
          <div className="featured-section">
            <h3>Istaknuti proizvodi ({featuredProducts.length}/4)</h3>
            
            {featuredProducts.length === 0 ? (
              <p className="no-featured">Nema istaknutih proizvoda</p>
            ) : (
              <div className="featured-list">
                {featuredProducts
                  .sort((a, b) => a.order - b.order)
                  .map((fp) => {
                    const product = fp._product || getProductById(fp.productId);
                    return (
                      <div key={fp.productId} className="featured-item">
                        <div className="featured-info">
                          <img 
                            src={product?.gallery?.[0]?.url || '/images/placeholder/product-placeholder.jpg'} 
                            alt={product?.title || 'Product'} 
                            className="featured-image"
                          />
                          <div className="featured-details">
                            <h4>{product?.title || 'Nepoznat proizvod'}</h4>
                            <p>{product?.category || 'Nepoznata kategorija'}</p>
                          </div>
                        </div>
                        
                        <div className="featured-controls">
                          <label>
                            Redosled:
                            <select 
                              value={fp.order} 
                              onChange={(e) => handleOrderChange(fp.productId, e.target.value)}
                              disabled={saving}
                            >
                              <option value={1}>1</option>
                              <option value={2}>2</option>
                              <option value={3}>3</option>
                              <option value={4}>4</option>
                            </select>
                          </label>
                          
                          <button 
                            className="remove-btn"
                            onClick={() => handleRemoveProduct(fp.productId)}
                            disabled={saving}
                          >
                            Ukloni
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>

          {/* Available Products */}
          {featuredProducts.length < 4 && (
            <div className="available-section">
              <h3>Dostupni proizvodi</h3>
              <div className="products-grid">
                {products
                  .filter(product => !featuredProducts.some(fp => fp.productId.toString() === product._id.toString()))
                  .map(product => (
                    <div key={product._id} className="product-item">
                      <img 
                        src={product.gallery?.[0]?.url || '/images/placeholder/product-placeholder.jpg'} 
                        alt={product.title} 
                        className="product-image"
                      />
                      <div className="product-info">
                        <h4>{product.title}</h4>
                        <p>{product.category}</p>
                        <button 
                          className="add-btn"
                          onClick={() => handleAddProduct(product)}
                          disabled={saving}
                        >
                          Dodaj
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        <div className="manager-actions">
          <button 
            className="clear-btn"
            onClick={handleClear}
            disabled={saving || featuredProducts.length === 0}
          >
            Obriši sve
          </button>
          
          <div className="main-actions">
            <button className="cancel-btn" onClick={onClose} disabled={saving}>
              Odustani
            </button>
            <button 
              className="save-btn" 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Čuvanje...' : 'Sačuvaj'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsManager;