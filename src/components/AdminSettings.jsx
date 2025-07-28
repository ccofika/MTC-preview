import React, { useState, useEffect } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import siteSettingsService from '../services/siteSettingsService';
import './AdminSettings.css';

const AdminSettings = ({ onClose }) => {
  const { refreshSettings } = useSiteSettings();
  const [activeTab, setActiveTab] = useState('users');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // User Management State
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'staff',
    permissions: []
  });
  const [editingUser, setEditingUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  // Site Settings State
  const [siteSettings, setSiteSettings] = useState({
    companyEmail: '',
    companyPhone: '',
    companyAddress: {
      street: '',
      city: '',
      country: ''
    },
    workingHours: {
      weekdays: '',
      saturday: '',
      sunday: ''
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: ''
    },
    notifications: {
      emailOnNewContact: true,
      emailOnNewOrder: true,
      smsNotifications: false
    }
  });

  const availablePermissions = [
    { value: 'manage_products', label: 'Upravljanje sistemima' },
    { value: 'manage_projects', label: 'Upravljanje projektima' },
    { value: 'manage_messages', label: 'Upravljanje porukama' },
    { value: 'manage_users', label: 'Upravljanje korisnicima' },
    { value: 'view_analytics', label: 'Pregled analitike' },
    { value: 'system_settings', label: 'Sistem postavke' }
  ];

  const roleLabels = {
    admin: 'Superadmin',
    manager: 'Menadžer',
    staff: 'Editor'
  };

  useEffect(() => {
    if (activeTab === 'users') {
      fetchUsers();
    } else {
      fetchSiteSettings();
    }
  }, [activeTab]);

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const getAuthHeaders = () => {
    const token = localStorage.getItem('adminToken');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  // User Management Functions
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/adminUsers`, {
        headers: getAuthHeaders()
      });
      const data = await response.json();
      
      if (data.success) {
        setUsers(data.data.users);
      } else {
        showMessage('error', data.message);
      }
    } catch (error) {
      showMessage('error', 'Greška pri učitavanju korisnika');
    } finally {
      setLoading(false);
    }
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingUser ? `${API_BASE_URL}/adminUsers/${editingUser._id}` : `${API_BASE_URL}/adminUsers`;
      const method = editingUser ? 'PUT' : 'POST';
      
      const userData = { ...userForm };
      if (editingUser && !userData.password) {
        delete userData.password;
      }

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      
      if (data.success) {
        showMessage('success', editingUser ? 'Korisnik je uspešno ažuriran' : 'Korisnik je uspešno kreiran');
        setShowUserModal(false);
        setUserForm({
          name: '',
          email: '',
          password: '',
          role: 'staff',
          permissions: []
        });
        setEditingUser(null);
        fetchUsers();
      } else {
        showMessage('error', data.message);
      }
    } catch (error) {
      showMessage('error', 'Greška pri čuvanju korisnika');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({
      name: user.name,
      email: user.email,
      password: '',
      role: user.role,
      permissions: user.permissions || []
    });
    setShowUserModal(true);
  };

  const handleDeleteUser = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/adminUsers/${userId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const data = await response.json();
      
      if (data.success) {
        showMessage('success', 'Korisnik je uspešno obrisan');
        fetchUsers();
      } else {
        showMessage('error', data.message);
      }
    } catch (error) {
      showMessage('error', 'Greška pri brisanju korisnika');
    } finally {
      setLoading(false);
      setShowDeleteConfirm(null);
    }
  };

  const handleToggleUserStatus = async (userId) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/adminUsers/${userId}/toggle-status`, {
        method: 'PATCH',
        headers: getAuthHeaders()
      });

      const data = await response.json();
      
      if (data.success) {
        showMessage('success', 'Status korisnika je promenjen');
        fetchUsers();
      } else {
        showMessage('error', data.message);
      }
    } catch (error) {
      showMessage('error', 'Greška pri menjanju statusa');
    } finally {
      setLoading(false);
    }
  };

  // Site Settings Functions
  const fetchSiteSettings = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const settings = await siteSettingsService.getAdminSettings(token);
      setSiteSettings(settings);
    } catch (error) {
      console.error('Fetch settings error:', error);
      showMessage('error', error.message || 'Greška pri učitavanju postavki');
    } finally {
      setLoading(false);
    }
  };

  const handleSettingsSubmit = async (section) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');

      if (section === 'contact') {
        const contactData = {
          companyEmail: siteSettings.companyEmail,
          companyPhone: siteSettings.companyPhone,
          companyAddress: siteSettings.companyAddress,
          workingHours: siteSettings.workingHours
        };
        await siteSettingsService.updateContactInfo(contactData, token);
      } else {
        await siteSettingsService.updateSettings(siteSettings, token);
      }

      showMessage('success', 'Postavke su uspešno sačuvane');
      
      // Refresh settings to get updated data
      try {
        await fetchSiteSettings();
        await refreshSettings();
      } catch (refreshError) {
        console.warn('Failed to refresh settings from API, using local data:', refreshError);
      }
      
    } catch (error) {
      console.error('Settings submit error:', error);
      showMessage('error', error.message || 'Greška pri čuvanju postavki');
    } finally {
      setLoading(false);
    }
  };

  const renderUserManagement = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Upravljanje admin korisnicima</h3>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setUserForm({
              name: '',
              email: '',
              password: '',
              role: 'staff',
              permissions: []
            });
            setEditingUser(null);
            setShowUserModal(true);
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Dodaj korisnika
        </button>
      </div>

      <div className="users-table">
        <table>
          <thead>
            <tr>
              <th>Ime</th>
              <th>Email</th>
              <th>Uloga</th>
              <th>Status</th>
              <th>Poslednja prijava</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge role-${user.role}`}>
                    {roleLabels[user.role]}
                  </span>
                </td>
                <td>
                  <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                    {user.isActive ? 'Aktivan' : 'Neaktivan'}
                  </span>
                </td>
                <td>
                  {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString('sr-RS') : 'Nikad'}
                </td>
                <td>
                  <div className="action-buttons">
                    <button 
                      className="btn btn-sm btn-outline"
                      onClick={() => handleEditUser(user)}
                      title="Uredi"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button 
                      className={`btn btn-sm ${user.isActive ? 'btn-warning' : 'btn-success'}`}
                      onClick={() => handleToggleUserStatus(user._id)}
                      title={user.isActive ? 'Deaktiviraj' : 'Aktiviraj'}
                    >
                      {user.isActive ? (
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                    <button 
                      className="btn btn-sm btn-danger"
                      onClick={() => setShowDeleteConfirm(user._id)}
                      title="Obriši"
                    >
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContactSettings = () => (
    <div className="settings-section">
      <div className="section-header">
        <h3>Kontakt informacije</h3>
        <button 
          className="btn btn-primary"
          onClick={() => handleSettingsSubmit('contact')}
          disabled={loading}
        >
          Sačuvaj
        </button>
      </div>

      <div className="settings-form">
        <div className="form-grid">
          <div className="form-group">
            <label>Email firme</label>
            <input
              type="email"
              value={siteSettings.companyEmail}
              onChange={(e) => setSiteSettings({
                ...siteSettings,
                companyEmail: e.target.value
              })}
            />
          </div>

          <div className="form-group">
            <label>Telefon</label>
            <input
              type="text"
              value={siteSettings.companyPhone}
              onChange={(e) => setSiteSettings({
                ...siteSettings,
                companyPhone: e.target.value
              })}
            />
          </div>

          <div className="form-group">
            <label>Ulica i broj</label>
            <input
              type="text"
              value={siteSettings.companyAddress?.street || ''}
              onChange={(e) => setSiteSettings({
                ...siteSettings,
                companyAddress: {
                  ...siteSettings.companyAddress,
                  street: e.target.value
                }
              })}
            />
          </div>

          <div className="form-group">
            <label>Grad</label>
            <input
              type="text"
              value={siteSettings.companyAddress?.city || ''}
              onChange={(e) => setSiteSettings({
                ...siteSettings,
                companyAddress: {
                  ...siteSettings.companyAddress,
                  city: e.target.value
                }
              })}
            />
          </div>

          <div className="form-group">
            <label>Država</label>
            <input
              type="text"
              value={siteSettings.companyAddress?.country || ''}
              onChange={(e) => setSiteSettings({
                ...siteSettings,
                companyAddress: {
                  ...siteSettings.companyAddress,
                  country: e.target.value
                }
              })}
            />
          </div>
        </div>

        <h4>Radno vreme</h4>
        <div className="form-grid">
          <div className="form-group">
            <label>Radni dani</label>
            <input
              type="text"
              value={siteSettings.workingHours?.weekdays || ''}
              onChange={(e) => setSiteSettings({
                ...siteSettings,
                workingHours: {
                  ...siteSettings.workingHours,
                  weekdays: e.target.value
                }
              })}
            />
          </div>

          <div className="form-group">
            <label>Subota</label>
            <input
              type="text"
              value={siteSettings.workingHours?.saturday || ''}
              onChange={(e) => setSiteSettings({
                ...siteSettings,
                workingHours: {
                  ...siteSettings.workingHours,
                  saturday: e.target.value
                }
              })}
            />
          </div>

          <div className="form-group">
            <label>Nedelja</label>
            <input
              type="text"
              value={siteSettings.workingHours?.sunday || ''}
              onChange={(e) => setSiteSettings({
                ...siteSettings,
                workingHours: {
                  ...siteSettings.workingHours,
                  sunday: e.target.value
                }
              })}
            />
          </div>
        </div>
      </div>
    </div>
  );



  return (
    <div className="admin-settings-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Sistem postavke</h2>
          <button className="modal-close" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {message.text && (
          <div className={`message ${message.type}`}>
            {message.text}
          </div>
        )}

        <div className="modal-body">
          <div className="settings-tabs">
            <button 
              className={`tab ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="17,11 19,13 23,9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Admin korisnici
            </button>
            <button 
              className={`tab ${activeTab === 'contact' ? 'active' : ''}`}
              onClick={() => setActiveTab('contact')}
            >
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Kontakt info
            </button>
          </div>

          <div className="tab-content">
            {loading && (
              <div className="loading-overlay">
                <div className="loading-spinner"></div>
              </div>
            )}
            
            {activeTab === 'users' && renderUserManagement()}
            {activeTab === 'contact' && renderContactSettings()}
          </div>
        </div>
      </div>

      {/* User Modal */}
      {showUserModal && (
        <div className="user-modal">
          <div className="modal-overlay" onClick={() => setShowUserModal(false)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingUser ? 'Uredi korisnika' : 'Dodaj korisnika'}</h3>
              <button className="modal-close" onClick={() => setShowUserModal(false)}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <form onSubmit={handleUserSubmit}>
              <div className="form-group">
                <label>Ime *</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  required
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Lozinka {editingUser ? '(ostaviti prazno za zadržavanje postojeće)' : '*'}</label>
                <input
                  type="password"
                  required={!editingUser}
                  value={userForm.password}
                  onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Uloga *</label>
                <select
                  value={userForm.role}
                  onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                >
                  <option value="staff">Editor</option>
                  <option value="manager">Menadžer</option>
                  <option value="admin">Superadmin</option>
                </select>
              </div>
              <div className="form-group">
                <label>Dozvole</label>
                <div className="permissions-grid">
                  {availablePermissions.map(perm => (
                    <div key={perm.value} className="checkbox-group">
                      <input
                        type="checkbox"
                        id={perm.value}
                        checked={userForm.permissions.includes(perm.value)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setUserForm({
                              ...userForm,
                              permissions: [...userForm.permissions, perm.value]
                            });
                          } else {
                            setUserForm({
                              ...userForm,
                              permissions: userForm.permissions.filter(p => p !== perm.value)
                            });
                          }
                        }}
                      />
                      <label htmlFor={perm.value}>{perm.label}</label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => setShowUserModal(false)}>
                  Otkaži
                </button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {editingUser ? 'Ažuriraj' : 'Kreiraj'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-modal">
          <div className="modal-overlay" onClick={() => setShowDeleteConfirm(null)}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h3>Potvrda brisanja</h3>
            </div>
            <div className="modal-body">
              <p>Da li ste sigurni da želite da obrišete ovog korisnika?</p>
              <p><strong>Ova akcija se ne može poništiti.</strong></p>
            </div>
            <div className="form-actions">
              <button className="btn btn-outline" onClick={() => setShowDeleteConfirm(null)}>
                Otkaži
              </button>
              <button 
                className="btn btn-danger" 
                onClick={() => handleDeleteUser(showDeleteConfirm)}
                disabled={loading}
              >
                Obriši
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;