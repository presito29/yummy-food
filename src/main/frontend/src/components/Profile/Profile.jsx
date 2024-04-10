import React, { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Addresses from "./Addresses";
import Reservation from "../Reservation";

const Profile = () =>{
    const [openSideBar, setOpenSideBar] = useState(false);
    return(
        <div className="lg:flex justify-between bg-orange-200">
            <div className="sticky h-[80vh] lg:x-[20%]">
                <ProfileNavigation open={openSideBar}/>
            </div>
            <div className="lg:w-[80%]">
                <Routes>
                    <Route path="/" element={<UserProfile/>}/>
                    <Route path="/orders" element={<Orders/>}/>
                    <Route path="/addresses" element={<Addresses/>}/>
                    <Route path="/reservation" element={<Reservation/>}/>
                </Routes>
            </div>

        </div>
    )
}

export default Profile