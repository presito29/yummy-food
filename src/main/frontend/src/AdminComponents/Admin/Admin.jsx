import React from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { FoodCategory } from "../FoodCategory/FoodCategory";
import { AdminSideBar } from "./AdminSideBar";
import { Menu } from "../Menu/Menu";
import { Reservation } from "../Reservation/Reservation";
import { Dashboard } from "../Dashboard/Dashboard";
import AddProduct from "../Menu/AddProduct";
import AddTable from "../Reservation/AddTable";
import TableAllRestaurantTableRoot from "../Reservation/TableAllRestaurantTableRoot";
import CreateFoodCategoryForm from "../FoodCategory/CreateFoodCategoryForm";
import OrderTable from "../Orders/OrderTable";

export const Admin = () => {
    const handleClose = () => {};

    return (
        <div className="h-full bg-orange-200">
            <div className="lg:flex justify-between bg-orange-200 ">
                <div className="sticky h-[80vh] lg:x-[20%] ">
                    <AdminSideBar handleClose={handleClose} />
                </div>

                <div className="lg:w-[80%] bg-orange-200">
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/orders" element={<OrderTable />} />
                        <Route path="/menu" element={<Menu />} />
                        <Route path="/category" element={<FoodCategory />} />
                        <Route path="/reservation" element={<Reservation />} />
                        <Route path="/add-product" element={<AddProduct />} />
                        <Route
                            path="/update-product/:id"
                            element={<AddProduct />}
                        />
                        <Route path="/add-table" element={<AddTable />} />
                        <Route
                            path="/update-table/:id"
                            element={<AddTable />}
                        />
                        <Route
                            path="/all-table"
                            element={<TableAllRestaurantTableRoot />}
                        />
                        <Route
                            path="/add-category"
                            element={<CreateFoodCategoryForm />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};
