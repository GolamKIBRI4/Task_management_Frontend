import { useState } from "react";
import { register } from "../features/auth/authSlice";
import { useNavigate, Link, Navigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from '../types/interfaces';
import bgimage from "../assets/sinner.png";


const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { error, token } = useAppSelector((s) => s.auth);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(register(form)).unwrap();
      navigate('/todos');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.message || 'Unknown error');
    }
  };

  if (token) return <Navigate to="/todos" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-3xl bg-white  shadow-xl overflow-hidden m-4">
        {/* Left  */}
                       <div
          className="hidden md:flex md:w-1/2 relative"
          style={{
            backgroundImage: `url(${bgimage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'left',
            backgroundColor: '#040612',
          }}
        >
        </div>
        {/* Right */}
        <div className="flex w-full md:w-1/2 items-center justify-center p-8">
          <div className="w-full space-y-6">
                      <div>
                <h2 className="text-center text-3xl font-poppins font-bold text-gray-900">
                   Sign Up
                </h2>
                <p className="text-center text-sm text-[#667085]">To Create Account. Please fill in the Form Below</p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700"><strong>Full Name</strong></label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="mt-1 w-full border rounded-lg p-2 outline-none border-[#E1E1E1] bg-[#FFFFFF]"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700"><strong>Email Address</strong></label>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="mt-1 w-full border rounded-lg p-2 outline-none border-[#E1E1E1] bg-[#FFFFFF]"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700"><strong>Password</strong></label>
                <input
                  type="password"
                  placeholder="**********"
                  className="mt-1 w-full border rounded-lg p-2 outline-none border-[#E1E1E1] bg-[#FFFFFF]"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 text-white rounded-lg  bg-[#60E5AE] transition"
                
              >
                Sign Up
              </button>
              {error && <div className="text-center text-red-500">{error}</div>}
            </form>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <Link to="/" className="text-[#667085] hover:underline">
                Log In
              </Link>
            </p>
            <div className="flex items-center">
              <div className="flex-grow h-px bg-gray-300"></div>
              <span className="mx-2 text-gray-400">Or</span>
              <div className="flex-grow h-px bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
