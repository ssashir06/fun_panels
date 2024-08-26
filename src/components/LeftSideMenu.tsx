import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
nav {
  background-color: #333;
  padding: 0;
  padding-left: 1em;
  height: 100vh;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
}

nav a {
  display: block;
  color: white;
  margin-bottom: 1em;
}

nav a:hover {
  color: #ddd;
}
`;

const LeftSideMenu: React.FC = () => {
  return (
    <Container>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/user">User Page</Link>
      </nav>
    </Container>
  );
};

export default LeftSideMenu;