import axios from 'axios';
import { createContext, useEffect, useState } from 'react';

// Create a new context named AuthContext
const AuthContext = createContext({});

// Define the AuthProvider component
export function AuthProvider({ children }) {
  // Set up the auth state using the useState hook
  const [auth, setAuth] = useState(undefined);

  // Define the verifyAuth function to check the authentication status
  const verifyAuth = async () => {
    // Send a request to the server to check if the user is logged in
    const isLoggedIn = await axios.get(`/api/auth/is_logged_in`);

    // Set the auth state based on the response from the server
    setAuth(isLoggedIn.data);

    // Return the authentication status
    return isLoggedIn.data;
  };

  // Run the verifyAuth function when the component mounts
  useEffect(() => {
    verifyAuth();
  }, []);

  // Render the AuthProvider component
  return (
    <AuthContext.Provider value={{ auth, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// Export the AuthContext
export default AuthContext;
