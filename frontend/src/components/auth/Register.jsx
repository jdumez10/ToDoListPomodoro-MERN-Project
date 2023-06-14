import axios from 'axios';
import React from 'react';
import toast from 'react-hot-toast';

import classes from './AuthForm.module.scss';

function Register() {
  // Handle the form submission for user registration
  const register = async (e) => {
    e.preventDefault();
    // Extract the user data from the form
    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    try {
      // Send a POST request to the register endpoint with the user data
      await axios.post(`/api/auth/register`, user);
      // Display a success toast message upon successful registration
      toast.success('Registered successfully');
    } catch (err) {
      console.log(err);
      // Display an error toast message if something goes wrong during registration
      toast.error('Something went wrong');
    }
  };

  return (
    <div className={classes.register}>
      {/* Display the registration form */}
      <h1 className={classes.title}>Register</h1>
      <form className={classes.authForm} onSubmit={register}>
        <label htmlFor="name">
          Full Name:
          <input name="name" type="text" placeholder="Full Name" required />
        </label>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
