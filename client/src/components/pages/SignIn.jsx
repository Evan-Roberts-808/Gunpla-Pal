import React, { useState } from 'react';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = () => {
    const signinData = {
      username,
      password
    };

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(signinData)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h2>Sign In</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSignin}>Login</button>
    </div>
  );
};

export default Login;
