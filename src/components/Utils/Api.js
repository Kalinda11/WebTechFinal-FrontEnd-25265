import axios from 'axios';

const API_BASE_URL = 'https://hospitalmis-46zd.onrender.com/api/users';
 
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

 