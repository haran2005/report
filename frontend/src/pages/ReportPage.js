import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import ReportForm from '../components/forms/ReportForm';
import desflyer from '../assets/desflyer.png';
function ReportPage() {
    return (_jsx(_Fragment, { children: _jsxs("div", { className: "w-full h-full min-h-screen bg-gray-100", children: [_jsxs("header", { className: "w-full h-auto m-auto", children: [_jsx("img", { src: desflyer, alt: "", className: 'w-auto m-auto' }), _jsx("h2", { className: "text-2xl tittle text-center", children: "Daily Report System" })] }), _jsx("div", { className: "w-full min-w-md rounded-lg  p-8", children: _jsx("main", { className: "w-full h-fit flex items-center justify-center transition duration-300 ", children: _jsx(ReportForm, {}) }) })] }) }));
}
export default ReportPage;
