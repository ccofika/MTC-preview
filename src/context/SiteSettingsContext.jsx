import React, { createContext, useContext, useState, useEffect } from 'react';
import siteSettingsService from '../services/siteSettingsService';

const SiteSettingsContext = createContext();

export const useSiteSettings = () => {
  const context = useContext(SiteSettingsContext);
  if (!context) {
    throw new Error('useSiteSettings must be used within a SiteSettingsProvider');
  }
  return context;
};

export const SiteSettingsProvider = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState({
    companyEmail: 'office@mtc.co.rs',
    companyPhone: '+381 18 415 63 32',
    companyAddress: {
      street: 'Gandijeva 235/13',
      city: '11073 Beograd',
      country: 'Srbija'
    },
    workingHours: {
      weekdays: 'Ponedeljak i Petak: 08:00-16:00',
      saturday: 'Subota: Zatvoreno',
      sunday: 'Nedelja: Zatvoreno'
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      linkedin: '',
      youtube: ''
    },
    siteTitle: 'NISSAL - Aluminijumski sistemi',
    siteDescription: 'Specijalizovani za proizvodnju i ugradnju aluminijumskih sistema najvećeg kvaliteta',
    version: '1.0.0'
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const settings = await siteSettingsService.getPublicSettings();
      setSiteSettings(prevSettings => ({
        ...prevSettings,
        ...settings
      }));
      
      // Store successful settings in localStorage as backup
      localStorage.setItem('siteSettings', JSON.stringify(settings));
    } catch (err) {
      console.error('Failed to load site settings:', err);
      setError(err.message);
      
      // Try to load from localStorage as fallback
      const cachedSettings = localStorage.getItem('siteSettings');
      if (cachedSettings) {
        try {
          const settings = JSON.parse(cachedSettings);
          setSiteSettings(prevSettings => ({
            ...prevSettings,
            ...settings
          }));
        } catch (parseErr) {
          console.error('Failed to parse cached settings:', parseErr);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  // Refresh settings (can be called from admin panel)
  const refreshSettings = async () => {
    await loadSettings();
  };


  const value = {
    siteSettings,
    loading,
    error,
    refreshSettings
  };

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  );
};

export default SiteSettingsContext;