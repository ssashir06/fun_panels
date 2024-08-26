import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  width: 100%;
  height: 100%;
  padding: 10px;
  box-sizing: border-box;

  a {
    display: block;
    color: white;
    margin-bottom: 1em;
  }

  a:hover {
    color: #ddd;
  }
`;

const LeftSideMenu: React.FC = () => {
  return (
    <Nav>
      <Link to="/">Home</Link>
      <Link to="/user">User Page</Link>
    </Nav>
  );
};

export default LeftSideMenu;