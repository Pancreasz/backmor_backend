// components/LoginRegisForm.tsx
import React from 'react';

// Define the props interface
interface LoginRegisFormProps {
  command: string;
}

// Define the component with props
const LoginRegisForm: React.FC<LoginRegisFormProps> = ({ command }) => {
  return (
    <>
      <form action={`/${command}`} method="POST">
        <label htmlFor="username">ID</label>
        <input type="text" id="username" name="username" required /><br /><br />
        <label htmlFor="password">PASS</label>
        <input type="password" id="password" name="password" required /><br /><br />
        <button type="submit">{command}</button>
      </form><br />
    </>
  );
};

export default LoginRegisForm;
