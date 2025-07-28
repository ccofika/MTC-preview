const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Service for managing site settings
 */
class SiteSettingsService {
  /**
   * Get public site settings (no auth required)
   */
  async getPublicSettings() {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`);
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch site settings');
      }
    } catch (error) {
      console.error('Error fetching public settings:', error);
      throw error;
    }
  }

  /**
   * Get admin site settings (auth required)
   */
  async getAdminSettings(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/admin`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to fetch admin settings');
      }
    } catch (error) {
      console.error('Error fetching admin settings:', error);
      throw error;
    }
  }

  /**
   * Update contact information
   */
  async updateContactInfo(contactData, token) {
    try {
      const response = await fetch(`${API_BASE_URL}/settings/contact`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactData)
      });
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to update contact info');
      }
    } catch (error) {
      console.error('Error updating contact info:', error);
      throw error;
    }
  }


  /**
   * Update all site settings
   */
  async updateSettings(settingsData, token) {
    try {
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(settingsData)
      });
      const data = await response.json();
      
      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || 'Failed to update settings');
      }
    } catch (error) {
      console.error('Error updating settings:', error);
      throw error;
    }
  }
}

// Create singleton instance
const siteSettingsService = new SiteSettingsService();

export default siteSettingsService;