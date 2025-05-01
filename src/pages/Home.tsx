import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  
  return (
    <div className="home-page">
      <section className="hero-section" aria-labelledby="hero-heading">
        <div className="hero-content">
          <h1 id="hero-heading">{t('home.welcome')}</h1>
          <p className="hero-description">{t('home.description')}</p>
          
          <div className="cta-buttons">
            {isAuthenticated ? (
              <Link to="/assessment" className="primary-button">
                {t('home.startButton')}
              </Link>
            ) : (
              <Link to="/login" className="primary-button">
                {t('home.startButton')}
              </Link>
            )}
          </div>
        </div>
        <div className="hero-image">
          <img 
            src="/src/assets/images/mental-health.svg" 
            alt="Mental health illustration" 
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
        </div>
      </section>
      
      <section className="features-section" aria-labelledby="features-heading">
        <h2 id="features-heading">{t('home.features.heading')}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <span className="icon-scientific">📊</span>
            </div>
            <h3>{t('home.features.title1')}</h3>
            <p>{t('home.features.desc1')}</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <span className="icon-privacy">🔒</span>
            </div>
            <h3>{t('home.features.title2')}</h3>
            <p>{t('home.features.desc2')}</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">
              <span className="icon-reports">📈</span>
            </div>
            <h3>{t('home.features.title3')}</h3>
            <p>{t('home.features.desc3')}</p>
          </div>
        </div>
      </section>
      
      <section className="info-section" aria-labelledby="about-heading">
        <h2 id="about-heading">{t('home.about')}</h2>
        <div className="info-content">
          <p>{t('home.aboutText1')}</p>
          <p>{t('home.aboutText2')}</p>
          
          <div className="info-highlights">
            <div className="highlight-item">
              <h4>10</h4>
              <p>{t('home.dimensions')}</p>
            </div>
            <div className="highlight-item">
              <h4>90</h4>
              <p>{t('home.questions')}</p>
            </div>
            <div className="highlight-item">
              <h4>100%</h4>
              <p>{t('home.privacy')}</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="testimonial-section">
        <h2>{t('home.testimonials')}</h2>
        <div className="testimonial-card">
          <p>"{t('home.testimonialText')}"</p>
          <div className="testimonial-author">{t('home.testimonialAuthor')}</div>
        </div>
      </section>
    </div>
  );
};

export default Home; 