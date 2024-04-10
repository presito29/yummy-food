import React from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import {Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";

const menu=[
    {title: "Reservation", icon: <TableRestaurantIcon/>},
    {title: "Orders", icon: <ShoppingBagIcon/>},
    {title: "Addresses", icon: <HomeIcon/>},
    {title: "Logout", icon: <LogoutIcon/>},
    
    
]
const ProfileNavigation = ({open, handleClose }) =>{
    const isSmallScreen = useMediaQuery('(max-width:900px)');

    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const handleNavigation=(item)=>{
        if(item.title==="Logout"){
            dispatcher(logout())
        }else{
        navigate(`/my-profile/${item.title.toLowerCase()}`, {replace: true})
        }
    }


    return(
        <div className="bg-orange-200">
            <Drawer variant={isSmallScreen?"temporary":"permanent"} 
            onClose={handleClose} 
            open={isSmallScreen? open : true} 
            anchor="left" 
            sx={{zIndex: -1, position:"sticky"}}>
                <div className=" bg-orange-200 w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center
                 text-xl gap-8 pt-16">
                    {menu.map((item, i)=> <>
                    <div onClick={()=>handleNavigation(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
                        {item.icon}
                        <span>{item.title}</span>
                    </div>
                    {i !== menu.length -1 && <Divider/>}
                    </>)}

                </div>
            </Drawer>
                
        

        </div>
    )
}

export default ProfileNavigation