import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import classes from './AuthForm.module.scss';

function Login() {
  // Accessing authentication-related data and functions using the useAuth hook
  const { verifyAuth, auth } = useAuth();
  const navigate = useNavigate();

  // Check if the user is already authenticated when the component mounts
  useEffect(() => {
    if (auth) {
      // Redirect to the home page if already authenticated
      navigate('/');
    }
  }, [auth]);

  // Handle the form submission
  const login = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      // Send a POST request to the login endpoint with the email and password
      await axios.post('/api/auth/login', {
        email,
        password,
      });
      // Verify the authentication status after successful login
      await verifyAuth();
      // Redirect to the home page
      navigate('/');
    } catch (err) {
      console.log(err);
      // Verify the authentication status if there is an error
      verifyAuth();
    }
  };

  return (
    <div className={classes.register}>
      {/* Display the login form */}
      <h1 className={classes.title}>Login</h1>
      <form className={classes.authForm} onSubmit={login}>
        <label htmlFor="email">
          email:
          <input name="email" type="email" placeholder="email" required />
        </label>
        <br />
        <label htmlFor="password">
          password:
          <input
            name="password"
            type="password"
            placeholder="password"
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
