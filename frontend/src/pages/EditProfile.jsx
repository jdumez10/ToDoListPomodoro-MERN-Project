import React from 'react';
import Layout from '../components/Layout';
import EditProfileForm from '../components/profile/EditProfileForm';

function EditProfile() {
  return (
    <Layout>
      {/* Render the EditProfileForm component */}
      <EditProfileForm></EditProfileForm>
    </Layout>
  );
}

export default EditProfile;
