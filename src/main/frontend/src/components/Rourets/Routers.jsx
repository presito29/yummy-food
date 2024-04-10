import React from "react";
import { Route, Routes } from "react-router-dom";
import { AdminRoute } from "./AdminRoute";
import { CustomerRoute } from "./CostomerRoute";

const Routers = () => {
    return (
        <Routes>
            <Route path="/admin/*" element={<AdminRoute/>}></Route>
            <Route path="/*" element={<CustomerRoute/>}></Route>
        </Routes>
    )
}

export default Routers