import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface PrivateRouteProps {
  children: React.ReactElement;
}

/**
 * 私有路由组件，用于保护需要登录才能访问的页面
 * 如果用户未登录，则重定向到登录页面
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  
  // 如果用户已登录，则渲染子组件
  // 否则重定向到登录页面，并传递当前路径作为查询参数
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute; 