import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-info">
          <div className="footer-logo">
            <h3>{t('footer.title')}</h3>
            <p>{t('footer.description')}</p>
          </div>
          
          <div className="footer-links">
            <h4>{t('footer.links')}</h4>
            <ul>
              <li>
                <Link to="/">{t('footer.home')}</Link>
              </li>
              <li>
                <Link to="/privacy">{t('footer.privacy')}</Link>
              </li>
            </ul>
          </div>
          
          <div className="footer-reference">
            <h4>{t('footer.reference')}</h4>
            <p>{t('footer.referenceText')}</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>
            &copy; {currentYear} {t('footer.copyright')}
          </p>
          <p className="data-notice">
            {t('footer.dataNotice')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 