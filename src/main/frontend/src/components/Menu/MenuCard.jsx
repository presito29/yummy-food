import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import cake from '../../images/cake.jpg';
import { useDispatch, useSelector } from "react-redux"
import { add, findCart } from '../State/Cart/Action';

const MenuCard = ({ hasColor, item }) => {
    const [isAddedToCart, setIsAddedToCart] = useState(false);
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt")

    const handleAddToCart = () => {
        const reqData = {
        token: localStorage.getItem("jwt"),
        cartItem:{
        productId: item.id,
        quantity: 1,
       }
        }
        console.log("req data", reqData);
        dispatch(add(reqData))
        location.reload();
    };

   
    

    return (
        <section className={`pt-[2rem] flex relative bg-orange-200 m-4`}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <div className='lg:flex  items-center justify-between'>
                        <div className='lg:flex items-center lg:gap-5'>
                        <img className='w-56 h-32 object-contain' src={item.imagePath} alt="" />
                            <div className='space-y-1 lg:space-y-5 lg:max-w-2x1'>
                                <p className='font-semibold text-xl'>{item.name}</p>
                                <p>{item.price} лв.</p> 
                            </div>
                        </div>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>{item.description}</Typography>
                    <div className='pt-5'>
                        <Button variant='contained' disabled={isAddedToCart}  onClick={handleAddToCart}>
                            {isAddedToCart ? "Добавено в количката" : "Добави в количката"}
                        </Button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </section>
    );
};

export default MenuCard;
