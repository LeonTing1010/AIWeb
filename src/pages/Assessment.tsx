import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// 临时问题数据，后续将替换为更完整的内容
const tempQuestions = [
  { id: 1, dimensionKey: 'somatization', translationKey: 'questions.q1' },
  { id: 2, dimensionKey: 'obsessiveCompulsive', translationKey: 'questions.q2' },
  { id: 3, dimensionKey: 'interpersonalSensitivity', translationKey: 'questions.q3' },
  { id: 4, dimensionKey: 'depression', translationKey: 'questions.q4' },
  { id: 5, dimensionKey: 'anxiety', translationKey: 'questions.q5' },
  { id: 6, dimensionKey: 'hostility', translationKey: 'questions.q6' },
  { id: 7, dimensionKey: 'phobicAnxiety', translationKey: 'questions.q7' },
  { id: 8, dimensionKey: 'paranoidIdeation', translationKey: 'questions.q8' },
  { id: 9, dimensionKey: 'psychoticism', translationKey: 'questions.q9' },
  { id: 10, dimensionKey: 'additional', translationKey: 'questions.q10' }
];

const Assessment: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [missingAnswers, setMissingAnswers] = useState<number[]>([]);
  
  // 当前问题
  const currentQuestion = tempQuestions[currentQuestionIndex];
  
  // 进度
  const progress = ((currentQuestionIndex + 1) / tempQuestions.length) * 100;
  
  // 回答问题
  const handleAnswer = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
    
    // 自动前进到下一题
    if (currentQuestionIndex < tempQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // 上一题
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  // 下一题
  const handleNext = () => {
    if (currentQuestionIndex < tempQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  
  // 提交评估
  const handleSubmit = () => {
    // 检查是否有未回答的问题
    const unansweredQuestions = tempQuestions
      .filter(q => !answers[q.id])
      .map(q => q.id);
    
    if (unansweredQuestions.length > 0) {
      setMissingAnswers(unansweredQuestions);
      return;
    }
    
    setIsSubmitting(true);
    
    // 这里会添加计算结果和保存数据的逻辑
    
    // 生成简单的测试结果，模拟真实场景
    const resultId = uuidv4();
    
    // 导航到结果页
    navigate(`/results/${resultId}`);
  };
  
  return (
    <div className="assessment-container">
      <h1>{t('assessment.title')}</h1>
      
      <div className="progress-container">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {currentQuestionIndex + 1} / {tempQuestions.length}
        </div>
      </div>
      
      <div className="question-card">
        <h2 className="question-number">
          {t('assessment.question')} {currentQuestion.id}
        </h2>
        
        <p className="question-text">
          {t(currentQuestion.translationKey, '问题内容')}
        </p>
        
        <div className="answer-options">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              className={`answer-button ${answers[currentQuestion.id] === value ? 'selected' : ''}`}
              onClick={() => handleAnswer(value)}
            >
              {value} - {t(`assessment.options.${value}`)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="assessment-navigation">
        <button 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          className="nav-button prev-button"
        >
          {t('assessment.previous')}
        </button>
        
        {currentQuestionIndex < tempQuestions.length - 1 ? (
          <button 
            onClick={handleNext}
            className="nav-button next-button"
          >
            {t('assessment.next')}
          </button>
        ) : (
          <button 
            onClick={handleSubmit}
            className="nav-button submit-button"
            disabled={isSubmitting}
          >
            {t('assessment.submit')}
          </button>
        )}
      </div>
      
      {missingAnswers.length > 0 && (
        <div className="missing-answers-warning">
          <p>{t('assessment.missingAnswers')}</p>
          <ul>
            {missingAnswers.map(id => (
              <li key={id}>
                <button 
                  onClick={() => setCurrentQuestionIndex(tempQuestions.findIndex(q => q.id === id))}
                  className="missing-question-link"
                >
                  {t('assessment.question')} {id}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Assessment; 