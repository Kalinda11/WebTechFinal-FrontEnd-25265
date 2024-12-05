import React, { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { 
  Eye, EyeOff, Lock, User, Mail, Phone, 
  UserPlus,    Clipboard
} from 'lucide-react';
import toast from 'react-hot-toast';
import { UserService } from '../services/UserService';

const Register = () => {
  const { control, handleSubmit, watch, formState: { errors }, register } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = async (data) => {
    try {
      const registrationData = {
        username: data.username,
        email: data.email,
        password: data.password,
        phoneNumber: data.phoneNumber,
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role || 'ROLE_USER', 
       
      };

      const savedUser = await UserService.createUser(registrationData);
      
      toast.success('Registration Successful!', { 
        icon: '🎉', 
        style: { 
          borderRadius: '10px', 
          background: '#333', 
          color: '#fff' 
        } 
      });
      
      navigate("/login");
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.', {
        style: { 
          borderRadius: '10px', 
          background: '#ff4b4b', 
          color: '#fff' 
        }
      });
    }
  };

  const validatePasswordMatch = (value) => {
    const password = watch("password");
    return value === password || "Passwords do not match";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-blue-600 p-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl overflow-hidden transform transition-all hover:scale-105 duration-300">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6 tracking-wider flex items-center justify-center">
            <UserPlus className="mr-3 text-purple-500" size={36} />
            Hospital Management Registration
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <User className="mr-2 text-purple-500" size={18} />
                  Username
                </label>
                <Controller
                  name="username"
                  control={control}
                  rules={{ 
                    required: "Username is required",
                    minLength: { value: 3, message: "Username must be at least 3 characters" }
                  }}
                  render={({ field, fieldState }) => (
                    <>
                      <input 
                        {...field}
                        className={`w-full pl-3 py-2 border rounded ${
                          fieldState.error 
                            ? 'border-red-500 focus:ring-red-500' 
                            : 'border-gray-300 focus:ring-purple-500'
                        } focus:outline-none focus:ring-2 transition duration-300`}
                        placeholder="Choose a username"
                      />
                      {fieldState.error && (
                        <p className="text-red-500 text-xs mt-1">
                          {fieldState.error.message}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <Mail className="mr-2 text-purple-500" size={18} />
                  Email
                </label>
                <input
                  type="email"
                  {...register('email', {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Invalid email address"
                    }
                  })}
                  className={`w-full pl-3 py-2 border rounded ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-purple-500'
                  } focus:outline-none focus:ring-2 transition duration-300`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <Clipboard className="mr-2 text-purple-500" size={18} />
                  Role
                </label>
                <select 
                  {...register('role')}
                  className="w-full pl-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
                >
                  <option value="ROLE_USER">User</option>
                  <option value="ROLE_ADMIN">Admin</option>
                </select>
              </div>

            


{/* First Name */}
<div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  First Name
                </label>
                <input 
                  {...register('firstName', { 
                    required: 'First Name is required',
                    minLength: { value: 2, message: 'First Name must be at least 2 characters' }
                  })}
                  className={`w-full pl-3 py-2 border rounded ${
                    errors.firstName 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-purple-500'
                  } focus:outline-none focus:ring-2 transition duration-300`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name
                </label>
                <input 
                  {...register('lastName', { 
                    required: 'Last Name is required',
                    minLength: { value: 2, message: 'Last Name must be at least 2 characters' }
                  })}
                  className={`w-full pl-3 py-2 border rounded ${
                    errors.lastName 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-purple-500'
                  } focus:outline-none focus:ring-2 transition duration-300`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <Phone className="mr-2 text-purple-500" size={18} />
                  Phone Number
                </label>
                <input 
                  {...register('phoneNumber', { 
                    required: 'Phone Number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone Number must be 10 digits'
                    }
                  })}
                  className={`w-full pl-3 py-2 border rounded ${
                    errors.phoneNumber 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-purple-500'
                  } focus:outline-none focus:ring-2 transition duration-300`}
                  placeholder="Enter your phone number"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <Lock className="mr-2 text-purple-500" size={18} />
                  Password
                </label>
                <div className="relative">
                  <input 
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className={`w-full pl-3 pr-10 py-2 border rounded ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-purple-500'
                    } focus:outline-none focus:ring-2 transition duration-300`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2 flex items-center">
                  <Lock className="mr-2 text-purple-500" size={18} />
                  Confirm Password
                </label>
                <div className="relative">
                  <input 
                    {...register('confirmPassword', { 
                      required: 'Please confirm your password',
                      validate: validatePasswordMatch
                    })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`w-full pl-3 pr-10 py-2 border rounded ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 focus:ring-purple-500'
                    } focus:outline-none focus:ring-2 transition duration-300`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            
              
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            >
              Register
            </button>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600">
                Already have an account? 
                <span 
                  onClick={() => navigate("/login")}
                  className="text-blue-600 ml-1 hover:underline cursor-pointer"
                >
                  Login
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
