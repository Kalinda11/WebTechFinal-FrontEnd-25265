import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UserService } from '../services/UserService';
import toast from 'react-hot-toast';

export const UserForm = ({ user, onUserSaved }) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setIsEditing(true);
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('phoneNumber', user.phoneNumber);
      setValue('firstName', user.firstName);
      setValue('lastName', user.lastName);
      setValue('role', user.role);
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      let savedUser;
      if (isEditing) {
        savedUser = await UserService.updateUser(user.id, data);
        toast.success('User updated successfully');
      } else {
        savedUser = await UserService.createUser(data);
        toast.success('User created successfully');
      }
      reset();
      onUserSaved(savedUser);  // Pass the saved user to the parent component to update the list
    } catch (error) {
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} user`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
          <input 
            {...register('username')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input 
            {...register('email')}
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input 
            {...register('firstName')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input 
            {...register('lastName')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input 
            {...register('phoneNumber')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" 
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Role</label>
          <select 
            {...register('role')}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          >
            <option value="ROLE_USER">User</option>
            <option value="ROLE_ADMIN">Admin</option>
          </select>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? 'Update User' : 'Create User'}
        </button>
      </div>
    </form>
  );
};
