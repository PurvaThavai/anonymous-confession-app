import React from "react";
import { Navigate } from "react-router-dom";

// Function to decode JWT payload
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch (e) {
    return null;
  }
}

export default function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decoded = decodeToken(token);
  const userRole = decoded?.role;

  if (userRole !== allowedRole) {
    // Redirect if role does not match
    return <Navigate to="/login" replace />;
  }

  return children;
}
