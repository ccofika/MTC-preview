/**
 * Utility functions for handling multilingual content from MongoDB
 */

/**
 * Get localized content for a field
 * @param {Object|String} field - The field object with language keys or a simple string (fallback)
 * @param {String} language - Current language ('SR', 'EN', 'DE')
 * @param {String} fallbackLanguage - Fallback language (default: 'SR')
 * @returns {String} Localized content or fallback
 */
export const getLocalizedContent = (field, language = 'SR', fallbackLanguage = 'SR') => {
  // Debug logging for problematic objects
  if (field && typeof field === 'object' && !Array.isArray(field)) {
    if (Object.keys(field).some(key => ['sr', 'en', 'de'].includes(key))) {
      // This is a multilingual object, continue processing
    } else {
      console.warn('Suspicious object passed to getLocalizedContent:', field);
      return JSON.stringify(field); // Prevent React error
    }
  }
  
  // If field is a string (old format), return as is
  if (typeof field === 'string') {
    return field;
  }
  
  // If field is not an object, return empty string
  if (!field || typeof field !== 'object') {
    return '';
  }
  
  // Convert language codes to lowercase for MongoDB field names
  const langCode = language.toLowerCase();
  const fallbackCode = fallbackLanguage.toLowerCase();
  
  // Try to get content in requested language
  if (field[langCode] && field[langCode] !== null && typeof field[langCode] === 'string' && field[langCode].trim()) {
    return field[langCode];
  }
  
  // Try fallback language
  if (field[fallbackCode] && field[fallbackCode] !== null && typeof field[fallbackCode] === 'string' && field[fallbackCode].trim()) {
    return field[fallbackCode];
  }
  
  // Try any available language
  const availableLanguages = ['sr', 'en', 'de'];
  for (const lang of availableLanguages) {
    if (field[lang] && field[lang] !== null && typeof field[lang] === 'string' && field[lang].trim()) {
      return field[lang];
    }
  }
  
  // If all values are null, return empty string instead of error
  const hasOnlyNullValues = Object.values(field).every(val => val === null || val === undefined);
  if (hasOnlyNullValues) {
    return '';
  }
  
  // If we get here and it's still a multilingual object, show keys
  if (field && typeof field === 'object') {
    console.error('Failed to extract content from multilingual object:', field);
    return `[Missing ${language} translation]`;
  }
  
  // Return empty string if no content found
  return '';
};

/**
 * Get localized array content
 * @param {Object|Array} field - The field object with language keys or array (fallback)
 * @param {String} language - Current language ('SR', 'EN', 'DE')
 * @param {String} fallbackLanguage - Fallback language (default: 'SR')
 * @returns {Array} Localized array or fallback
 */
export const getLocalizedArray = (field, language = 'SR', fallbackLanguage = 'SR') => {
  // If field is an array (old format), return as is
  if (Array.isArray(field)) {
    return field;
  }
  
  // If field is not an object, return empty array
  if (!field || typeof field !== 'object') {
    return [];
  }
  
  // Convert language codes to lowercase for MongoDB field names
  const langCode = language.toLowerCase();
  const fallbackCode = fallbackLanguage.toLowerCase();
  
  // Try to get array in requested language
  if (Array.isArray(field[langCode]) && field[langCode].length > 0) {
    return field[langCode];
  }
  
  // Try fallback language
  if (Array.isArray(field[fallbackCode]) && field[fallbackCode].length > 0) {
    return field[fallbackCode];
  }
  
  // Try any available language
  const availableLanguages = ['sr', 'en', 'de'];
  for (const lang of availableLanguages) {
    if (Array.isArray(field[lang]) && field[lang].length > 0) {
      return field[lang];
    }
  }
  
  // Return empty array if no content found
  return [];
};

/**
 * Transform product data to include localized content
 * @param {Object} product - Product object from MongoDB
 * @param {String} language - Current language ('SR', 'EN', 'DE')
 * @returns {Object} Product with localized content
 */
export const getLocalizedProduct = (product, language = 'SR') => {
  if (!product) return null;
  
  return {
    ...product,
    // Localized fields
    localizedTitle: getLocalizedContent(product.title, language),
    localizedDescription: getLocalizedContent(product.description, language),
    localizedCategory: getLocalizedContent(product.catalog?.category, language),
    localizedSubcategory: getLocalizedContent(product.catalog?.subcategory, language),
    localizedTags: getLocalizedArray(product.catalog?.tags, language),
    
    // Colors with localized names
    localizedColors: product.colors?.map(color => ({
      ...color,
      localizedName: getLocalizedContent(color.name, language)
    })) || [],
    
    // Sizes with localized names
    localizedSizes: product.sizes?.map(size => ({
      ...size,
      localizedName: getLocalizedContent(size.name, language)
    })) || []
  };
};

/**
 * Transform project data to include localized content
 * @param {Object} project - Project object from MongoDB
 * @param {String} language - Current language ('SR', 'EN', 'DE')
 * @returns {Object} Project with localized content
 */
export const getLocalizedProject = (project, language = 'SR') => {
  if (!project) return null;
  
  return {
    ...project,
    // Localized fields
    localizedTitle: getLocalizedContent(project.title, language),
    localizedDescription: getLocalizedContent(project.description, language),
    localizedCategory: getLocalizedContent(project.category, language),
    localizedClient: getLocalizedContent(project.client, language),
    localizedLocation: getLocalizedContent(project.location, language),
    localizedTags: getLocalizedArray(project.tags, language)
  };
};