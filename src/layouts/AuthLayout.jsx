import React from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const AuthLayout = ({ children }) => {
  const { isLogin } = useAuthStore();

  if (isLogin) return <Navigate to="/" />;

  return (
    <div className=" min-h-screen bg-body">
      {children}
    </div>
  );
};

export default AuthLayout;
