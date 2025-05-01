import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store';
import { logout } from '../../store/userSlice';

const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  
  // 支持的语言
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'es', name: 'Español' },
    { code: 'ar', name: 'العربية' },
    { code: 'ru', name: 'Русский' }
  ];
  
  // 切换语言
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    setLangMenuOpen(false);
  };
  
  // 登出
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };
  
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <h1>{t('header.title')}</h1>
          </Link>
        </div>
        
        <nav className="main-nav">
          <ul>
            <li>
              <Link to="/">{t('header.home')}</Link>
            </li>
            
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/assessment">{t('header.assessment')}</Link>
                </li>
                <li>
                  <Link to="/profile">{t('header.profile')}</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="logout-button">
                    {t('header.logout')}
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login">{t('header.login')}</Link>
              </li>
            )}
            
            <li className="language-selector">
              <button 
                onClick={() => setLangMenuOpen(!langMenuOpen)} 
                className="language-button"
              >
                {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
              </button>
              
              {langMenuOpen && (
                <ul className="language-dropdown">
                  {languages.map((lang) => (
                    <li key={lang.code}>
                      <button
                        onClick={() => changeLanguage(lang.code)}
                        className={i18n.language === lang.code ? 'active' : ''}
                      >
                        {lang.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 