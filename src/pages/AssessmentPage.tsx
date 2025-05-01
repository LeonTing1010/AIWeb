import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../hooks/useAssessment";

const AssessmentPage = () => {
  const { t } = useTranslation();
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [answers, setAnswers] = useState({});
  
  const handleAnswer = (value) => {
    setAnswers(prev => ({ ...prev, [currentQuestion]: value }));
  };
  
  const totalQuestions = 90;
  const progress = (currentQuestion / totalQuestions) * 100;
  
  return (
    <div className="assessment-container">
      <h2>SCL-90 心理测评</h2>
      
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="progress-text">
        {currentQuestion} / {totalQuestions}
      </div>
      
      <div className="question-card">
        <h3>问题 {currentQuestion}</h3>
        <p className="question-text">这里是问题内容</p>
        
        <div className="answers">
          <button onClick={() => handleAnswer(1)}>1 - 完全没有</button>
          <button onClick={() => handleAnswer(2)}>2 - 轻微</button>
          <button onClick={() => handleAnswer(3)}>3 - 中等</button>
          <button onClick={() => handleAnswer(4)}>4 - 偏重</button>
          <button onClick={() => handleAnswer(5)}>5 - 严重</button>
        </div>
      </div>
      
      <div className="navigation">
        <button 
          disabled={currentQuestion === 1}
          onClick={() => setCurrentQuestion(q => Math.max(1, q - 1))}
        >
          上一题
        </button>
        
        <button 
          disabled={currentQuestion === totalQuestions || !answers[currentQuestion]}
          onClick={() => setCurrentQuestion(q => Math.min(totalQuestions, q + 1))}
        >
          {currentQuestion === totalQuestions ? "提交" : "下一题"}
        </button>
      </div>
    </div>
  );
};

export default AssessmentPage;