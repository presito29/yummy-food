import React from "react";

import { Dashboard, ShoppingBag } from "@mui/icons-material";
import ShopTwoIcon from '@mui/icons-material/ShopTwo';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { Divider, Drawer, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../components/State/Authentication/Action";
import TableBarIcon from '@mui/icons-material/TableBar';

const menu = [
    { title: "Приветстваща страница", icon: <Dashboard />, path: "/" },
    { title: "Поръчки", icon: <ShoppingBag />, path: "/orders" },
    { title: "Меню", icon: <ShopTwoIcon />, path: "/menu" },
    { title: "Категории на храна", icon: <FastfoodIcon />, path: "/category" },
    { title: "Резервации", icon: <TableBarIcon />, path: "/reservation" },
    { title: "Изход", icon: <LogoutIcon />, path: "/logout" }, // Assuming there's a logout path
];

export const AdminSideBar = ({handleClose}) => {
    const isSmallScreen = useMediaQuery("(max-width:900px)")
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleNavidate = (item) =>{
        navigate(`/admin${item.path}`)
        if(item.title === "Logout"){
            navigate("/")
            dispatch(logout())
            handleClose()
        }
    }
    return (
        <div>
        
        <>
        <Drawer variant={isSmallScreen?"temporary":"permanent"} 
            onClose={handleClose} 
            open={isSmallScreen? open : true} 
            anchor="left" 
            sx={{zIndex: -1, position:"sticky"}}>

            <div className="bg-orange-200 w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center
                 text-xl gap-8 pt-16">

                {menu.map((item, i)=>
                <>
                <div onClick={()=>handleNavidate(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
                    {item.icon} 
                    <span>{item.title}</span>
                </div>
                {i !== menu.length-1 && <Divider/>}
                </>)}
            </div>
        </Drawer>
        </>
        </div>
    );
};