//\app\profile\[username]\page.tsx
'use client'

import React, { useState, useEffect } from 'react';
import ProfilePage from '@/components/profile/profile_page';
import ProfilePicture from '@/components/profile/profile_picture';
import UploadComponent from '@/components/upload/upload_pic';

interface Username {
  params: {
    username: string;
  };
};

const ProfilePageContainer: React.FC<Username> = ({ params }) => {
  const { username } = params;
  const [userData, setUserData] = useState({ username: '', firstname: '', lastname: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/user/${username}`);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  const handleUploadSuccess = async (fileName: string) => {
    try {
      const userData = { username, fileName };
      const response = await fetch(`/change_profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error(data.error || 'Failed to update profile picture');
      }
    } catch (error) {
      console.error('Failed to update profile picture', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProfilePicture username={userData.username} />
      <ProfilePage username={userData.username} firstname={userData.firstname} lastname={userData.lastname} />
      <h1>Upload here</h1>
      <UploadComponent route="profile_pic" onUploadSuccess={handleUploadSuccess} />
    </div>
  );
};

export default ProfilePageContainer;
