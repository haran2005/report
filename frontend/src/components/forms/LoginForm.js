import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input } from '../base/Input';
import { Button } from '../base/Button';
import { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const { login } = useAuth();
    // const navigate = useNavigate();
    // const handleSubmit = async (e: React.FormEvent) => {
    //   e.preventDefault();
    //   try {
    //     await login(email, password);
    //     navigate('/');
    //   } catch (err) {
    //     alert('Login failed');
    //   }
    // };
    const { login } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading)
            return;
        setLoading(true);
        try {
            const loggedInUser = await login(email, password); // gets user with role
            // Role-based redirection
            if (loggedInUser.role === 'admin') {
                navigate('/admin', { replace: true });
            }
            else {
                navigate('/', { replace: true }); // Report page for normal users
            }
        }
        catch (err) {
            alert(err.response?.data?.message || 'Login failed. Check your credentials.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "w-full h-full p-5", children: [_jsxs("header", { className: "w-full h-auto p-2", children: [_jsx("h2", { className: "heading text-3xl my-3 text-center", children: "ADMIN LOGIN" }), _jsxs("p", { className: "text text-[18px]", children: ["Login with your ", _jsx("span", { className: "text-[#0496ff]", children: "admin" }), " credential."] })] }), _jsxs("form", { onSubmit: handleSubmit, className: "w-full flex flex-col gap-5 items-center justify-center", children: [_jsx(Input, { type: 'email', placeholder: 'Enter username...', onChange: (e) => setEmail(e.target.value) }), _jsx(Input, { type: 'password', placeholder: 'Enter password...', onChange: (e) => setPassword(e.target.value) }), _jsx(Button, { variant: 'primary', type: 'submit', className: 'w-full h-10 rounded-full', children: "LOGIN" })] })] }) }));
}
export default LoginForm;
