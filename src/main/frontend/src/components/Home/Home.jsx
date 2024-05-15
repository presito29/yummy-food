import React, { useEffect, useState } from 'react';
import homeImg2 from '../../images/home2.jpg';
import homeImg from '../../images/home30.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faArrowRight, faCodeFork } from '@fortawesome/free-solid-svg-icons';
import { MdOutlineRestaurantMenu, MdOutlineLocalDining } from 'react-icons/md';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import SpaIcon from '@mui/icons-material/Spa';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import MulriItemCarousel from './MultiItemCarousel';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { Auth } from '../Auth/Auth';
import { findCart } from '../State/Cart/Action';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");


  const handleLogoClick = () => {
    navigate("/");
  };
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
      
  <div className='p-5 lg:p-10 lg:py-10 lg:px-20'>
      <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Топ продукти</p>
      <MulriItemCarousel />
    </div>
        
        
        
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
              <a href="#" 
         onClick={(e) => { 
           e.preventDefault(); 
           navigate('/aboutUs'); 
         }} 
         className="py-3 px-5 flex items-center text-black">
        За нас
        <FontAwesomeIcon icon={faArrowRight} className="text-lg ml-2" />
      </a>            </div>
          </div>
        </div>
        <div className="container py-8 m-5 text-center items-center justify-content grid-col-4 m-auto">
  <div className="text-center animate__animated animate__bounceInUp" data-wow-delay="0.3s">
    <h1 className="text-5xl md:text-6xl mb-8 font-playfair">Какво ви предлагаме</h1>
  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div className="rounded bg-white p-4 shadow-md">
      <div className="flex items-center justify-center mb-4">
        <MenuBookIcon style={{ fontSize: 80, color: 'primary', marginBottom: '4px', flex: 'auto' }} />
      </div>
      <div className="text-center">
        <h4 className="mb-3 text-xl font-semibold">Изискано меню</h4>
        <p className="mb-4 text-gray-700">Нашето изкусно меню предлага разнообразие от изкушения, които задоволяват всеки вкус и предпочитание, поднесени с изящество и внимание към детайлите.</p>
      </div>
    </div>

    <div className="rounded bg-white p-4 shadow-md">
      <div className="flex items-center justify-center mb-4">
        <SpaIcon style={{ fontSize: 80, color: 'primary', marginBottom: '4px', flex: 'auto' }} />
      </div>
      <div className="text-center">
        <h4 className="mb-3 text-xl font-semibold">Уютна обстановка</h4>
        <p className="mb-4 text-gray-700">Нашият ресторант предлага приятна и уютна атмосфера, подходяща както за романтични вечери, така и за семейни събирания.</p>
      </div>
    </div>

    <div className="rounded bg-white p-4 shadow-md">
      <div className="flex items-center justify-center mb-4">
        <ThumbUpAltIcon style={{ fontSize: 80, color: 'primary', marginBottom: '4px', flex: 'auto' }} />
      </div>
      <div className="text-center">
        <h4 className="mb-3 text-xl font-semibold">Приветливо обслужване</h4>
        <p className="mb-4 text-gray-700">Екипът ни се стреми да осигури най-доброто обслужване и да направи вашето посещение незабравимо.</p>
      </div>
    </div>

    <div className="rounded bg-white p-4 shadow-md">
      <div className="flex items-center justify-center mb-4">
        <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
      </div>
      <div className="text-center">
        <h4 className="mb-3 text-xl font-semibold">Потопете се във вкуса на удоволствието</h4>
        <p className="mb-4 text-gray-700">Разгледайте нашата разнообразна гама от изкушаващи ястия и напитки, създадени с любов и страст към готвенето.</p>
      </div>
    </div>

    <div className="rounded bg-white p-4 shadow-md">
      <div className="flex items-center justify-center mb-4">
        <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
      </div>
      <div className="text-center">
        <h4 className="mb-3 text-xl font-semibold">Професионално обучен персонал</h4>
        <p className="mb-4 text-gray-700">Нашите служители са професионалисти, които се грижат за вашето удобство и удоволствие по време на посещението ви.</p>
      </div>
    </div>

    <div className="rounded bg-white p-4 shadow-md">
      <div className="flex items-center justify-center mb-4">
        <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
      </div>
      <div className="text-center">
        <h4 className="mb-3 text-xl font-semibold">Сътрудничество и екипна работа</h4>
        <p className="mb-4 text-gray-700">В нашия екип ценим сътрудничеството и сме настроени да работим заедно, за да осигурим най-доброто обслужване за нашите гости.</p>
      </div>
      </div>
      <div className="rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-center mb-4">
         
          <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
        </div>
        <div className="text-center ">
        <h4 className="mb-3 text-xl font-semibold">Отзивчива клиентска поддръжка</h4>
          <p className="mb-4 text-gray-700">Нашите служители са тук, за да ви помогнат с всякакви въпроси или нужди, които може да имате по време на вашето престойство.</p>
          
         
        </div>
      
        
  </div>
  <div className="rounded bg-white p-4 shadow-md">
        <div className="flex items-center justify-center mb-4">
         
          <MdOutlineRestaurantMenu size={80} className="text-primary mb-4 flex-auto" />
        </div>
        <div className="text-center">
        <h4 className="mb-3 text-xl font-semibold">Безопасност и сигурност</h4>
          <p className="mb-4 text-gray-700">За нас важност има вашата безопасност, затова сме внимателни и предпазливи, за да осигурим защита на нашите гости и персонал.</p>
          
         
        </div>
  </div>
      </div>
      </div>
      </div>
      </div>
 
  );
};

export default Home;
