import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import bgImg from '../assets/bg.png';
import logo from '../assets/logo.png';
import LoginForm from '../components/forms/LoginForm';
function LoginPage() {
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "w-full h-screen overflow-hidden flex items-center justify-center m-auto", children: [_jsx("aside", { className: "w-3/5 h-full m-auto", children: _jsx("img", { src: bgImg, alt: "", className: 'h-auto w-full' }) }), _jsxs("main", { className: "w-2/5 h-full flex flex-col items-center justify-center gap-5", children: [_jsx("header", { className: "w-full h-fit m-auto", children: _jsx("img", { src: logo, alt: "", className: 'block w-1/2 h-auto m-auto ' }) }), _jsx(LoginForm, {})] })] }) }));
}
export default LoginPage;
