import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const addToCart = async (id) => {
    try {
        const response = await axios.post(`/api/cart/add/${id}`);
        console.log(response.data); 
        navigate(`/order/${amount}`);
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

  const loadProducts = async () => {
    try {
      const response = await axios.get("/api/product/all"); 
      console.log(response.data)
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };


  return (
    <div className="container mx-auto ">
      <h4 className="text-center text-2xl font-bold mb-4">Drink</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 m-auto">
        {products.map((product) => (
          <div key={product.id} className="card border h-50 w-80 items-center m-auto">
            <Link to={`/product-details/${product.id}`}>
              <div className="main-img">
              <img src={product.imagePath} alt={product.name} className="w-full h-48 object-cover" />
              </div>
              </Link>
            <div className="card-body border mt-1 py-4 h-32 text-center">
              <h2 className="text-lg font-semibold mb-1">{product.name}</h2>
              <p className="text-xs text-gray-600 mb-3">Starting from <span className="font-semibold">{product.price}</span></p>
              <button className="" onClick={() => addToCart(product.id)}>
    Add to cart {product.name.toLowerCase()}
</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
