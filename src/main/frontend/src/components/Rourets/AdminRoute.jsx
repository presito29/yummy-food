import React from "react";
import { Route, Routes } from "react-router-dom";
import { Admin } from "../../AdminComponents/Admin/Admin";

export const AdminRoute = () => {
    return(
        <div className="bg-orange-200">
            <Routes>
                <Route path="/*" element={<Admin/>}></Route>
            </Routes>
        </div>
    )
}