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
      <Link to="/clock">Clock Page</Link>
      <Link to="/kana">Kana Page</Link>
      <Link to="/colorShapes">Color and Shapes Page</Link>
    </Nav>
  );
};

export default LeftSideMenu;