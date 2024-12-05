import { Route, Router, Routes } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { ProtectedRoute } from "./oulets/ProctectedRoutes";
import { Users } from "../pages/Users";
import NotFound from "../pages/NotFound";

export const AppRoutes = () => {
    return (
     
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
  
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/users" element={<Users />} />
            {/* Add more protected routes as needed */}
          </Route>
  
          {/* 404 Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      
    );
  };