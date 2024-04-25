import React, { useState } from 'react';
import resImg from '../images/res.png'
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';



function Reservation() {
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [capacity, setCapacity] = useState('');
  const [smokerOrNo, setSmokerOrNo] = useState('');
  const [inside_outside, setInside_outside] = useState('');

  async function handleSubmit(event) {
    // Предотвратява презареждането на страницата при изпращане на формата
    event.preventDefault();

    try {
        // Изпраща POST заявка към сървъра
        const response = await axios.post("http://localhost:8080/reservation", {
    reservationDate: reservationDate,
    reservationTime: reservationTime,
    capacity: capacity,
    smokerOrNo: smokerOrNo,
    inside_outside: inside_outside
}, {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
});


        // Ако заявката е успешна (HTTP статус 200-299), извежда съобщение за успешно регистриране на резервацията
        if (response.status >= 200 && response.status < 300) {
            alert("Reservation successfully created");
        } else {
            // В случай на неуспешна заявка, извежда съобщение с грешката от сървъра
            alert(`Failed to create reservation: ${response.statusText}`);
        }
    } catch (err) {
        // В случай на грешка при изпълнение на заявката, извежда грешката
        alert(`Error: ${err.message}`);
    }
}

  return (
    
    
    <section className="bg-orange-200 min-h-screen flex items-center justify-center">
      
      <div className="bg-white shadow-lg rounded-lg p-8 m-11 md:flex">
        
        <div className="md:w-1/2 h-1/2 md:flex-auto md:flex-shrink-0 ">
          <img src={resImg} alt="Sample image" className="rounded-2xl w-full md:h-50 mt-12" />
        </div>

        <div className="md:w-1/2 h-1/2 mt-4 md:mt-0 md:ml-6">
          <p className="text-center text-4xl font-bold mb-5 mx-1 mx-md-4 mt-4">RESERVATION</p>

          <form onSubmit={handleSubmit} className="mx-1 mx-md-4 lg:flex lg:flex-col">

            <div className="m-4 max-w-full">
              <div className="flex items-center m-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-lg me-2" />
                <label htmlFor="reservationDate" className="sr-only">
                  Reservation Date
                </label>
                <input
                  type="date"
                  id="reservationDate"
                  placeholder="Reservation Date"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                />
              </div>
            </div>

            <div className="m-4 max-w-full">
              <div className="flex items-center m-4">
                <FontAwesomeIcon icon={faClock} className="text-lg me-2" />
                <label htmlFor="reservationTime" className="sr-only">
                  Reservation Time
                </label>
                <input
                  type="time"
                  id="reservationTime"
                  placeholder="Reservation Time"
                  value={reservationTime}
                  onChange={(e) => setReservationTime(e.target.value)}
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                />
              </div>
            </div>

            <div className="m-4 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="capacity" className="sr-only">
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  placeholder="Capacity"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                />
              </div>
            </div>

            <div className="m-4 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="smokerOrNo" className="sr-only">
                  Smoker or Non-smoker
                </label>
                <select
                  id="smokerOrNo"
                  value={smokerOrNo}
                  onChange={(e) => setSmokerOrNo(e.target.value)}
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                >
                  <option value="">Select Option</option>
                  <option value="smoker">Smoker</option>
                  <option value="non-smoker">Non-smoker</option>
                </select>
              </div>
            </div>

            <div className="m-4 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="insideOutside" className="sr-only">
                  Inside or Outside
                </label>
                <select
                  id="inside_outside"
                  value={inside_outside}
                  onChange={(e) => setInside_outside(e.target.value)}
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                >
                  <option value="">Select Option</option>
                  <option value="inside">Inside</option>
                  <option value="outside">Outside</option>
                </select>
              </div>
            </div>

            <div className="flex justify-center m-15">
              <button
                type="submit"
                className="bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 focus:outline-none text-base"
              >
               Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    
  );
}

export default Reservation;
