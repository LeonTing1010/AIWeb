#!/bin/bash

# 安装依赖
echo "正在安装依赖..."
npm install
npm install --save-dev @types/uuid

# 启动开发服务器
echo "启动开发服务器..."
echo "请在浏览器中访问: http://localhost:5173/test-auth"
echo "通过测试页面进行登录注册功能测试"
npm run dev 