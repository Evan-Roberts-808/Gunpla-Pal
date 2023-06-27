import React, { useState, useEffect } from 'react';

const Profile = ({ username }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/users/${username}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error(error))
  }, [username])

  return (
    <div>
      {user ? (
        <div>
          <h2>User Profile: {user.username}</h2>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default Profile