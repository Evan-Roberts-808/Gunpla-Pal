import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import UserContext from './context/UserContext.jsx';

const Main = () => {
  const [user, setUser] = useState(null);

  return (
    <React.StrictMode>
      <UserContext.Provider value={{ user, setUser }}>
        <App />
      </UserContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);
