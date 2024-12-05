import { api } from '../Utils/Api';
export const UserService = {
  getAllUsers: async () => {
    const response = await api.get('/all');
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get(`/${id}`);
    return response.data;
  },

  createUser: async (userData) => {
    const response = await api.post('/register', userData);
    return response.data;
  },

  updateUser: async (id, userData) => {
    const response = await api.put(`/update/${id}`, {
      username: userData.username,
      email: userData.email,
      role: userData.role
    });
    return response.data;
  },

  deleteUser: async (id) => {
    await api.delete(`/delete/${id}`);
  },
};