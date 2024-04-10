import React from "react";
import OrderCard from "./OrderCard";


const Orders = () =>{

    return(
        <div className="flex flex-col justify-center items-center text-center">
            <h1 className="text-xl text-center py-7 font-semibold">MY ORDERS</h1>
            <div className="space-y-5 w-full lg:w-1/2">
                {
                    [1,1,1,1].map((item) => <OrderCard/>)
                }
            </div>
        </div>
    )
}

export default Orders