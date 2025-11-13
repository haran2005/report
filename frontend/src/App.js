import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/LoginPage';
// import Dashboard from './components/forms/AttendanceForm';
// import AdminPanel from './pages/EmpolyeeInfo';
// import UserDashboard from './components/forms/ReportForm';
import ReportPage from './pages/ReportPage';
import AdminPage from './pages/AdminPage';
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useAuth();
    if (!user)
        return _jsx(Navigate, { to: "/login" });
    if (!allowedRoles.includes(user.role))
        return _jsx(Navigate, { to: "/" });
    return children;
};
function App() {
    return (_jsx("section", { className: "w-screen h-auto", children: _jsx(AuthProvider, { children: _jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsx(Route, { path: "/admin", element: _jsx(ProtectedRoute, { allowedRoles: ['admin'], children: _jsx(AdminPage, {}) }) }), _jsx(Route, { path: "/", element: _jsx(ProtectedRoute, { allowedRoles: ['user'], children: _jsx(ReportPage, {}) }) })] }) }) }) }));
}
export default App;
