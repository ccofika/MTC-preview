import React, { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';
import { translationService } from '../services/translationService';
import { getLocalizedContent } from '../utils/multilingual';
import './ProjectManager.css';

const ProjectManager = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'edit'
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [translatingProjects, setTranslatingProjects] = useState(new Set());
  const [currentLanguage, setCurrentLanguage] = useState('SR'); // SR, EN, DE

  // Form state - now multilingual
  const [formData, setFormData] = useState({
    title: { sr: '', en: '', de: '' },
    description: { sr: '', en: '', de: '' },
    client: { sr: '', en: '', de: '' },
    location: { sr: '', en: '', de: '' },
    completionDate: '',
    category: { sr: '', en: '', de: '' },
    tags: { sr: [], en: [], de: [] },
    featured: false
  });

  const [images, setImages] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  // Categories dropdown options
  const categoryOptions = [
    'Stambeni',
    'Komercijalni', 
    'Industrijski',
    'Javni',
    'Hotelski',
    'Uredski',
    'Sportski',
    'Zdravstveni'
  ];

  useEffect(() => {
    if (activeTab === 'list') {
      fetchProjects();
    }
  }, [activeTab]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const response = await projectService.getProjects({ limit: 50 });
      setProjects(response.data.projects || []);
    } catch (err) {
      setError('Greška pri učitavanju projekata');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // New multilingual input handler
  const handleMultilingualInputChange = (field, value, language = currentLanguage) => {
    const langCode = language.toLowerCase();
    
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev[field],
        [langCode]: value
      }
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const addTag = () => {
    const langCode = currentLanguage.toLowerCase();
    const currentTags = formData.tags[langCode] || [];
    
    if (currentTag.trim() && !currentTags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: {
          ...prev.tags,
          [langCode]: [...currentTags, currentTag.trim()]
        }
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    const langCode = currentLanguage.toLowerCase();
    const currentTags = formData.tags[langCode] || [];
    
    setFormData(prev => ({
      ...prev,
      tags: {
        ...prev.tags,
        [langCode]: currentTags.filter(tag => tag !== tagToRemove)
      }
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const validateForm = () => {
    // Check if at least Serbian version is filled (as it's the default language)
    if (!formData.title.sr?.trim()) return 'Naziv projekta na srpskom je obavezan';
    if (!formData.description.sr?.trim()) return 'Opis projekta na srpskom je obavezan';
    if (!formData.category.sr?.trim()) return 'Kategorija na srpskom je obavezna';
    if (!formData.completionDate) return 'Datum realizacije je obavezan';
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
      submitData.append('client', JSON.stringify(formData.client));
      submitData.append('location', JSON.stringify(formData.location));
      submitData.append('completionDate', formData.completionDate);
      submitData.append('category', JSON.stringify(formData.category));
      submitData.append('tags', JSON.stringify(formData.tags));
      submitData.append('featured', formData.featured);

      // Add images
      images.forEach((image) => {
        submitData.append('images', image);
      });

      const token = localStorage.getItem('adminToken');
      
      if (editingProject) {
        await projectService.updateProject(editingProject._id, submitData, token);
      } else {
        await projectService.createProject(submitData, token);
      }

      // Reset form
      resetForm();
      setActiveTab('list');
      fetchProjects();
      
    } catch (err) {
      setError(err.message || 'Greška pri snimavanju projekta');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: { sr: '', en: '', de: '' },
      description: { sr: '', en: '', de: '' },
      client: { sr: '', en: '', de: '' },
      location: { sr: '', en: '', de: '' },
      completionDate: '',
      category: { sr: '', en: '', de: '' },
      tags: { sr: [], en: [], de: [] },
      featured: false
    });
    setImages([]);
    setEditingProject(null);
    setCurrentLanguage('SR');
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    
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
      title: ensureMultilingual(project.title),
      description: ensureMultilingual(project.description),
      client: ensureMultilingual(project.client),
      location: ensureMultilingual(project.location),
      completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : '',
      category: ensureMultilingual(project.category),
      tags: ensureMultilingualArray(project.tags),
      featured: project.featured || false
    });
    setActiveTab('add');
  };

  const handleDelete = async (projectId) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete ovaj projekat?')) {
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      await projectService.deleteProject(projectId, token);
      fetchProjects();
    } catch (err) {
      setError('Greška pri brisanju projekta');
    }
  };

  const handleTranslateProject = async (projectId) => {
    if (!window.confirm('Da li ste sigurni da želite da prevedete ovaj projekat na engleski i nemački jezik pomoću AI?')) {
      return;
    }

    setTranslatingProjects(prev => new Set(prev.add(projectId)));
    
    try {
      const token = localStorage.getItem('adminToken');
      await translationService.translateProject(projectId, ['en', 'de'], token);
      setError(null);
      alert('Projekat je uspešno preveden!');
      fetchProjects(); // Refresh the list
    } catch (err) {
      console.error('Translation error:', err);
      setError('Greška pri prevođenju projekta: ' + err.message);
    } finally {
      setTranslatingProjects(prev => {
        const newSet = new Set(prev);
        newSet.delete(projectId);
        return newSet;
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('sr-RS');
  };

  return (
    <div className="project-manager">
      <div className="project-manager-content">
        <div className="project-manager-header">
          <h2>Upravljanje projektima</h2>
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="project-manager-tabs">
          <button 
            className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => { setActiveTab('list'); resetForm(); }}
          >
            Lista projekata
          </button>
          <button 
            className={`tab-btn ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => { setActiveTab('add'); resetForm(); }}
          >
            {editingProject ? 'Uredi projekat' : 'Dodaj novi projekat'}
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
          <div className="projects-list">
            {loading ? (
              <div className="loading-state">Učitavanje...</div>
            ) : (
              <div className="projects-grid">
                {projects.map(project => (
                  <div key={project._id} className="project-item">
                    <div className="project-image">
                      <img 
                        src={project.gallery?.[0]?.url || '/images/placeholder/project-placeholder.jpg'} 
                        alt={getLocalizedContent(project.title, 'SR')}
                      />
                      {project.featured && (
                        <div className="featured-badge">
                          <svg viewBox="0 0 24 24" fill="none">
                            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" fill="currentColor"/>
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="project-info">
                      <h4>{getLocalizedContent(project.title, 'SR')}</h4>
                      <p className="project-category">{getLocalizedContent(project.category, 'SR')}</p>
                      {project.client && <p className="project-client">Klijent: {getLocalizedContent(project.client, 'SR')}</p>}
                      {project.location && <p className="project-location">Lokacija: {getLocalizedContent(project.location, 'SR')}</p>}
                      <p className="project-date">Završeno: {formatDate(project.completionDate)}</p>
                    </div>
                    <div className="project-actions">
                      <button onClick={() => handleEdit(project)} className="edit-btn">
                        Uredi
                      </button>
                      
                      <button 
                        onClick={() => handleTranslateProject(project._id)} 
                        className="translate-btn"
                        disabled={translatingProjects.has(project._id)}
                        title="Prevedi na drugi jezici pomoću AI"
                      >
                        {translatingProjects.has(project._id) ? (
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
                      
                      <button onClick={() => handleDelete(project._id)} className="delete-btn">
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
          <form className="project-form" onSubmit={handleSubmit}>
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
                  <label>Naziv projekta *</label>
                  <input
                    type="text"
                    value={formData.title[currentLanguage.toLowerCase()] || ''}
                    onChange={(e) => handleMultilingualInputChange('title', e.target.value)}
                    placeholder={`Unesite naziv na ${currentLanguage === 'SR' ? 'srpskom' : currentLanguage === 'EN' ? 'engleskom' : 'nemačkom'} jeziku`}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Kategorija *</label>
                  <select
                    value={formData.category[currentLanguage.toLowerCase()] || ''}
                    onChange={(e) => handleMultilingualInputChange('category', e.target.value)}
                    required
                  >
                    <option value="">Izaberite kategoriju</option>
                    {categoryOptions.map((cat, index) => (
                      <option key={`category-${index}`} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Klijent</label>
                  <input
                    type="text"
                    value={formData.client[currentLanguage.toLowerCase()] || ''}
                    onChange={(e) => handleMultilingualInputChange('client', e.target.value)}
                    placeholder={`Naziv klijenta na ${currentLanguage === 'SR' ? 'srpskom' : currentLanguage === 'EN' ? 'engleskom' : 'nemačkom'} jeziku`}
                  />
                </div>
                
                <div className="form-group">
                  <label>Lokacija</label>
                  <input
                    type="text"
                    value={formData.location[currentLanguage.toLowerCase()] || ''}
                    onChange={(e) => handleMultilingualInputChange('location', e.target.value)}
                    placeholder={`Lokacija na ${currentLanguage === 'SR' ? 'srpskom' : currentLanguage === 'EN' ? 'engleskom' : 'nemačkom'} jeziku`}
                  />
                </div>
                
                <div className="form-group">
                  <label>Datum realizacije *</label>
                  <input
                    type="date"
                    value={formData.completionDate}
                    onChange={(e) => handleInputChange('completionDate', e.target.value)}
                    required
                  />
                </div>
                
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => handleInputChange('featured', e.target.checked)}
                    />
                    Istaknut projekat
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label>Opis projekta *</label>
                <textarea
                  value={formData.description[currentLanguage.toLowerCase()] || ''}
                  onChange={(e) => handleMultilingualInputChange('description', e.target.value)}
                  placeholder={`Detaljni opis na ${currentLanguage === 'SR' ? 'srpskom' : currentLanguage === 'EN' ? 'engleskom' : 'nemačkom'} jeziku...`}
                  rows="5"
                  required
                />
              </div>
            </div>

            {/* Images */}
            <div className="form-section">
              <h3>Galerija slika</h3>
              <div className="form-group">
                <label>Upload slike</label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="file-input"
                />
                <p className="form-help">Izaberite više slika (prva će biti glavna/thumbnail)</p>
              </div>
            </div>

            {/* Tags */}
            <div className="form-section">
              <h3>Tagovi</h3>
              <div className="tag-input-group">
                <input
                  type="text"
                  placeholder="Dodaj tag"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={handleTagKeyPress}
                />
                <button type="button" onClick={addTag} className="add-btn">Dodaj</button>
              </div>
              
              <div className="added-items">
                {formData.tags[currentLanguage.toLowerCase()] && formData.tags[currentLanguage.toLowerCase()].map((tag, index) => (
                  <div key={index} className="tag-item">
                    <span>{tag}</span>
                    <button type="button" onClick={() => removeTag(tag)} className="remove-btn">×</button>
                  </div>
                ))}
              </div>
              <p className="form-help">Tagovi pomažu pri pretrazi i kategorizaciji projekata</p>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => { setActiveTab('list'); resetForm(); }} className="cancel-btn">
                Otkaži
              </button>
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? 'Snimanje...' : (editingProject ? 'Ažuriraj projekat' : 'Dodaj projekat')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;