import { Button, Card } from "@mui/material";
import React from "react";
import homeImg2 from '../../images/home2.jpg';



const OrderCard = () =>{

    return(
        <Card className="flex justify-between items-center p-5">
            <div className="flex items-center space-x-5">
                <img className = "h-16 w-16" src={homeImg2} alt="" />
            </div>
            <div>
                <p>Nesto</p>
                <p>Cenata </p>
            </div>
            <div>
                <Button variant="contained" sx={{margin: "2rem 0rem", backgroundColor: "#FF5733" }} className="cursor-not-allowed"> Completed</Button>
            </div>
        </Card>
    )
}

export default OrderCard