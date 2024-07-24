import React, { useState, useEffect } from 'react';

interface UserData {
  username: string;
  firstname: string;
  lastname: string;
}

const ProfilePage: React.FC<UserData> = ({ username, firstname, lastname }) => {
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({ username, firstname, lastname });

  useEffect(() => {
    setFormData({ username, firstname, lastname });
  }, [username, firstname, lastname]);

  const toggleEdit = async () => {
    if (editable) {
      await handleSubmit();
    }
    setEditable(!editable);
  };

  const resetForm = () => {
    setFormData({ username, firstname, lastname });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/profileUpdate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
      <form id="editableForm" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        <label htmlFor="username">Username:</label>
        <input 
          type="text" 
          id="username" 
          value={formData.username} 
          readOnly={!editable} 
          onChange={handleChange} 
        /><br /><br />

        <label htmlFor="firstname">Firstname:</label>
        <input 
          type="text" 
          id="firstname" 
          value={formData.firstname} 
          readOnly={!editable} 
          onChange={handleChange} 
        /><br /><br />

        <label htmlFor="lastname">Lastname:</label>
        <input 
          type="text" 
          id="lastname" 
          value={formData.lastname} 
          readOnly={!editable} 
          onChange={handleChange} 
        /><br /><br />
      </form>

      <button type="button" onClick={toggleEdit}>
        {editable ? "Save" : "Edit"}
      </button>
      <button type="button" onClick={resetForm}>Reset</button><br /><br />
    </>
  );
};

export default ProfilePage;
