import React, { useState } from 'react';
import resImg from '../images/res.png';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';

function Reservation() {
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState('');
  const [capacity, setCapacity] = useState('');
  const [smokerOrNo, setSmokerOrNo] = useState('');
  const [inside_outside, setInside_outside] = useState('');

  const [validationMessages, setValidationMessages] = useState({
    reservationDate: '',
    reservationTime: '',
    capacity: '',
    smokerOrNo: '',
    inside_outside: ''
  });

  function validateForm() {
    const messages = {
      reservationDate: '',
      reservationTime: '',
      capacity: '',
      smokerOrNo: '',
      inside_outside: ''
    };

    let isValid = true;

    if (!reservationDate) {
      messages.reservationDate = 'Моля, въведете дата на резервация.';
      isValid = false;
    }

    if (!reservationTime) {
      messages.reservationTime = 'Моля, въведете час на резервация.';
      isValid = false;
    }

    if (!capacity || capacity <= 0) {
      messages.capacity = 'Моля, въведете валиден капацитет.';
      isValid = false;
    }

    if (!smokerOrNo) {
      messages.smokerOrNo = 'Моля, изберете пушач или непушач.';
      isValid = false;
    }

    if (!inside_outside) {
      messages.inside_outside = 'Моля, изберете вътре или вън.';
      isValid = false;
    }

    setValidationMessages(messages);
    return isValid;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
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
      alert("Вашата резервация е успешно направена!");
    } catch (err) {
      alert("Няма намерена маса за посочените от вас опции!");
    }
  }

  return (
    <section className="bg-orange-200 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 m-11 md:flex">
        <div className="md:w-1/2 h-1/2 md:flex-auto md:flex-shrink-0">
          <img src={resImg} alt="Sample image" className="rounded-2xl w-full md:h-50 mt-12" />
        </div>

        <div className="md:w-1/2 h-1/2 mt-4 md:mt-0 md:ml-6">
          <p className="text-center text-4xl font-bold mb-5 mx-1 mx-md-4 mt-4">РЕЗЕРВАЦИЯ</p>

          <form onSubmit={handleSubmit} className="mx-1 mx-md-4 lg:flex lg:flex-col">
            <div className="m-4 max-w-full">
              <div className="flex items-center m-4">
                <FontAwesomeIcon icon={faCalendarAlt} className="text-lg me-2" />
                <label htmlFor="reservationDate" className="sr-only">Дата на резервация</label>
                <input
                  type="date"
                  id="reservationDate"
                  placeholder="Дата на резервация"
                  value={reservationDate}
                  onChange={(e) => setReservationDate(e.target.value)}
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                />
              </div>
              {validationMessages.reservationDate && (
                <p className="text-red-500 text-xs italic">{validationMessages.reservationDate}</p>
              )}
            </div>

            <div className="m-4 max-w-full">
              <div className="flex items-center m-4">
                <FontAwesomeIcon icon={faClock} className="text-lg me-2" />
                <label htmlFor="reservationTime" className="sr-only">Час на резервация</label>
                <input
                  type="time"
                  id="reservationTime"
                  placeholder="Час на резервация"
                  value={reservationTime}
                  onChange={(e) => setReservationTime(e.target.value)}
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                />
              </div>
              {validationMessages.reservationTime && (
                <p className="text-red-500 text-xs italic">{validationMessages.reservationTime}</p>
              )}
            </div>

            <div className="m-4 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="capacity" className="sr-only">Капацитет</label>
                <input
                  type="number"
                  id="capacity"
                  placeholder="Капацитет"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                />
              </div>
              {validationMessages.capacity && (
                <p className="text-red-500 text-xs italic">{validationMessages.capacity}</p>
              )}
            </div>

            <div className="m-4 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="smokerOrNo" className="sr-only">Пушач или Непушач</label>
                <select
                  id="smokerOrNo"
                  value={smokerOrNo}
                  onChange={(e) => setSmokerOrNo(e.target.value)}
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                >
                  <option value="">Изберете опция</option>
                  <option value="smoker">Пушач</option>
                  <option value="non-smoker">Непушач</option>
                </select>
              </div>
              {validationMessages.smokerOrNo && (
                <p className="text-red-500 text-xs italic">{validationMessages.smokerOrNo}</p>
              )}
            </div>

            <div className="m-4 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="inside_outside" className="sr-only">Вътре или Вън</label>
                <select
                  id="inside_outside"
                  value={inside_outside}
                  onChange={(e) => setInside_outside(e.target.value)}
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                >
                  <option value="">Изберете опция</option>
                  <option value="inside">Вътре</option>
                  <option value="outside">Вън</option>
                </select>
              </div>
              {validationMessages.inside_outside && (
                <p className="text-red-500 text-xs italic">{validationMessages.inside_outside}</p>
              )}
            </div>

            <div className="flex justify-center m-15">
              <button
                type="submit"
                className="bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 focus:outline-none text-base"
              >
                Резервация
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Reservation;
