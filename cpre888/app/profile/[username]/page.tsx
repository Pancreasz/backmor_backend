'use client'

import React, { useState, useEffect } from 'react';
import ProfilePage from '@/components/profile/profile_page';

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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <ProfilePage username={userData.username} firstname={userData.firstname} lastname={userData.lastname} />
        </div>
    );
};

export default ProfilePageContainer;
