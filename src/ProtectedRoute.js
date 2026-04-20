import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // التحقق من وجود التوكن في المتصفح
  const token = localStorage.getItem('token');

  // إذا لم يكن هناك توكن، قم بتوجيهه فوراً إلى صفحة الدخول
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // إذا كان هناك توكن، اسمح له برؤية المكون المطلوب
  return children;
}