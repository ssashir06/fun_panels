import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
.user-page {
  padding: 2em;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 2em auto;
}

.user-page h1 {
  color: #333;
}

.user-page p {
  color: #666;
}
`;

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
    <Container>
      <h1>User Page</h1>
      <input
        type="text"
        value={userName}
        onChange={handleChange}
        placeholder="Enter your name"
      />
    </Container>
  );
};

export default UserPage;