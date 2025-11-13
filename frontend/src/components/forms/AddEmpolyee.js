import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input } from '../base/Input';
import { Button } from '../base/Button';
function AddEmpolyee() {
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "w-3/4 transition duration-300 ", children: [_jsx("header", { className: "w-full h-auto m-auto", children: _jsx("h1", { className: "heading text-4xl my-2.5 text-center", children: "Add Employees" }) }), _jsxs("form", { action: "", className: "w-full h-auto m-auto flex items-center justify-center flex-col gap-2.5", children: [_jsx(Input, { type: 'text', label: 'Create Employee ID', placeholder: 'Create Employee ID' }), _jsx(Input, { type: 'text', label: 'Enter Employee Name', placeholder: 'Enter Employee Name' }), _jsx(Input, { type: 'text', label: 'Enter Employee Position', placeholder: 'Enter Employee Position' }), _jsx(Input, { type: 'text', label: 'Notes (Optional)', placeholder: 'Any additional notes...' }), _jsx(Button, { variant: 'primary', className: ' rounded-lg', children: "Add Employees" })] })] }) }));
}
export default AddEmpolyee;
