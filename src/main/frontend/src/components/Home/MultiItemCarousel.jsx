import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick'; // Add this import statement
import { topMeel } from './topMeels';

const MultiItemCarousel = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        
      };
  return (
    <div >
      <Slider {...settings}>
        {topMeel.map((item, index) => (
          <div key={index} className=' flex flex-col items-center justify-center'>
          <img src={item.image} alt={`Slide ${index}`} className='w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full object-cover object-center'/>
          <h4 className='- text-center py-5 pr-12 font-semibold text-xl text-gray bg-grey-400'>{item.title}</h4>
        </div>
        ))}
      </Slider>
    </div>
  );
};

export default MultiItemCarousel;
