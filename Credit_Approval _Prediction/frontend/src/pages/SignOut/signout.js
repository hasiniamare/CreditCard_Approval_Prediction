import React from 'react';
import { useHistory } from 'react-router-dom';
import './SignOut.css';

const SignOut = () => {
  const history = useHistory();

  const handleSignOut = () => {
    // Perform sign-out logic here
    // For example, clear local storage, update state, etc.
    localStorage.removeItem('token'); // Assuming you store a token for authentication

    // Redirect to the login page or any other desired route after sign-out
    history.push('/login');
  };

  return (
    <button className="sign-out-btn" onClick={handleSignOut}>
      Sign Out
    </button>
  );
};

export default SignOut;
