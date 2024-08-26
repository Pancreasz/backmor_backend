import React, { useState, useEffect } from 'react';

interface ProfilePictureProps {
  username: string;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ username }) => {
  const [imgSrc, setImgSrc] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch(`/api/image/${username}`);
        const data = await response.json();

        console.log(data, 'image data')

        if (response.ok) {
          setImgSrc(data.imagePath);
        } else {
          setError(data.error);
        }
      } catch (err) {
        setError('Failed to fetch profile image');
      }
    };

    fetchProfileImage();
  }, [username]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <img src={imgSrc} alt={`${username}'s profile`} />
    </div>
  );
};

export default ProfilePicture;
