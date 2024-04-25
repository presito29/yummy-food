import React, { useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import navLogo from '../images/nav-logo.png';
import { Badge, Box } from '@mui/material';
import Person from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; // Import useDispatch and useSelector
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { findCart } from './State/Cart/Action';

const Navbar = () => {
  const auth = useSelector(store => store.auth);
  const cart = useSelector(store => store.cart);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleMenuClick = () => {
    navigate("/menu");
  };

  const handleSearchClick = () => {
    navigate("/search");
  };

  const handleAvatarClick = () => {
    if (auth.user.role === "USER") {
      navigate("/my-profile");
    } else {
      navigate("/admin/"); //TODO
    }
  };

   // Add dispatch and jwt to the dependency array

  return (
    <Box className='px-5 sticky top-0 z-50 py-[.8rem] bg-orange-300 lg:px-20 flex justify-between'>
      <div className='lg:mr-10 cursor-pointer flex items-center'>
        <li onClick={handleLogoClick} className='logo list-none'>
          <img src={navLogo} alt="LOGO" style={{ width: '200px' }} />
        </li>
      </div>
      <div className='flex items-center space-x-2 lg:space-x-10'>
        <div className=''>
          <IconButton onClick={handleSearchClick}>
            <SearchIcon sx={{fontSize: "1.5rem"}}/>
          </IconButton>
        </div>
        <div className=''>
          <IconButton onClick={handleMenuClick}>
            <MenuBookIcon sx={{fontSize: "1.5rem"}}/> Меню
          </IconButton>
        </div>
        <div className=''>
        {(auth.user && auth.user.enabled) ? ( // Check if user exists and email is confirmed
            <Avatar onClick={handleAvatarClick} sx={{bgcolor:"white", color: "black"}}>
              {auth.user.firstName[0].toUpperCase()}
            </Avatar>
          ) : (
            <IconButton onClick={() => navigate("/account/login")}>
              <Person/>
            </IconButton>
          )}
        </div>
        <div className=''>
          <IconButton onClick={()=> navigate("/cart")}>
          <Badge badgeContent={cart.cart?.items.length || 0} color=''>
              <ShoppingCartIcon sx={{fontSize: "1.5rem"}}/>
            </Badge>
          </IconButton>
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
