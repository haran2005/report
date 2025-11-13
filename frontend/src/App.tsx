import { JSX } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/LoginPage';
// import Dashboard from './components/forms/AttendanceForm';
// import AdminPanel from './pages/EmpolyeeInfo';
// import UserDashboard from './components/forms/ReportForm';
import ReportPage from './pages/ReportPage';
import AdminPage from './pages/AdminPage';

const ProtectedRoute = ({ children, allowedRoles }: { children: JSX.Element , allowedRoles: string[] }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <section className="w-screen h-auto">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            {/* <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['user', 'admin']}>
                <Dashboard />
              </ProtectedRoute>
            } /> */}
            <Route path="/admin" element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminPage/>
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute allowedRoles={['user']}>
                <ReportPage/>
              </ProtectedRoute>
            } />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </section>
  );
}

export default App;