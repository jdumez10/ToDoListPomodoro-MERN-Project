import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function PrivateRoutes({}) {
  // Access the authentication state using the useAuth hook
  const { auth } = useAuth();

  // If the authentication state is still undefined, display a loading message
  if (auth === undefined) return "loading...";

  // If the user is authenticated, render the child components using the Outlet component
  // If the user is not authenticated, navigate to the '/auth' route
  return auth === true ? <Outlet /> : <Navigate to="/auth" />;
}

export default PrivateRoutes;
