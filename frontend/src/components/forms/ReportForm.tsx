import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../base/Button'
import { Input } from '../base/Input'

interface FormData {
  date: string;
  userName?:string;
  report: string;
}

function ReportForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split('T')[0],
    report: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.report.trim()) return alert('Report cannot be empty');

    setLoading(true);
    try {
      await axios.post('/api/reports/all', formData);

      setSuccess('Report submitted successfully!');
      setFormData({ ...formData, report: '' });

      setTimeout(() => setSuccess(''), 4000);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to submit report');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
     <section className="w-[450px] h-auto rounded-2xl bg-white border-[rgba(0, 0, 0, 0.1)] px-5 border ">
          <header className="w-full h-auto m-auto">
            <h1 className="heading text-2xl my-2.5 text-center">
              Welcome Back 
            </h1>
            <p className="text text-xl mb-2.5 mt-1 text-center">
              Enter your Details
            </p>
            {success && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg">
          {success}
        </div>
      )}
          </header>
          <form onSubmit={handleSubmit} className="w-full h-auto m-auto flex items-center justify-center flex-col gap-5">
            <Input type='date' label='Date' value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}/>
            <div className="w-full h-auto">
                <label htmlFor="report" className="text-lg text">Report</label>
                <textarea name="report" id="report" value={formData.report}
            onChange={(e) => setFormData({ ...formData, report: e.target.value })}
            rows={10} className="w-full h-40 bg-[#F3F3F5] border text-md text m-auto rounded-lg outline-none pl-4" placeholder='Example Format Report :- (9 to 10)-Website work-for DesFlyer (10 tp 12.30) - Cafe cup website world (1.15 to 4.30)-Again website work and app motioning'></textarea>
            </div>
            <Button variant={'primary'} type='submit' className=' rounded-lg'>
              {loading ? 'Submitting...' : 'Submit Your Report'}
            </Button>
          </form>
        </section>
    </>
  )
}

export default ReportForm