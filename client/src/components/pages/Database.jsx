import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Database = () => {
  const [gunplas, setGunplas] = useState([]);

  useEffect(() => {
    const fetchGunplas = async () => {
      try {
        const response = await fetch('/api/gunplas'); // CHANGE THIS
        const data = await response.json();
        setGunplas(data);
      } catch (error) {
        console.error('Error fetching gunplas:', error);
      }
    };

    fetchGunplas();
  }, []);

  return (
    <div>
      <h2>Gunpla Database</h2>
      <ul>
        {gunplas.map((gunpla) => (
          <li key={gunpla.id}>
            <Link to={`/gunplas/${gunpla.grade}`}>{gunpla.model}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Database;
