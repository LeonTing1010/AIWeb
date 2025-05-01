import React from 'react';
import { useTranslation } from 'react-i18next';

const Privacy: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="privacy-container">
      <div className="privacy-content">
        <h1>{t('privacy.title')}</h1>
        
        <section className="privacy-section">
          <p className="privacy-intro">{t('privacy.intro')}</p>
        </section>
        
        <section className="privacy-section">
          <h2>{t('privacy.dataStorage')}</h2>
          <p>{t('privacy.dataStorageText')}</p>
        </section>
        
        <section className="privacy-section">
          <h2>{t('privacy.dataEncryption')}</h2>
          <p>{t('privacy.dataEncryptionText')}</p>
        </section>
        
        <section className="privacy-section">
          <h2>{t('privacy.gdprCompliance')}</h2>
          <p>{t('privacy.gdprComplianceText')}</p>
        </section>
        
        <section className="privacy-section">
          <h2>CCPA Compliance</h2>
          <p>This application also complies with California Consumer Privacy Act (CCPA) requirements by:</p>
          <ul>
            <li>Giving you control over your personal information</li>
            <li>Not selling your personal information to third parties</li>
            <li>Keeping all data locally on your device</li>
          </ul>
        </section>
        
        <section className="privacy-section">
          <h2>Data Collection Limitation</h2>
          <p>We only collect the minimum data necessary for the psychological assessment. All assessment responses are:</p>
          <ul>
            <li>Stored locally on your device</li>
            <li>Encrypted for security</li>
            <li>Never transmitted to external servers</li>
            <li>Under your complete control</li>
          </ul>
        </section>
        
        <section className="privacy-section">
          <h2>Contact</h2>
          <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </section>
        
        <div className="privacy-date">
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Privacy; 