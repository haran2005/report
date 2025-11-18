import React from 'react'
import { Input } from '../base/Input'
import { Button } from '../base/Button'
import { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (loading) return;

  setLoading(true);
  try {
    const loggedInUser = await login(email, password);

    // Role-based redirection
    if (loggedInUser.role === 'admin') {
      navigate('/admin', { replace: true });
      console.log("login as admin")
    } else {
      navigate('/', { replace: true }); 
      console.log("login as user")
    }
  } catch (err: any) {
    alert(err.response?.data?.message || 'Login failed. Check your credentials.');
  } finally {
    setLoading(false);
  }
};
  return (
    <>
    <section className="w-full h-full p-5">
        <header className="w-full h-auto p-2">
            <h2 className="heading text-3xl my-3 text-center">
                ADMIN LOGIN
            </h2>
            <p className="text text-[18px]">
                Login with your <span className="text-[#0496ff]">admin</span> credential.
            </p>
        </header>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5 items-center justify-center">
            <Input type='email' placeholder='Enter username...' onChange={(e) => setEmail(e.target.value)} />
            <Input type='password' placeholder='Enter password...' onChange={(e) => setPassword(e.target.value)}/>
            <Button variant={'primary'} type='submit' className='w-full h-10 rounded-full'>LOGIN</Button>
        </form>
    </section>
    </>
  )
}

export default LoginForm