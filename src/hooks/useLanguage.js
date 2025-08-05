import { useState, useEffect } from 'react';

const useLanguage = () => {
  // Initialize language from localStorage or default to 'SR'
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('nissal-language');
    return savedLanguage && ['SR', 'EN', 'DE'].includes(savedLanguage) ? savedLanguage : 'SR';
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('nissal-language', language);
  }, [language]);

  const changeLanguage = (newLanguage) => {
    if (['SR', 'EN', 'DE'].includes(newLanguage)) {
      setLanguage(newLanguage);
    }
  };

  // Legacy toggle function for backwards compatibility
  const toggleLanguage = () => {
    const languages = ['SR', 'EN', 'DE'];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  return {
    language,
    setLanguage,
    changeLanguage,
    toggleLanguage
  };
};

export default useLanguage;