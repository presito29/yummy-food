import React from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../State/Authentication/Action";
import { useNavigate } from "react-router-dom";


const UserProfile = () =>{
    const {auth} = useSelector((store) => store);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const jwt = localStorage.getItem("jwt");

    const handleLogout = () => {
        dispatch(logout());
        navigate("/")

    }
    return(
        <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
            <div className="flex flex-col justify-center items-center">
                <AccountCircleIcon sx={{fontSize: "9rem"}}/>
                <h1 className="py-5 text-xl font-semibold">{auth.user.firstName + " " + auth.user.lastName}</h1>
                <p>Имейл: {auth.user.email}</p>
                <Button variant="contained" onClick={handleLogout} sx={{margin: "2rem 0rem", backgroundColor: "#FF5733" }}>Logout</Button>
            </div>
        </div>
    )
}

export default UserProfile