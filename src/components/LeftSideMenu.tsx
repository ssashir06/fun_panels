import './LeftSideMenu.css';

import React from 'react';
import { Link } from 'react-router-dom';

const LeftSideMenu: React.FC = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/user">User Page</Link>
    </nav>
  );
};

export default LeftSideMenu;