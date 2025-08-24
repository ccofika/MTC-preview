const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const translationService = {
  async translateProduct(productId, languages = ['en', 'de'], token) {
    const response = await fetch(`${API_URL}/translations/product/${productId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ languages })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Translation failed');
    }

    return await response.json();
  },

  async translateProject(projectId, languages = ['en', 'de'], token) {
    const response = await fetch(`${API_URL}/translations/project/${projectId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ languages })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Translation failed');
    }

    return await response.json();
  },

  async translateAllProducts(languages = ['en', 'de'], token) {
    const response = await fetch(`${API_URL}/translations/products/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ languages })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Translation failed');
    }

    return await response.json();
  },

  async translateAllProjects(languages = ['en', 'de'], token) {
    const response = await fetch(`${API_URL}/translations/projects/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ languages })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Translation failed');
    }

    return await response.json();
  }
};