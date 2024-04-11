import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import navLogo from '../images/nav-logo.png';
import { Badge, Box } from '@mui/material';
import Person from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Navbar = () => {
  const {auth, cart} = useSelector(store => store)
  const navigate = useNavigate();
  const handleLogoClick = () =>{
    navigate("/")
  }
  const handleMenuClick = () =>{
    navigate("/menu")
  }
  const handleSearchClick = () =>{
    navigate("/search")
  }
  const handleAvatarClick = () =>{
    if(auth.user.role==="USER"){
      navigate("/my-profile")
    }
    else{
      navigate("/admin/...") //TODO
    }
  }
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
            <MenuBookIcon sx={{fontSize: "1.5rem"}}/> Menu
          </IconButton>
        </div>
        <div className=''>
         {auth.user ? (<Avatar onClick={handleAvatarClick} sx={{bgcolor:"white", color: "black"}}>{auth.user?.firstName[0].toUpperCase()}</Avatar>):(
         <IconButton onClick={() => navigate("/account/login")}>
          <Person/>
          </IconButton>)}
        </div>
        <div className=''>
          <IconButton onClick={()=> navigate("/cart")}>
          <Badge  badgeContent={cart.cart?.items.length} color='white'>
          <ShoppingCartIcon sx={{fontSize: "1.5rem"}}/>
          </Badge>
          </IconButton>
          
            
          
        </div>
      </div>
    </Box>
  );
};

export default Navbar;
