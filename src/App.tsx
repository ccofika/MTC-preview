import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';

import theme from './styles/theme';
import { SiteSettingsProvider } from './context/SiteSettingsContext';
import { IntroLoader } from './components/IntroLoader.tsx';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import EcologyPage from './pages/EcologyPage';
import ServicesPage from './pages/ServicesPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import './styles/App.css';

const queryClient = new QueryClient();

const RoutesWithTransitions = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.pathname}
        timeout={200}
        classNames="page-transition"
        unmountOnExit
      >
        <div className="page-wrapper">
          <Routes location={location}>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetailPage />} />
            <Route path="/projekti" element={<ProjectsPage />} />
            <Route path="/projekti/:id" element={<ProjectDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/ecology" element={<EcologyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
          </Routes>
        </div>
      </CSSTransition>
    </TransitionGroup>
  );
};

const AppContent = () => {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    // Check if user has seen the intro in this session
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    
    // Show intro on first visit or refresh (when sessionStorage is empty)
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const handleIntroComplete = () => {
    // Mark that user has seen the intro for this session
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
  };

  return (
    <Router>
      <div className="App">
        <IntroLoader show={showIntro} onComplete={handleIntroComplete} />
        <div style={{ 
          opacity: showIntro ? 0 : 1, 
          transition: 'opacity 0.5s ease-in-out',
          pointerEvents: showIntro ? 'none' : 'auto'
        }}>
          <ScrollToTop />
          <RoutesWithTransitions />
          <Toaster position="top-right" />
        </div>
      </div>
    </Router>
  );
};

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SiteSettingsProvider>
            <AppContent />
          </SiteSettingsProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;