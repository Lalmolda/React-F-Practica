import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';
import { BrowserRouter } from 'react-router-dom';




const accessToken = storage.get('auth'); //calls get function in storage.js (utils)
if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
//!! converts anything into a boolean value
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App isUserLogged={!!accessToken}/> 
    </BrowserRouter>
    </React.StrictMode>
);


