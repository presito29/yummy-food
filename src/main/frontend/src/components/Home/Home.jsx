import React, { useEffect, useState } from 'react';
import homeImg2 from '../../images/home2.jpg';
import homeImg from '../../images/home30.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faArrowRight, faCodeFork } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineRestaurantMenu, MdOutlineLocalDining } from 'react-icons/md';
import MulriItemCarousel from './MultiItemCarousel';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { Auth } from '../Auth/Auth';
import { findCart } from '../State/Cart/Action';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    
  },[])
  return (
     <div className=" bg-orange-100 ">
      
      
      <section className='w-full h-96 relative flex flex-col justify-center items-center' style={{ background: `url(${homeImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
  <div className="w-[50vw] text-center">
    <h1 className="text-center text-5xl md:text-6xl font-playfair p-2 m-5 animate__animated animate__bounceInDown text-white">Добре дошли във вашия любим ресторант!</h1>
  </div>
  <div className='cover w-full h-96  absolute top-0 left-0 right-0'></div>
  <div className='fadout'></div>
  </section>
      
      <section className='p-10 lg:py-10 lg:px-20'>
        <p className='text-2x1 font-semibold text-grey-400 py-3 pb-10 '>Топ продукти</p>
      <MulriItemCarousel/>
      </section>
        
        
        
      <div className="py-6 items-center justify-center m-0 w-90 h-90 bg-cover bg-center">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="col-span-1 animate__animated animate__bounceInUp" data-wow-delay="0.3s">
              <img src={homeImg2} className="rounded" alt="" />
            </div>
          
            <div className="p-3 text-center col-span-1 animate__animated animate__bounceInUp" data-wow-delay="0.3s">
              <h1 className="text-5xl md:text-6xl mb-4 font-playfair">Имаме доверие от над 200 доволни клиента</h1>
             <br />
             <br />
              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <FontAwesomeIcon icon={faShare} className="text-lg me-2" /> Доставка на прясна и вкусна храна
                </div>
                <div>
                  <FontAwesomeIcon icon={faShare} className="text-lg me-2" /> Бързо и практично обслужване
                </div>
                <div>
                  <FontAwesomeIcon icon={faShare} className="text-lg me-2" /> Лесен достъп до нас и нашия сайт
                </div>
                <div>
                  <FontAwesomeIcon icon={faShare} className="text-lg me-2" /> Вкусни оферти за вкусни ястия
                </div>
              </div>
              <a href="#" className=" py-3 px-5 flex items-center text-black">About Us<FontAwesomeIcon icon={faArrowRight} className="text-lg ml-2" /></a>
            </div>
          </div>
        </div>
        <div className="container py-8 m-5 text-center items-center justify-content grid-col-4 m-auto">
  <div className="text-center animate__animated animate__bounceInUp" data-wow-delay="0.3s">
    <h1 className="text-5xl md:text-6xl mb-8 font-playfair">Какво ви предлагаме</h1>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="col-span-1 sm:col-span-2 lg:col-span-1 animate__animated animate__bounceInUp" data-wow-delay="0.1s">
      <div className="rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-center mb-4">
          <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
        </div>
        <div className="text-center">
          <h4 className="mb-3 text-xl font-semibold">Вкусна храна</h4>
          <p className="mb-4 text-gray-700">При нас може да откриете разнообразие от хранителни вкусове и да се насладите на прясна и топла храна.</p>
          <a href="#" className="px-4 py-2 rounded text-black">Read More</a>
        </div>
      </div>
    </div>

    {/* Add another element */}

      <div className="rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-center mb-4">
          {/* Add your icon or image here */}
          <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
        </div>
        <div className="text-center">
          <h4 className="mb-3 text-xl font-semibold">Your Element Title</h4>
          <p className="mb-4 text-gray-700">Your element description goes here.</p>
          <a href="#" className="px-4 py-2 rounded text-black">Read More</a>
        </div>
      </div>
   

   
      <div className="rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-center mb-4">
          {/* Add your icon or image here */}
          <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
        </div>
        <div className="text-center ">
          <h4 className="mb-3 text-xl font-semibold">Your Element Title</h4>
          <p className="mb-4 text-gray-700">Your element description goes here.</p>
          <a href="#" className="px-4 py-2 rounded text-black">Read More</a>
        </div>
      
    </div>
    
      <div className="rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-center mb-4">
          {/* Add your icon or image here */}
          <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
        </div>
        <div className="text-center">
          <h4 className="mb-3 text-xl font-semibold">Your Element Title</h4>
          <p className="mb-4 text-gray-700">Your element description goes here.</p>
          <a href="#" className="px-4 py-2 rounded text-black">Read More</a>
        </div>
      
    </div>
    {/* Repeat the structure for other containers */}
  </div>
  </div>
  </div>





  <div className="container py-8 m-5 text-center items-center justify-content grid-col-4 m-auto">
  <div className="text-center animate__animated animate__bounceInUp" data-wow-delay="0.3s">
    <h1 className="text-5xl md:text-6xl mb-8 font-playfair">За вас ще се грижат</h1>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="col-span-1 sm:col-span-2 lg:col-span-1 animate__animated animate__bounceInUp" data-wow-delay="0.1s">
      <div className="rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-center mb-4">
          <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
        </div>
        <div className="text-center">
          <h4 className="mb-3 text-xl font-semibold">Вкусна храна</h4>
          <p className="mb-4 text-gray-700">При нас може да откриете разнообразие от хранителни вкусове и да се насладите на прясна и топла храна.</p>
          <a href="#" className="px-4 py-2 rounded text-black">Read More</a>
        </div>
      </div>
    </div>

    {/* Add another element */}

      <div className="rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-center mb-4">
          {/* Add your icon or image here */}
          <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
        </div>
        <div className="text-center">
          <h4 className="mb-3 text-xl font-semibold">Your Element Title</h4>
          <p className="mb-4 text-gray-700">Your element description goes here.</p>
          <a href="#" className="px-4 py-2 rounded text-black">Read More</a>
        </div>
      </div>
   

   
      <div className="rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-center mb-4">
          {/* Add your icon or image here */}
          <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
        </div>
        <div className="text-center ">
          <h4 className="mb-3 text-xl font-semibold">Your Element Title</h4>
          <p className="mb-4 text-gray-700">Your element description goes here.</p>
          <a href="#" className="px-4 py-2 rounded text-black">Read More</a>
        </div>
      
    </div>
    
      <div className="rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-center mb-4">
          {/* Add your icon or image here */}
          <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
        </div>
        <div className="text-center">
          <h4 className="mb-3 text-xl font-semibold">Your Element Title</h4>
          <p className="mb-4 text-gray-700">Your element description goes here.</p>
          <a href="#" className="px-4 py-2 rounded text-black">Read More</a>
        </div>
      
    </div>
    {/* Repeat the structure for other containers */}
  </div>
  </div>
  
  </div>
 
  );
};

export default Home;
