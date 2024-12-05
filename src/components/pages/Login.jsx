import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';

const API_URL = "https://hospitalmis-46zd.onrender.com/api/auth";

const Login = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const url = API_URL + "/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Login error:', errorText);
        throw new Error(errorText || "Login failed");
      }

      const responseData = await response.json();
      localStorage.setItem("token", responseData.token);
      localStorage.setItem("role", responseData.role);
      localStorage.setItem("username", responseData.username);
      
      toast.success('Login Successful!', { 
        icon: '🎉', 
        style: { 
          borderRadius: '10px', 
          background: '#333', 
          color: '#fff' 
        } 
      });
      
      navigate("/users");
    } catch (e) {
      console.error('Login submission error:', e);
      toast.error(e.message, {
        style: { 
          borderRadius: '10px', 
          background: '#ff4b4b', 
          color: '#fff' 
        }
      });
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.pexels.com/photos/4040913/pexels-photo-4040913.jpeg?auto=compress&cs=tinysrgb&w=1600')" }}
    >
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-wider">
            Hospital Management
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <User className="mr-2 text-blue-500" size={18} />
                Username
              </label>
              <Controller
                name="username"
                control={control}
                defaultValue=""
                rules={{ 
                  required: "Username is required",
                  minLength: { value: 3, message: "Username must be at least 3 characters" }
                }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="relative">
                      <input
                        {...field}
                        type="text"
                        className={`w-full pl-10 pr-4 py-3 border ${
                          fieldState.error 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-blue-500'
                        } rounded-lg focus:outline-none focus:ring-2 transition duration-300`}
                        placeholder="Enter your username"
                      />
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Lock className="mr-2 text-blue-500" size={18} />
                Password
              </label>
              <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ 
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" }
                }}
                render={({ field, fieldState }) => (
                  <>
                    <div className="relative">
                      <input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        className={`w-full pl-10 pr-10 py-3 border ${
                          fieldState.error 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-blue-500'
                        } rounded-lg focus:outline-none focus:ring-2 transition duration-300`}
                        placeholder="Enter your password"
                      />
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600"
                      >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                    {fieldState.error && (
                      <p className="text-red-500 text-xs mt-1 flex items-center">
                        <span className="mr-1">⚠️</span>
                        {fieldState.error.message}
                      </p>
                    )}
                  </>
                )}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div>
                <a 
                  href="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
                >
                  Forgot Password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center justify-center"
            >
              Sign In
            </button>

            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Don't have an account? 
                <span 
                  onClick={() => navigate("/register")}
                  className="text-blue-600 ml-1 hover:underline cursor-pointer"
                >
                  Sign Up
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
