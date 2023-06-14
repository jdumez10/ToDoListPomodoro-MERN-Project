import { useContext } from "react";
import AuthContext from "../context/Auth";

const useAuth = () => {
  // Access the auth and verifyAuth values from the AuthContext
  const { auth, verifyAuth } = useContext(AuthContext);

  // Return the auth and verifyAuth values as an object
  return { auth, verifyAuth };
}

export default useAuth;
