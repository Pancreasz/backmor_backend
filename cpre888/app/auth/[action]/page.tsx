// app/auth/[action]/page.tsx
import React from 'react';
import LoginRegisForm from '../../../components/login_regis/authForm'; // Adjust the import path as needed

interface AuthPageProps {
  params: {
    action: string;
  };
}

const AuthPage: React.FC<AuthPageProps> = ({ params }) => {
  const { action } = params; // Extract dynamic segment from URL

  // Determine the command and button text based on the action
  const formProps = action === 'login'
    ? { command: 'login'}
    : action === 'register'
    ? { command: 'register'}
    : { command: ''};

  return (
    <>
      <div>
        {action === 'login' && <h1>Please login</h1>}
        {action === 'register' && <h1>Please register</h1>}
        {action !== 'login' && action !== 'register' && <h1>Page not found</h1>}
        <LoginRegisForm {...formProps} />
      </div>
    </>
  );
};

export default AuthPage;
