import React, { useState } from 'react';

function AdminSignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [accessCode, setAccessCode] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Send a POST request to the backend to create a new admin account
    const response = await fetch('/api/admin/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password, accessCode })
    });
    // Handle the response from the backend
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Admin Sign Up</h2>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <label>
        Access Code:
        <input
          type="password"
          value={accessCode}
          onChange={(event) => setAccessCode(event.target.value)}
        />
      </label>
      <br />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default AdminSignUp;
