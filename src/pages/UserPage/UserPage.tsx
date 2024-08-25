import './UserPage.css';

import React, { useEffect,useState } from 'react';

const UserPage: React.FC = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = sessionStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = e.target.value;
    setUserName(newUserName);
    sessionStorage.setItem('userName', newUserName);
  };

  return (
    <div>
      <h1>User Page</h1>
      <input
        type="text"
        value={userName}
        onChange={handleChange}
        placeholder="Enter your name"
      />
    </div>
  );
};

export default UserPage;