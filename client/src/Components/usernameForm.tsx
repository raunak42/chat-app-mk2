// UsernameForm.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UsernameForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate the username before proceeding
    if (username.trim() !== '') {
      // Redirect to the /chat route
      navigate(`/chat?username=${encodeURIComponent(username)}`);
    }
  };

  return (
    <div>
      <h2>Enter Your Username</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Enter Chat</button>
      </form>
    </div>
  );
};

export default UsernameForm;
