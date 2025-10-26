'use client';

import { useState } from 'react';
import { api } from '@/lib/api';

export function AuthForms() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);
    setError(null);

    try {
      if (isLogin) {
        const response = await api.login({ email, password });
        setFeedback(`Logged in as ${response.user.name} (token: ${response.token})`);
      } else {
        const response = await api.register({ name, email, password });
        setFeedback(`Welcome ${response.user.name}! Your account is ready.`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-900">{isLogin ? 'Login' : 'Create account'}</h2>
        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="text-xs font-semibold text-pink-500"
        >
          {isLogin ? 'Need an account?' : 'Have an account?'}
        </button>
      </div>
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        {!isLogin ? (
          <label className="block text-sm">
            <span className="text-slate-600">Name</span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
            />
          </label>
        ) : null}
        <label className="block text-sm">
          <span className="text-slate-600">Email</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="text-slate-600">Password</span>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2"
          />
        </label>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-pink-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600 disabled:cursor-not-allowed disabled:bg-pink-300"
        >
          {isSubmitting ? 'Submitting…' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      {feedback ? <p className="mt-4 text-xs text-emerald-500">{feedback}</p> : null}
      {error ? <p className="mt-4 text-xs text-red-500">{error}</p> : null}
    </div>
  );
}
