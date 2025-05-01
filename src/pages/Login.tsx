import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { login, clearError } from '../store/userSlice';
import { RootState } from '../store';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state: RootState) => state.user);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // 如果已登录，重定向到首页
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  // 清除Redux错误
  React.useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  
  // 表单验证
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!email) {
      errors.email = t('login.errors.emailRequired');
    }
    
    if (!password) {
      errors.password = t('login.errors.passwordRequired');
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // 提交表单
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(login({ email, password }));
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <h2>{t('login.title')}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">{t('login.email')}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={formErrors.email ? 'error' : ''}
            />
            {formErrors.email && <div className="error-text">{formErrors.email}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <div className="error-text">{formErrors.password}</div>}
          </div>
          
          <button type="submit" className="login-button">
            {t('login.submit')}
          </button>
        </form>
        
        <div className="register-link">
          {t('login.noAccount')} <Link to="/register">{t('login.registerLink')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 