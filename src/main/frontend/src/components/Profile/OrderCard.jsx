import React from "react";
import { Button, Card } from "@mui/material";

const OrderCard = ({ item, order }) => {
    return (
        <Card className="flex justify-between items-center p-5">
            <div className="flex items-center space-x-5">
                <img className="h-16 w-16" src={item.product.imagePath} alt="" />
            </div>
            <div>
                <p>{item.product.name}</p>
                <p>{item.product.price}</p> {/* Not sure what data you want to display here */}
            </div>
            <div>
                <Button
                    variant="contained"
                    sx={{ margin: "2rem 0rem", backgroundColor: "#FF5733" }}
                    className="cursor-not-allowed"
                >
                    {order.status}
                </Button>
            </div>
        </Card>
    );
};

export default OrderCard;