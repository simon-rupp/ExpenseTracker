import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TransactionContextProvider } from './context/transactionContext';
import { AuthContextProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <TransactionContextProvider>
        <App />
      </TransactionContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

