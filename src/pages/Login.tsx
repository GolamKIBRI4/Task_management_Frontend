/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../types/interfaces';

const Login=()=> {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, error } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(form)).unwrap();  // ✅ typed, no cast needed
      navigate('/todos');
    } catch (err: any) {
      console.error(err?.message || 'Unknown error');
    }
  };

  if (token) return <Navigate to="/todos" replace />;

  return (
    <>

      <button onClick={() => navigate('/register')}>Register</button>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit">Login</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </form>
    </>
  );
}
export default Login;
  






