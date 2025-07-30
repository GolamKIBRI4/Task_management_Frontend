import { useState } from "react";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { login } from "../features/auth/authSlice";

import { useAppDispatch, useAppSelector } from "../types/interfaces";

import loginBg from "../assets/logger.svg";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token, error } = useAppSelector((s) => s.auth);

  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(login(form)).unwrap();
      navigate("/todos");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.message || "Unknown error");
    }
  };

  if (token) return <Navigate to="/todos" replace />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-3xl bg-white  shadow-xl overflow-hidden m-4">
        {/* Left*/}
        <div
          className="hidden md:flex md:w-1/2 relative"
          style={{
            backgroundImage: `url(${loginBg})`,
            backgroundSize: "cover",
            backgroundPosition: "left",
            backgroundColor: "#040612",
          }}
        ></div>
        {/* Right  */}
        <div className="flex w-full md:w-1/2 items-center justify-center p-8">
          <div className="w-full space-y-6">
            <div>
              <h2 className="text-center text-3xl font-poppins font-bold text-gray-900">
                Login
              </h2>
              <p className="text-center text-sm text-[#667085]">
                Welcome Back, Please Enter your Details to Login.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700">
                  <strong>Email Address</strong>
                </label>
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
                <label className="block text-gray-700">
                  <strong>Password</strong>
                </label>
                <input
                  type="password"
                  placeholder="**********"
                  className="mt-1 w-full border rounded-lg p-2 outline-none border-[#E1E1E1] bg-[#FFFFFF]"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center text-sm text-gray-700">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-[#667085] hover:underline">
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full py-2 text-[#1F1F1F] rounded-lg transition bg-[#60E5AE] focus:outline-none focus:ring-2 "
              >
                <strong>Log In</strong>
              </button>
              {error && <div className="text-center text-red-500">{error}</div>}
            </form>
            <p className="text-center text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-[#667085] hover:underline">
                Sign Up
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
}
