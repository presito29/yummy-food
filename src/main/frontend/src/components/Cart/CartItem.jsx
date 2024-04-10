
import React from "react";
import cake from '../../images/cake.jpg';
import { Chip, IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, updateCartItem } from "../State/Cart/Action";

const CartItem = ({item}) => {
    const {auth, cart} = useSelector(store => store)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");

    const handleUpdateCartItem = (value) => {
        if(value === -1 && item.quantity === 1){
            handleRemoveCartItem()
        }

        const data = {cartItemId: item.id, quantity: item.quantity + value}
        dispatch(updateCartItem({data, jwt}))
    }

    const handleRemoveCartItem = () =>{
       dispatch(removeCartItem({cartItemId: item.id, jwt: jwt })) 
    }

    return(
        <div className="px-5 ">
            <div className="lg:flex item-center lg:space-x-5">

                <div>
                   <img className="w-[5rem] h-[5rem] object-cover" src={item.product.imagePath} alt="Cake" /> 
                </div>

                <div className="flex item-center justify-between lg:w-[70%]">
                    <div className="space-y-1 lg:space-y-3 w-full">
                        <p>{item.product.name}</p>
                        <div className="flex item-center justify-between">
                            <div className="flex items-center space-x-1">
                                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                                    <RemoveCircleOutlineIcon/>
                                </IconButton>
                                <div className="w-5 h-5 text-xs flex items-center justify-center">
                                    {item.quantity}
                                </div>
                                <IconButton onClick={() => handleUpdateCartItem(1)}>
                                    <AddCircleOutlineIcon/>
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>{item.totalPrice} лв.</p>
                </div>       
            </div> 
            
        </div>
    )
}
export default CartItem