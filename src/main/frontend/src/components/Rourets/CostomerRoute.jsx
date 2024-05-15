import React from "react";
import Navbar from "../Navbar";
import Home from "../Home/Home";
import Cart from "../Cart/Cart";

import { Route, Routes } from "react-router-dom";
import Profile from "../Profile/Profile";
import Footer from "../Footer";
import { Auth } from "../Auth/Auth";
import Menu from "../Menu/Menu";
import SearchPage from "../Home/Search";
import ContactInfo from "../ContactInfo";

export const CustomerRoute = () => {
    return(
        <div className="bg-orange-200">
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/account/:register" element={<Home/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/menu" element={<Menu/>}/>
                <Route path="/my-profile/*" element={<Profile/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path="/aboutUs" element={<ContactInfo/>}/>
                
            </Routes>
            <Auth/>
            <Footer/>
        </div>
    )
}