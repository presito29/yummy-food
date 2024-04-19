import { Divider, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MenuCard from './MenuCard';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { store } from '../State/store';
import { getCategoryAction } from '../State/Category/Action';
import { getMenuItems } from '../State/Menu/Action';



const Menu = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwt = localStorage.getItem("jwt");
    const {auth, category, menu} = useSelector(store => store)
    const [selectedCategory, setSelectedCategory] = useState("");

 

    const handleFilter = (e) => {
        setSelectedCategory(e.target.value); 
        console.log(e.target.value);
    };

    useEffect(() =>{
        dispatch(getCategoryAction({jwt}))

    },[])

    useEffect(() =>{
      
        dispatch(getMenuItems({jwt, category: selectedCategory}))

    },[selectedCategory])

  return (
    <section className='pt-[2rem] lg: flex relative bg-orange-200'>
        <div className='space-y-10 m-6 lg:w-[20%] filter p-5 shadow-md'>
            <div className='box space-y-5 lg:sticky top-28'>
               <Divider/>
                <div>
                   <Typography variant='h5' sx={{paddingBottom:"1rem"}}>
                    Категории
                   </Typography>

                   <FormControl className='py-10 space-y-5' component={"fieldset"}>
                   <RadioGroup onChange={handleFilter} name='food_category' value={selectedCategory}>
    {category.categories.map((item) => (<FormControlLabel key={item.id} value={item.name} control={<Radio />} label={item.name} />))}
    
  </RadioGroup>
                   </FormControl>
                </div>
            </div>
        </div>
        <div className='space-y-5 lg:w-[80%] lg:pl-10'>
            {menu.menuItems.map((item) => <MenuCard item={item}/>)}
</div>
    </section>
  );
};

export default Menu;
