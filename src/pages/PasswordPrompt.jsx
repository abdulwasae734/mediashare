import React, { useState } from 'react';
import './PasswordPrompt.css';

const PasswordPrompt = ({ onAccessGranted }) => {
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);

  const correctPassword = "getaccess"; // Replace with your password

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputPassword === correctPassword) {
      onAccessGranted(); // Call the function to grant access
    } else {
      setError(true);
    }
  };

  return (
    <div className="password-prompt">
      <h2>Enter the password to access the site:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder="Enter password"
          className={error ? "input-error" : ""}
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p className="error-message">Incorrect password, please try again.</p>}
    </div>
  );
};

export default PasswordPrompt;
