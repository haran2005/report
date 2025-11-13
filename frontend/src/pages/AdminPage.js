import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import desflyer from '../assets/desflyer.png';
import { useState, useEffect } from 'react';
import axios from 'axios';
function AdminPage() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/reports/all');
                setReports(res.data.reports);
                setLoading(false);
            }
            catch (err) {
                setError(err.response?.data?.message || 'Failed to load reports');
                setLoading(false);
            }
        };
        fetchReports();
    }, []);
    if (loading)
        return _jsx("div", { className: "text-center py-10 text-xl", children: "Loading reports..." });
    if (error)
        return _jsx("div", { className: "text-red-600 text-center py-10", children: error });
    return (_jsx(_Fragment, { children: _jsxs("section", { className: "w-full h-full m-auto", children: [_jsxs("header", { className: "w-full h-auto", children: [_jsx("img", { src: desflyer, alt: "", className: "w-auto m-auto" }), _jsx("h2", { className: "tittle text-2xl text-center", children: "Over All Employee-Daily Report System" })] }), reports.length === 0 ? (_jsx("p", { className: "text-center text-gray-600 text-lg", children: "No reports submitted yet." })) : (
                // <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                //   {reports.map((r) => (
                //     <div
                //       key={r._id}
                //       className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border border-gray-200"
                //     >
                //       <div className="flex justify-between items-start mb-4">
                //         <div>
                //           <h3 className="text-xl font-bold text-blue-700">{r.username}</h3>
                //           <p className="text-sm text-gray-500">
                //             Submitted: {format(new Date(r.createdAt), 'dd MMM yyyy, hh:mm a')}
                //           </p>
                //         </div>
                //         <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                //           {format(new Date(r.date), 'dd MMM yyyy')}
                //         </span>
                //       </div>
                //       <div className="bg-gray-50 p-4 rounded-lg">
                //         <p className="text-gray-800 whitespace-pre-wrap leading-relaxed">
                //           {r.report}
                //         </p>
                //       </div>
                //     </div>
                //   ))}
                // </div>
                _jsx("table", { className: "w-full h-full border m-auto", children: _jsxs("thead", { className: 'border', children: [_jsx("th", { className: "text border", children: "Date" }), _jsx("th", { className: "text border", children: "DF-01" }), _jsx("th", { className: "text border", children: "DF-02" }), _jsx("th", { className: "text border", children: "DF-03" }), _jsx("th", { className: "text border", children: "DF-04" }), _jsx("th", { className: "text border", children: "DF-05" })] }) }))] }) }));
}
export default AdminPage;
