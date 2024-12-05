import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserList } from '../users/UserList';
import { UserForm } from '../users/UserForm';
import { Toaster } from 'react-hot-toast';

export const Users = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear JWT from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-6 py-10 bg-gray-50 min-h-screen">
      <Toaster position="top-right" />
      
      {/* Positioned Sign Out Button - Right Corner */}
      <div className="absolute top-6 right-6">
        <button 
          onClick={handleSignOut}
          className="
            flex items-center justify-center 
            px-4 py-2 
            text-sm 
            bg-red-500 text-white 
            rounded-lg 
            hover:bg-red-600 
            transition-colors duration-300 
            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50
            shadow-md
          "
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-2" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L14.586 11H7a1 1 0 110-2h7.586l-1.293-1.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          Logout
        </button>
      </div>

      <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">User Management</h1>

      <div className="flex justify-center">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">User List</h2>
          <UserList />
        </div>
      </div>
    </div>
  );
};
