import React, { useState } from "react";
import ProfileNavigation from "./ProfileNavigation";
import { Route, Routes } from "react-router-dom";
import UserProfile from "./UserProfile";
import Orders from "./Orders";
import Reservation from "../Reservation";
import { MyReservation } from "../MyReservation";


const Profile = () => {
    const [openSideBar, setOpenSideBar] = useState(false);

    const handleToggleSidebar = () => {
        setOpenSideBar(!openSideBar);
    };

    return (
        <div className="lg:flex justify-between bg-orange-200">
            <div className="sticky h-[80vh] lg:x-[20%]">
                <ProfileNavigation open={openSideBar} handleClose={handleToggleSidebar} />
            </div>
            <div className="lg:w-[80%]">
                <Routes>
                    <Route path="/" element={<UserProfile />} />
                    <Route path="/поръчки" element={<Orders />} />
                    <Route path="/направи-резервацая" element={<Reservation />} />
                    <Route path="/моите-резервации" element={<MyReservation />} />
                </Routes>
            </div>
        </div>
    );
};

export default Profile;