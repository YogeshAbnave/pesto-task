// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap styles
import './index.css';

const root = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const reactRoot = ReactDOM.createRoot(root);
reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
