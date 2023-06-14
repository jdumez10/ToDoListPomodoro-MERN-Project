import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Route, Routes } from 'react-router-dom';
import PrivateRoutes from './components/PrivateRoutes';
import Auth from './pages/Auth';
import EditProfile from './pages/EditProfile';
import Home from './pages/Home';

function App() {
  return (
    <>
      {/* Display a toaster for displaying toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: '1.8rem',
          },
        }}
      />
      {/* Define the routing for the application */}
      <Routes>
        {/* Use the PrivateRoutes component to wrap routes that require authentication */}
        <Route element={<PrivateRoutes />}>
          {/* Define routes accessible only when authenticated */}
          <Route path="/" element={<Home />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Route>
        {/* Define routes accessible without authentication */}
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;