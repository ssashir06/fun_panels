import './index.css';

import { StrictMode } from 'react';
import React from 'react';
import { createRoot } from 'react-dom/client';

import App from './App';

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
