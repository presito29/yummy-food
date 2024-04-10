import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from "react";
import axios from 'axios';

const ShoppingCart = ({ minValue = 1, maxValue = 20 }) => {
  const [amounts, setAmounts] = useState({});
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`/api/cart/all`);
        console.log(response.data);
        // Инициализираме amounts с празен обект, където ключовете са идентификаторите на продуктите
        const initialAmounts = response.data.reduce((acc, curr) => {
          acc[curr.id] = 1; // Задаваме стойността по подразбиране на 1
          return acc;
        }, {});
        setAmounts(initialAmounts);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const increaseCounter = (id) => {
    setAmounts((prevAmounts) => {
      if (prevAmounts[id]) {
        // Ако продуктът вече съществува в количката, увеличаваме броя му с 1
        return { ...prevAmounts, [id]: prevAmounts[id] + 1 };
      } else {
        // Ако продуктът не съществува, го добавяме с начално количество 1
        return { ...prevAmounts, [id]: 1 };
      }
    });

   
  };
  
  const decreaseCounter = (id) => {
    setAmounts((prevAmounts) => {
      // Проверяваме дали броят е по-голям от минималния
      if (prevAmounts[id] > minValue) {
        // Намаляваме броя за съответния продукт
        return { ...prevAmounts, [id]: prevAmounts[id] - 1 };
      }
      return prevAmounts;
    });
  };


  return (
    <section className="h-full bg-orange-100">
      <div className="container mx-auto p-4 lg:p-8">
        <p className="text-2xl text-center my-4">Shopping Cart <span className="text-lg">({products.length} items in your cart)</span></p>

        {products.map((product) => (
          <div key={product.id} className="m-4 p-5 bg-white shadow-md rounded">
            <div className="flex items-center">
              <div className="w-1/6 m-3">
                <img src={product.imagePath} className="w-full" alt={`Product ${product.id + 1}`} />
              </div>
              <div className="w-1/6 flex justify-center m-3">
                <div>
                  <p className="text-lg text-gray-500 mb-2 sm:text-base">Name</p>
                  <p className="text-sm ">{product.name}</p>
                </div>
              </div>
              <div className="m-5 justify-center">
                <p className="text-lg text-gray-500 m-3 sm:text-base">Quantity</p>
                <div className="flex items-center justify-center max-w-[8rem]">
                  <button onClick={() => decreaseCounter(product.id)} type="button" className="quantity-button">
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <span className="text-sm mx-3">{amounts[product.id] == 0 ? 1 : amounts[product.id]}</span>
                  <button onClick={() => increaseCounter(product.id)} type="button" className="quantity-button">
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
              <div className="w-1/6 flex justify-center m-3">
                <div>
                  <p className="text-lg text-gray-500 mb-2 sm:text-base">Price</p>
                  <p className="text-sm">{product.price}</p>
                </div>
              </div>
              <div className="w-1/6 flex justify-center m-3">
                <div>
                  <p className="text-lg text-gray-500 mb-2 sm:text-base">Total</p>
                  {amounts[product.id] !== 0 && (
                    <p className="text-sm">{amounts[product.id] * parseFloat(product.price)}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="mb-5 p-4 bg-white shadow-md rounded flex justify-between items-center">
          <p className="text-2xl font-semibold">Order total:</p>
          <p className="text-2xl font-semibold">
            {/* Изчисляваме общата цена като сума на цените на продуктите умножено по броя на всяка позиция */}
            {products.reduce((acc, curr) => acc + (amounts[curr.id] * parseFloat(curr.price)), 0)}
          </p>
        </div>

        <div className="flex justify-end mt-4">
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Continue shopping
            </span>
          </button>
          <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Add to cart
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShoppingCart;
