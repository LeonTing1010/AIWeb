import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RootState } from '../store';

// 模拟历史测评记录
const mockAssessmentHistory = [
  { id: 'a1b2c3', date: '2023-11-15', totalScore: 125 },
  { id: 'd4e5f6', date: '2023-10-28', totalScore: 142 },
  { id: 'g7h8i9', date: '2023-09-05', totalScore: 118 }
];

const Profile: React.FC = () => {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state: RootState) => state.user);
  
  // 格式化日期
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <div className="profile-container">
      <h1>{t('profile.title')}</h1>
      
      <div className="profile-info">
        <div className="profile-header">
          <h2>{t('profile.personalInfo')}</h2>
        </div>
        
        <div className="profile-details">
          <p>
            <strong>{t('profile.email')}:</strong> {currentUser?.email}
          </p>
          <p>
            <strong>{t('profile.joined')}:</strong> {currentUser?.createdAt 
              ? new Date(currentUser.createdAt).toLocaleDateString() 
              : t('profile.unknown')}
          </p>
          <p>
            <strong>{t('profile.lastLogin')}:</strong> {currentUser?.lastLogin 
              ? new Date(currentUser.lastLogin).toLocaleDateString() 
              : t('profile.unknown')}
          </p>
        </div>
      </div>
      
      <div className="assessment-history">
        <div className="history-header">
          <h2>{t('profile.assessmentHistory')}</h2>
          <Link to="/assessment" className="start-new-button">
            {t('profile.startNew')}
          </Link>
        </div>
        
        {mockAssessmentHistory.length > 0 ? (
          <div className="history-list">
            <table>
              <thead>
                <tr>
                  <th>{t('profile.date')}</th>
                  <th>{t('profile.score')}</th>
                  <th>{t('profile.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {mockAssessmentHistory.map((assessment) => (
                  <tr key={assessment.id}>
                    <td>{formatDate(assessment.date)}</td>
                    <td 
                      className={assessment.totalScore >= 160 
                        ? 'high-score' 
                        : 'normal-score'}
                    >
                      {assessment.totalScore}
                    </td>
                    <td>
                      <Link 
                        to={`/results/${assessment.id}`} 
                        className="view-results-link"
                      >
                        {t('profile.viewResults')}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-history">
            <p>{t('profile.noAssessments')}</p>
            <Link to="/assessment" className="take-assessment-link">
              {t('profile.takeFirst')}
            </Link>
          </div>
        )}
      </div>
      
      <div className="data-management">
        <h2>{t('profile.dataManagement')}</h2>
        <p className="data-info">
          {t('profile.dataInfo')}
        </p>
        
        <div className="data-actions">
          <button className="secondary-button">
            {t('profile.exportData')}
          </button>
          <button className="danger-button">
            {t('profile.deleteAllData')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile; 