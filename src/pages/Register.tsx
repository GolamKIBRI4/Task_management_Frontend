import { useState } from "react";
import { register } from "../features/auth/authSlice";
import type { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../types/interfaces';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, token } = useAppSelector((s: RootState) => s.auth);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        try {
          await dispatch(register(form)).unwrap();  // ✅ typed, no cast needed
          navigate('/todos');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          console.error(err?.message || 'Unknown error');
        }
  };

  if (token) return <div>Already logged in.</div>;

  return (
    <>
      <div>
        <button onClick={() => navigate("/")}>Login</button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
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
          <button type="submit">Register</button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      </div>
    </>
  );
}

export default Register;
  

