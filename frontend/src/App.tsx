// src/App.tsx
import { JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/LoginPage';
import ReportPage from './pages/ReportPage';
import AdminPage from './pages/AdminPage';

// LOADING SPINNER COMPONENT
const LoadingSpinner = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
  </div>
);

// PROTECTED ROUTE — NOW WAITS FOR isLoading
const ProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: JSX.Element; 
  allowedRoles: string[] 
}) => {
  const { user, isLoading } = useAuth();

  // 1. Still loading user from token?
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // 2. Not logged in?
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. Role not allowed?
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // 4. All good!
  return children;
};

function App() {
  return (
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />

            <Route
              path="/"
              element={
                <ProtectedRoute allowedRoles={['user']}>
                  <ReportPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPage />
                </ProtectedRoute>
              }
            />

            {/* Optional: Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
  );
}

export default App;