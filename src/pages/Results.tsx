import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// 模拟数据，实际会从Redux或本地存储读取
const mockDimensionScores = {
  somatization: 2.1,
  obsessiveCompulsive: 1.8,
  interpersonalSensitivity: 2.7,
  depression: 1.5,
  anxiety: 2.4,
  hostility: 1.2,
  phobicAnxiety: 1.0,
  paranoidIdeation: 1.7,
  psychoticism: 1.3,
  additional: 1.9
};

const Results: React.FC = () => {
  const { t } = useTranslation();
  const { resultId } = useParams<{ resultId: string }>();
  const [generatingPdf, setGeneratingPdf] = useState(false);
  
  // 计算总分
  const totalScore = Object.values(mockDimensionScores).reduce((sum, score) => sum + score, 0) * 9;
  
  // 根据分数生成建议
  const generateRecommendation = (dimensionScores: Record<string, number>) => {
    const highDimensions = Object.entries(dimensionScores)
      .filter(([, score]) => score >= 2.5)
      .map(([key]) => key);
    
    if (totalScore >= 160 || highDimensions.length > 0) {
      return (
        <div className="alert recommendation">
          <h3>{t('results.needAttention')}</h3>
          <p>{t('results.highScoreAdvice')}</p>
          {highDimensions.length > 0 && (
            <div>
              <p>{t('results.highDimensions')}:</p>
              <ul>
                {highDimensions.map((dimension) => (
                  <li key={dimension}>
                    {t(`dimensions.${dimension}`)} ({dimensionScores[dimension].toFixed(1)})
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    }
    
    return (
      <div className="info recommendation">
        <h3>{t('results.normalRange')}</h3>
        <p>{t('results.normalRangeAdvice')}</p>
      </div>
    );
  };
  
  // 模拟生成PDF报告
  const handleGeneratePDF = () => {
    setGeneratingPdf(true);
    
    // 模拟异步操作
    setTimeout(() => {
      setGeneratingPdf(false);
      alert(t('results.pdfSuccess'));
    }, 1500);
  };
  
  return (
    <div className="results-container">
      <h1>{t('results.title')}</h1>
      
      <div className="result-summary">
        <p className="result-id">
          {t('results.id')}: {resultId}
        </p>
        <p className="result-date">
          {t('results.date')}: {new Date().toLocaleDateString()}
        </p>
        <div className="total-score">
          <h3>{t('results.totalScore')}</h3>
          <div className="score-display">{totalScore.toFixed(0)}</div>
        </div>
      </div>
      
      <div className="dimension-scores">
        <h2>{t('results.dimensionScores')}</h2>
        
        <div className="bar-chart">
          {Object.entries(mockDimensionScores).map(([dimension, score]) => (
            <div key={dimension} className="score-bar-container">
              <div className="dimension-label">
                {t(`dimensions.${dimension}`)}
              </div>
              <div className="score-bar-wrapper">
                <div 
                  className={`score-bar ${score >= 2.5 ? 'high-score' : ''}`}
                  style={{ width: `${(score / 5) * 100}%` }}
                >
                  {score.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="result-recommendation">
        <h2>{t('results.recommendation')}</h2>
        {generateRecommendation(mockDimensionScores)}
      </div>
      
      <div className="result-actions">
        <button 
          onClick={handleGeneratePDF}
          disabled={generatingPdf}
          className="generate-pdf-button"
        >
          {generatingPdf ? t('results.generating') : t('results.generatePdf')}
        </button>
      </div>
      
      <div className="result-disclaimer">
        <p>{t('results.disclaimer')}</p>
      </div>
    </div>
  );
};

export default Results; 