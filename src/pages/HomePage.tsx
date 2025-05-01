import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Button from '../components/ui/Button';

const HomePage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const handleStartAssessment = () => {
    navigate('/assessment');
  };
  
  return (
    <div className="home-page">
      <h1>{t('home.welcome')}</h1>
      <p>{t('home.description')}</p>
      
      <div className="features">
        <div className="feature">
          <h3>{t('home.features.title1')}</h3>
          <p>{t('home.features.desc1')}</p>
        </div>
        <div className="feature">
          <h3>{t('home.features.title2')}</h3>
          <p>{t('home.features.desc2')}</p>
        </div>
        <div className="feature">
          <h3>{t('home.features.title3')}</h3>
          <p>{t('home.features.desc3')}</p>
        </div>
      </div>
      
      <button className="start-button" onClick={handleStartAssessment}>
        {t('home.startButton')}
      </button>
    </div>
  );
};

export default HomePage;