import React from "react";
import Navbar from "../Navbar";
import Home from "../Home/Home";
import Cart from "../Cart/Cart";

import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import Footer from "../Footer";
import { Auth } from "../Auth/Auth";
import Menu from "../Menu/Menu";

export const CustomerRoute = () => {
    return(
        <div>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/account/:register" element={<Home/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/my-profile/*" element={<Profile/>}/>
                
            </Routes>
            <Auth/>
            <Footer/>
        </div>
    )
}