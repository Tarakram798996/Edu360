import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';

// Corrected: ReactDOM is now properly capitalized and spelled correctly.
// Also added the missing imports for BrowserRouter and AuthProvider.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Note: reportWebVitals() is an optional feature of create-react-app
// You can remove this section if you don't need it.