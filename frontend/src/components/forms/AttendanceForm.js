import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input } from '../base/Input';
import { Button } from '../base/Button';
function AttendanceForm() {
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "w-[450px] h-[520px] rounded-2xl bg-white border-[rgba(0, 0, 0, 0.1)] px-5 border ", children: [_jsxs("header", { className: "w-full h-auto m-auto", children: [_jsx("h1", { className: "heading text-2xl my-2.5 text-center", children: "Welcome Back Admin" }), _jsx("p", { className: "text text-xl mb-2.5 mt-1 text-center", children: "Enter your Details" })] }), _jsxs("form", { action: "", className: "w-full h-auto m-auto flex items-center justify-center flex-col gap-2.5", children: [_jsx(Input, { type: 'text', label: 'Employee ID' }), _jsx(Input, { type: 'date', label: 'Date' }), _jsx(Input, { type: 'time', label: 'In Time' }), _jsx(Input, { type: 'time', label: 'Out Time' }), _jsx(Button, { variant: 'primary', className: ' rounded-lg', children: "Mark Attendance" })] })] }) }));
}
export default AttendanceForm;
