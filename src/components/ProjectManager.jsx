import React, { useState, useEffect } from 'react';
import { projectService } from '../services/projectService';
import './ProjectManager.css';

const ProjectManager = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('list'); // 'list', 'add', 'edit'
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editingProject, setEditingProject] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    location: '',
    completionDate: '',
    category: '',
    tags: [],
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

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Naziv projekta je obavezan';
    if (!formData.description.trim()) return 'Opis projekta je obavezan';
    if (!formData.category.trim()) return 'Kategorija je obavezna';
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
      
      // Add form data
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('client', formData.client || '');
      submitData.append('location', formData.location || '');
      submitData.append('completionDate', formData.completionDate);
      submitData.append('category', formData.category);
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
      title: '',
      description: '',
      client: '',
      location: '',
      completionDate: '',
      category: '',
      tags: [],
      featured: false
    });
    setImages([]);
    setEditingProject(null);
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      client: project.client || '',
      location: project.location || '',
      completionDate: project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : '',
      category: project.category,
      tags: project.tags || [],
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
                        alt={project.title}
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
                      <h4>{project.title}</h4>
                      <p className="project-category">{project.category}</p>
                      {project.client && <p className="project-client">Klijent: {project.client}</p>}
                      {project.location && <p className="project-location">Lokacija: {project.location}</p>}
                      <p className="project-date">Završeno: {formatDate(project.completionDate)}</p>
                    </div>
                    <div className="project-actions">
                      <button onClick={() => handleEdit(project)} className="edit-btn">
                        Uredi
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
            {/* Basic Info */}
            <div className="form-section">
              <h3>Osnovne informacije</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label>Naziv projekta *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder="Unesite naziv projekta"
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Kategorija *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    required
                  >
                    <option value="">Izaberite kategoriju</option>
                    {categoryOptions.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Klijent</label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => handleInputChange('client', e.target.value)}
                    placeholder="Naziv klijenta ili investitora"
                  />
                </div>
                
                <div className="form-group">
                  <label>Lokacija</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="Grad, opština ili adresa"
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
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Detaljni opis projekta, korišćenih sistema, specifičnosti..."
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
                {formData.tags.map((tag, index) => (
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