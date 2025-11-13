import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "../../lib/utils";
const inputStyle = 'w-full h-10 text text-lg rounded-lg border outline-none pl-2 bg-[#F3F3F5]';
export const Input = ({ label, name, value, type, placeholder, className, onChange }) => {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "w-full h-auto", children: [_jsx("label", { htmlFor: name, className: "text-lg text", children: label }), _jsx("input", { type: type, name: name, value: value, onChange: onChange, placeholder: placeholder, className: cn(className, inputStyle) })] }) }));
};
