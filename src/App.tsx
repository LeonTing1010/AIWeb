import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import Profile from './pages/Profile';
import Privacy from './pages/Privacy';
import TestAuth from './pages/TestAuth';
import PrivateRoute from './components/layout/PrivateRoute';
import './i18n/i18n';

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Detect browser language and set as default
    const browserLang = navigator.language.split('-')[0];
    const supportedLangs = ['en', 'zh', 'es', 'ar', 'ru'];
    const defaultLang = supportedLangs.includes(browserLang) ? browserLang : 'en';
    
    // Get user preferred language from localStorage if available
    const storedLang = localStorage.getItem('preferredLanguage');
    
    i18n.changeLanguage(storedLang || defaultLang);
  }, [i18n]);

  return (
    <BrowserRouter>
      <div className="app-container" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/test-auth" element={<TestAuth />} />
            <Route path="/assessment" element={
              <PrivateRoute>
                <Assessment />
              </PrivateRoute>
            } />
            <Route path="/results/:resultId" element={
              <PrivateRoute>
                <Results />
              </PrivateRoute>
            } />
            <Route path="/profile" element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;