import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UsersContextProvider from './context/UsersContextProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UsersContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </UsersContextProvider>
);