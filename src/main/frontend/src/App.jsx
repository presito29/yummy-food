// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import { Provider, useDispatch, useSelector } from 'react-redux';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@material-tailwind/react';
import { getUser } from './components/State/Authentication/Action';
import Routers from './components/Rourets/Routers';
import { findCart } from './components/State/Cart/Action';
import { fetchOrders } from './components/State/Order_Admin/Action';
import './App.css'

function App() {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem('jwt');
  const auth= useSelector(store => store.auth); // Assuming `auth` is your slice name

  useEffect(() => {
    dispatch(getUser(auth.jwt || jwt));
    dispatch(findCart(jwt));
    dispatch(fetchOrders(jwt))
  }, [auth.jwt, jwt, dispatch]);


 

  return (
    <ThemeProvider >
      <CssBaseline />

        <Routers/>

    </ThemeProvider>
  );
}

export default App;
