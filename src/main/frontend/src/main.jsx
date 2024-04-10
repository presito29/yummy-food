// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';  // Change import path
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from './components/State/store';
import "./index.css";



// Render the app with the router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
     <App/>
     </BrowserRouter>
     </Provider>
  </React.StrictMode>
);
