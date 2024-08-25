import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LeftSideMenu from './components/LeftSideMenu';
import App from './pages/App';
import UserPage from './pages/UserPage/UserPage';

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <Router>
      <LeftSideMenu />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  </React.StrictMode>
);