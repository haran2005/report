import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button } from '../base/Button';
import logout from '../../assets/logout.png';
function Header() {
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "w-full h-20 bg-white flex items-center justify-between px-5", children: [_jsxs("div", { className: "w-fit h-full p-2", children: [_jsx("h2", { className: "text-lg text", children: "Welcome, Saravanankodi" }), _jsx("p", { className: "text-lg text", children: "CEO" })] }), _jsxs(Button, { variant: 'secoundary', children: [_jsx("img", { src: logout, alt: "" }), "Logout"] })] }) }));
}
export default Header;
