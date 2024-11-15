import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Check if user is logged in

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
