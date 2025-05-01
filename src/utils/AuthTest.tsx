import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register, login, logout } from '../store/userSlice';
import { RootState } from '../store';

/**
 * 用户认证功能测试组件
 * 此组件用于测试注册、登录和登出功能
 */
const AuthTest: React.FC = () => {
  const dispatch = useDispatch();
  const { currentUser, isAuthenticated, error } = useSelector((state: RootState) => state.user);
  
  // 测试状态
  const [testResults, setTestResults] = useState<{
    registerSuccess: boolean | null;
    loginSuccess: boolean | null;
    logoutSuccess: boolean | null;
    message: string;
  }>({
    registerSuccess: null,
    loginSuccess: null,
    logoutSuccess: null,
    message: '准备开始测试...'
  });
  
  // 测试使用的邮箱和密码
  const testEmail = `test${Date.now()}@example.com`;
  const testPassword = 'test123456';
  
  // 执行测试
  const runTests = async () => {
    // 清空之前的测试结果
    setTestResults({
      registerSuccess: null,
      loginSuccess: null,
      logoutSuccess: null,
      message: '正在测试...'
    });
    
    try {
      // 1. 测试注册功能
      await testRegister();
      
      // 2. 测试登出功能
      await testLogout();
      
      // 3. 测试登录功能
      await testLogin();
      
      // 4. 再次测试登出功能
      await testLogout();
      
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        message: `测试过程中出错: ${error}`
      }));
    }
  };
  
  // 测试注册
  const testRegister = () => {
    return new Promise<void>((resolve) => {
      // 分发注册action
      dispatch(register({ email: testEmail, password: testPassword }));
      
      // 使用setTimeout来等待action完成
      setTimeout(() => {
        const success = isAuthenticated && currentUser?.email === testEmail;
        setTestResults(prev => ({
          ...prev,
          registerSuccess: success,
          message: success 
            ? `注册成功! 用户: ${currentUser?.email}` 
            : `注册失败! 错误: ${error || '未知错误'}`
        }));
        resolve();
      }, 500);
    });
  };
  
  // 测试登录
  const testLogin = () => {
    return new Promise<void>((resolve) => {
      // 分发登录action
      dispatch(login({ email: testEmail, password: testPassword }));
      
      // 使用setTimeout来等待action完成
      setTimeout(() => {
        const success = isAuthenticated && currentUser?.email === testEmail;
        setTestResults(prev => ({
          ...prev,
          loginSuccess: success,
          message: success 
            ? `登录成功! 用户: ${currentUser?.email}` 
            : `登录失败! 错误: ${error || '未知错误'}`
        }));
        resolve();
      }, 500);
    });
  };
  
  // 测试登出
  const testLogout = () => {
    return new Promise<void>((resolve) => {
      // 分发登出action
      dispatch(logout());
      
      // 使用setTimeout来等待action完成
      setTimeout(() => {
        const success = !isAuthenticated && !currentUser;
        setTestResults(prev => ({
          ...prev,
          logoutSuccess: success,
          message: success 
            ? '登出成功!' 
            : '登出失败!'
        }));
        resolve();
      }, 500);
    });
  };
  
  // 样式定义
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    border: '1px solid #eee',
    borderRadius: '8px'
  };
  
  const controlsStyle = {
    margin: '20px 0'
  };
  
  const resultsStyle = {
    margin: '20px 0',
    padding: '15px',
    background: '#f9f9f9',
    borderRadius: '5px'
  };
  
  const messageStyle = {
    fontWeight: 'bold',
    marginBottom: '15px'
  };
  
  const resultItemStyle = {
    margin: '10px 0'
  };
  
  const successStyle = {
    color: 'green',
    fontWeight: 'bold'
  };
  
  const failureStyle = {
    color: 'red',
    fontWeight: 'bold'
  };
  
  const statusStyle = {
    marginTop: '30px',
    padding: '15px',
    background: '#f0f0f0',
    borderRadius: '5px'
  };
  
  return (
    <div style={containerStyle}>
      <h2>用户认证功能测试</h2>
      
      <div style={controlsStyle}>
        <button onClick={runTests}>开始测试</button>
      </div>
      
      <div style={resultsStyle}>
        <h3>测试结果</h3>
        <p style={messageStyle}>{testResults.message}</p>
        
        <div style={resultItemStyle}>
          <span>注册功能: </span>
          {testResults.registerSuccess === null ? '未测试' :
            testResults.registerSuccess ? 
              <span style={successStyle}>成功</span> : 
              <span style={failureStyle}>失败</span>
          }
        </div>
        
        <div style={resultItemStyle}>
          <span>登录功能: </span>
          {testResults.loginSuccess === null ? '未测试' :
            testResults.loginSuccess ? 
              <span style={successStyle}>成功</span> : 
              <span style={failureStyle}>失败</span>
          }
        </div>
        
        <div style={resultItemStyle}>
          <span>登出功能: </span>
          {testResults.logoutSuccess === null ? '未测试' :
            testResults.logoutSuccess ? 
              <span style={successStyle}>成功</span> : 
              <span style={failureStyle}>失败</span>
          }
        </div>
      </div>
      
      <div style={statusStyle}>
        <h3>当前状态</h3>
        <p>
          登录状态: {isAuthenticated ? '已登录' : '未登录'}<br />
          {currentUser && `当前用户: ${currentUser.email}`}
        </p>
      </div>
    </div>
  );
};

export default AuthTest; 