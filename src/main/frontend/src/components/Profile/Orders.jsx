// Orders.js
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserOrder } from "../State/Order/Action";

const Orders = () => {
    const { auth, order } = useSelector((store) => store);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    useEffect(() => {
        dispatch(getUserOrder(jwt));
    }, [jwt, dispatch]);

    return (
        <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-xl text-center py-7 font-semibold">MY ORDERS</h1>
            <div className="space-y-5 w-full lg:w-1/2">
                {order.orders &&
                    Array.isArray(order.orders) &&
                    order.orders.length > 0 &&
                    order.orders.map((order) =>
                        order.products &&
                        Array.isArray(order.products) &&
                        order.products.length > 0 && (
                            order.products.map((item) => (
                                <OrderCard key={item.id} item={item} order={order} />
                            ))
                        )
                    )}
            </div>
        </div>
    );
};

export default Orders;