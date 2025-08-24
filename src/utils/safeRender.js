import { getLocalizedContent } from './multilingual';

/**
 * Safely render any text content - if it's a multilingual object, extract the right language
 * @param {any} content - Content to render (string or multilingual object)
 * @param {string} language - Current language
 * @returns {string} Safe string to render
 */
export const safeRender = (content, language = 'SR') => {
  // If it's already a string, return as is
  if (typeof content === 'string') {
    return content;
  }
  
  // If it's null or undefined, return empty string
  if (!content) {
    return '';
  }
  
  // If it's an object (multilingual), use getLocalizedContent
  if (typeof content === 'object' && content !== null) {
    return getLocalizedContent(content, language);
  }
  
  // For any other type, convert to string
  return String(content);
};