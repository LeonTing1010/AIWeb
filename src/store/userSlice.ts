import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { encryptData, decryptData } from '../utils/encryption';

// 定义用户状态接口
export interface User {
  id: string;
  email: string;
  createdAt: string;
  lastLogin: string;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

// 从localStorage获取用户数据
const loadUserFromStorage = (): User | null => {
  try {
    const encryptedUser = localStorage.getItem('user');
    if (!encryptedUser) return null;
    
    const decryptedUser = decryptData(encryptedUser);
    return JSON.parse(decryptedUser);
  } catch (error) {
    console.error('Failed to load user from storage:', error);
    return null;
  }
};

// 初始化状态
const initialState: UserState = {
  currentUser: loadUserFromStorage(),
  isAuthenticated: !!loadUserFromStorage(),
  error: null
};

// 创建slice
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register: (state, action: PayloadAction<{ email: string; password: string }>) => {
      try {
        const { email, password } = action.payload;
        
        // 检查邮箱是否已存在
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        if (users[email]) {
          state.error = 'Email already exists';
          return;
        }
        
        // 创建新用户
        const newUser: User = {
          id: uuidv4(),
          email,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };
        
        // 存储用户
        users[email] = {
          id: newUser.id,
          // 实际项目中应该使用单向哈希函数处理密码
          password: encryptData(password),
          createdAt: newUser.createdAt
        };
        
        localStorage.setItem('users', JSON.stringify(users));
        
        // 登录用户
        state.currentUser = newUser;
        state.isAuthenticated = true;
        state.error = null;
        
        // 加密存储当前用户信息
        localStorage.setItem('user', encryptData(JSON.stringify(newUser)));
      } catch (error) {
        console.error('Registration failed:', error);
        state.error = 'Registration failed';
      }
    },
    
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      try {
        const { email, password } = action.payload;
        
        // 获取用户数据
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const user = users[email];
        
        if (!user || decryptData(user.password) !== password) {
          state.error = 'Invalid email or password';
          return;
        }
        
        // 更新登录信息
        const currentUser: User = {
          id: user.id,
          email,
          createdAt: user.createdAt,
          lastLogin: new Date().toISOString()
        };
        
        state.currentUser = currentUser;
        state.isAuthenticated = true;
        state.error = null;
        
        // 更新存储
        localStorage.setItem('user', encryptData(JSON.stringify(currentUser)));
      } catch (error) {
        console.error('Login failed:', error);
        state.error = 'Login failed';
      }
    },
    
    logout: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('user');
    },
    
    clearError: (state) => {
      state.error = null;
    }
  }
});

// 导出action creators
export const { register, login, logout, clearError } = userSlice.actions;

// 导出reducer
export default userSlice.reducer; 