import React, { useState } from "react";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import TableRestaurantIcon from '@mui/icons-material/TableRestaurant';
import { Divider, Drawer, IconButton, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../State/Authentication/Action";

const menu = [
    { title: "Резервации", icon: <TableRestaurantIcon /> },
    { title: "Поръчки", icon: <ShoppingBagIcon /> },
    { title: "Изход", icon: <LogoutIcon /> },
];

const ProfileNavigation = ({ open, handleClose }) => {
    const isSmallScreen = useMediaQuery('(max-width:900px)');
    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const handleNavigation = (item) => {
        if (item.title === "Изход") {
            dispatcher(logout());
        } else {
            navigate(`/my-profile/${item.title.toLowerCase()}`, { replace: true });
        }
    };

    return (
        <div className="bg-orange-200">
            {isSmallScreen ? (
                <Drawer
                    variant="temporary"
                    open={open}
                    onClose={handleClose}
                    anchor="left"
                    sx={{ zIndex: -1, position: "sticky" }}
                >
                    <NavigationItems menu={menu} handleNavigation={handleNavigation} />
                </Drawer>
            ) : (
                <Drawer
                    variant="permanent"
                    open={true}
                    anchor="left"
                    sx={{ zIndex: -1, position: "sticky" }}
                >
                    <NavigationItems menu={menu} handleNavigation={handleNavigation} />
                </Drawer>
            )}
        </div>
    );
};

const NavigationItems = ({ menu, handleNavigation }) => {
    return (
        <div className="bg-orange-200 w-[50vw] lg:w-[20vw] h-[100vh] flex flex-col justify-center text-xl gap-8 pt-16">
            {menu.map((item, i) => (
                <React.Fragment key={i}>
                    <div onClick={() => handleNavigation(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
                        {item.icon}
                        <span>{item.title}</span>
                    </div>
                    {i !== menu.length - 1 && <Divider />}
                </React.Fragment>
            ))}
        </div>
    );
};

export default ProfileNavigation;
