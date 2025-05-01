import React from 'react';
import AuthTest from '../utils/AuthTest';

const TestAuth: React.FC = () => {
  return (
    <div className="test-auth-page">
      <h1>用户身份验证功能测试</h1>
      <p className="description">
        此页面用于测试用户注册、登录和登出功能。点击"开始测试"按钮将自动执行测试流程。
      </p>
      
      <div className="test-container">
        <AuthTest />
      </div>
      
      <div className="test-instructions">
        <h3>测试说明</h3>
        <ol>
          <li>测试会使用随机生成的邮箱创建一个新账户</li>
          <li>测试注册功能，验证用户是否成功创建并登录</li>
          <li>测试登出功能，验证用户是否成功退出登录</li>
          <li>测试登录功能，使用刚创建的账户凭据再次登录</li>
          <li>最后再次测试登出功能</li>
        </ol>
        <p>
          所有测试数据将存储在浏览器的localStorage中，您可以通过浏览器开发工具查看。
        </p>
      </div>
      
      <div className="manual-test">
        <h3>手动测试</h3>
        <p>
          您也可以通过以下链接手动测试认证功能：
        </p>
        <ul>
          <li><a href="/register">注册页面</a> - 创建新账户</li>
          <li><a href="/login">登录页面</a> - 使用现有账户登录</li>
          <li><a href="/">首页</a> - 查看导航栏中的登录状态</li>
        </ul>
      </div>
    </div>
  );
};

export default TestAuth; 