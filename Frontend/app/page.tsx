'use client';
import { useState } from 'react';
import api from '../src/lib/axios';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); 
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin ? { email, password } : { name, email, password };
      
      const { data } = await api.post(endpoint, payload);
      
      localStorage.setItem('token', data.token);
      
      // Redirect to dashboard now that login is successful
      router.push('/dashboard'); 
    } catch (err: any) {
      alert(err.response?.data?.message || 'Something went wrong. Is Backend running?');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          {isLogin ? 'Sign In' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              required
              className="w-full rounded-md border border-gray-300 p-3"
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            required
            className="w-full rounded-md border border-gray-300 p-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full rounded-md border border-gray-300 p-3"
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <button type="submit" className="w-full rounded-md bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700">
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-blue-600 hover:underline">
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </div>
    </main>
  );
}