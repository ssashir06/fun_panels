import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

import App from './App';
import UserPage from './components/UserPage/UserPage';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/user">User Page</Link>
      </nav>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user" element={<UserPage />} />
      </Routes>
    </Router>
  </React.StrictMode>
);