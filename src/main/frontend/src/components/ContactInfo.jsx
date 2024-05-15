import React from 'react';
import img1 from '../images/contact1.jpg';
import img2 from '../images/contact2.webp';
import img3 from '../images/contact3.jpg';
import img4 from '../images/contact4.jpg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarker, faPhone, faClock } from '@fortawesome/free-solid-svg-icons';

const ContactInfo = () => (
  <div className="contact-info m-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-1">
    {/* Местоположение */}
    <div className="contact-card">
      <div className="p-6 flex items-center bg-orange-200">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl mb-2 font-serif text-center">
            <FontAwesomeIcon icon={faMapMarker} className="text-2xl me-2" />
            МЕСТОПОЛОЖЕНИЕ
          </h2>
          <p className="text-gray-600 text-center">
            43 ул. Реймут, Балтимор,<br />
            Лондон 3910
          </p>
        </div>
        <div className="w-1/2">
          <img src={img1} alt="Местоположение" className="w-full h-auto rounded" />
        </div>
      </div>
    </div>

    {/* Работно време */}
    <div className="contact-card flow-root">
      <div className="p-6 flex items-center">
        <div className="w-1/2 float-left">
          <img src={img2} alt="Работно време" className="w-full h-auto rounded" />
        </div>
        <div className="w-1/2 pl-7 float-right">
          <h2 className="text-xl mb-2 text-center">
            <FontAwesomeIcon icon={faClock} className="text-2xl me-2" />
            РАБОТНО ВРЕМЕ
          </h2>
          <p className="text-gray-600 text-center">
            Неделя-Петък:
          </p>
          <p className="text-gray-600 text-center">
            11:00 - 23:00
          </p>
        </div>
      </div>
    </div>

    {/* Имейл */}
    <div className="contact-card">
      <div className="p-6 flex items-center bg-orange-200">
        <div className="w-1/2 pr-4">
          <h2 className="text-xl mb-2 text-center">
            <FontAwesomeIcon icon={faEnvelope} className="text-2xl me-2" />
            ИМЕЙЛ
          </h2>
          <p className="text-gray-600 text-center">info@Untree.co</p>
        </div>
        <div className="w-1/2">
          <img src={img3} alt="Имейл" className="w-full h-auto rounded" />
        </div>
      </div>
    </div>

    {/* Телефон */}
    <div className="contact-card flow-root">
      <div className="p-6 flex items-center">
        <div className="w-1/2 float-left">
          <img src={img4} alt="Телефон" className="w-full h-auto rounded" />
        </div>
        <div className="w-1/2 pl-7 text-center">
          <h2 className="text-xl mb-2 text-center">
            <FontAwesomeIcon icon={faPhone} className="text-2xl me-2" />
            ТЕЛЕФОН
          </h2>
          <p className="text-xl font-serif text-center">+1 1234 55488 55</p>
        </div>
      </div>
    </div>
  </div>
);

export default ContactInfo;
