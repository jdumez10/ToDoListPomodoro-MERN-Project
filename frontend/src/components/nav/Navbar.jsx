import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaUserAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/Auth';
import classes from './Navbar.module.scss';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const { verifyAuth } = useContext(AuthContext);

  // Fetch user data from the server
  const getUser = async () => {
    try {
      const { data } = await axios.get(`/api/users/me`);
      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Call the getUser function when the component mounts
    getUser();
  }, []);

  // Handle the logout functionality
  const handleLogout = async () => {
    try {
      // Send a GET request to the logout endpoint
      await axios.get(`/api/auth/logout`);
      // Clear the user state and trigger re-verification of authentication
      setUser(null);
      verifyAuth();
      // Display a success toast message upon successful logout
      toast.success('Logged out successfully');
    } catch (err) {
      console.log(err);
    }
  };

  // If user is not available, return null
  if (!user) return null;

  return (
    <header>
      <div className={classes.userInfo}>
        <FaUserAlt className={classes.userIcon} />
        <div>
          {/* Display user information */}
          <h1 className={classes.name}>{user.name}</h1>
          <p className={classes.email}>{user.email}</p>
          <Link to="/edit-profile" className={classes.editBtn}>
            Edit
          </Link>
        </div>
      </div>
      <nav>
        {/* Button for logout */}
        <button type="button" className={classes.logout} onClick={handleLogout}>
          logout
        </button>
      </nav>
    </header>
  );
}
