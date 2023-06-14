import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import Layout from '../components/Layout';
import Navbar from '../components/nav/Navbar';
import TaskList from '../components/task/TaskList';

function Home() {
  const [userData, setUserData] = useState();
  const { verifyAuth } = useAuth();

  // const logout = async () => {
  //   await axios.get('/api/auth/logout');
  //   verifyAuth();
  // };

  // Fetch user information from the server
  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(`/api/users/me/info`);
      setUserData(data);
    } catch (err) {
      if (err.status === 401) {
        checkAuth();
      }
      toast('we got error');
    }
  };

  useEffect(() => {
    // Fetch user information when the component mounts
    getUserInfo();
  }, []);

  // If user data is not available, return null
  if (!userData || !userData._id) {
    return null;
  }

  // Render the Home component with the layout, navbar, and task list
  return (
    <Layout>
      <Navbar />
      <TaskList />
    </Layout>
  );
}

export default Home;
