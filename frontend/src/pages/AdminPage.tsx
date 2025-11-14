import desflyer from '../assets/desflyer.png';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

interface Report {
  _id: string;
  username: string;
  date: string;
  report: string;
  createdAt: string;
}

// Map usernames to employee codes (customize this!)
const EMPLOYEE_MAP: Record<string, string> = {
  'DF_001': 'DF-01',
  'DF_002': 'DF-02',
  'DF_003': 'DF-03',
  'DF_004': 'DF-04',
  'DF_005': 'DF-05',
  // Add more as needed
};

function AdminPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/reports/all');
        setReports(res.data.reports || []);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to load reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Get unique dates (sorted descending)
  const uniqueDates = Array.from(
    new Set(reports.map((r) => r.date))
  ).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Get unique employees
  const employees = Array.from(new Set(reports.map((r) => r.username)))
    .map((username) => ({
      username,
      code: EMPLOYEE_MAP[username] || username.split('@')[0].toUpperCase(),
    }))
    .sort((a, b) => a.code.localeCompare(b.code));

  // Get report for a user on a specific date
  const getReportForUserAndDate = (username: string, date: string): string => {
    const report = reports.find((r) => r.username === username && r.date === date);
    return report ? report.report : '—';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading reports...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-600 text-center p-6 bg-red-50 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <img src={desflyer} alt="DesFlyer Logo" className="h-16 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Daily Report System
          </h1>
          <p className="text-gray-600 mt-2">Admin Dashboard</p>
        </header>

        {/* Empty State */}
        {reports.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No reports submitted yet.</p>
          </div>
        ) : (
          /* Responsive Table Container */
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold uppercase tracking-wider sticky left-0 bg-blue-700 z-10">
                      Date
                    </th>
                    {employees.map((emp) => (
                      <th
                        key={emp.username}
                        className="px-6 py-4 text-center text-sm font-semibold uppercase tracking-wider"
                      >
                        {emp.code}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {uniqueDates.map((date) => (
                    <tr
                      key={date}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 sticky left-0 bg-white z-10 border-r">
                        {format(new Date(date), 'dd MMM yyyy')}
                        <span className="block text-xs text-gray-500">
                          {format(new Date(date), 'EEEE')}
                        </span>
                      </td>
                      {employees.map((emp) => {
                        const report = getReportForUserAndDate(emp.username, date);
                        const isEmpty = report === '—';

                        return (
                          <td
                            key={emp.username}
                            className={`px-6 py-4 text-sm ${
                              isEmpty ? 'text-gray-400 italic' : 'text-gray-800'
                            }`}
                          >
                            {isEmpty ? (
                              <span className="text-center block">—</span>
                            ) : (
                              <div className="max-w-xs">
                                <p className="whitespace-pre-line text-xs leading-relaxed">
                                  {report}
                                </p>
                              </div>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="px-6 py-3 bg-gray-50 border-t text-xs text-gray-600">
              <span className="inline-block w-3 h-3 bg-gray-300 rounded mr-1"></span>{' '}
              — No report submitted
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminPage;