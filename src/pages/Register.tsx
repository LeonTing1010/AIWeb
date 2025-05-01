import React, { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { register, clearError } from '../store/userSlice';
import { RootState } from '../store';

const Register: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, isAuthenticated } = useSelector((state: RootState) => state.user);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [privacyChecked, setPrivacyChecked] = useState(false);
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
    
    // 验证邮箱
    if (!email) {
      errors.email = t('register.errors.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = t('register.errors.invalidEmail');
    }
    
    // 验证密码
    if (!password) {
      errors.password = t('register.errors.passwordRequired');
    } else if (password.length < 6) {
      errors.password = t('register.errors.passwordTooShort');
    }
    
    // 验证确认密码
    if (password !== confirmPassword) {
      errors.confirmPassword = t('register.errors.passwordMismatch');
    }
    
    // 验证隐私协议
    if (!privacyChecked) {
      errors.privacy = t('register.errors.privacyRequired');
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // 提交表单
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      dispatch(register({ email, password }));
    }
  };
  
  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2>{t('register.title')}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="email">{t('register.email')}</label>
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
            <label htmlFor="password">{t('register.password')}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={formErrors.password ? 'error' : ''}
            />
            {formErrors.password && <div className="error-text">{formErrors.password}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmPassword">{t('register.confirmPassword')}</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={formErrors.confirmPassword ? 'error' : ''}
            />
            {formErrors.confirmPassword && <div className="error-text">{formErrors.confirmPassword}</div>}
          </div>
          
          <div className="privacy-agreement">
            <input
              type="checkbox"
              id="privacy"
              checked={privacyChecked}
              onChange={(e) => setPrivacyChecked(e.target.checked)}
            />
            <label htmlFor="privacy">
              {t('register.privacyAgreement')} <Link to="/privacy">{t('register.privacyLink')}</Link>
            </label>
            {formErrors.privacy && <div className="error-text">{formErrors.privacy}</div>}
          </div>
          
          <button type="submit" className="register-button">
            {t('register.submit')}
          </button>
        </form>
        
        <div className="login-link">
          {t('register.alreadyHaveAccount')} <Link to="/login">{t('register.loginLink')}</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 