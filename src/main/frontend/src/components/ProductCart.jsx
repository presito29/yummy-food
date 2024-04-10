import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductCard = () => {
    
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/product/${id}`);
        console.log(response.data)
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async (id) => {
    try {
        const response = await axios.post(`/api/cart/add/${id}`);
        console.log(response.data); 
        navigate(`/order`);
    } catch (error) {
        console.error("Error adding product to cart:", error);
    }
};

  if (!product) {
    return <div>Loading...</div>;
  }

   

    return (
      <div className="flex flex-col justify-between lg:flex-row gap-16 lg:items-center">
        <div className="flex flex-col gap-6 lg:w-2/4">
        <img src={product.imagePath} alt={product.name} className="w-full h-full aspect-square object-cover rounded-lg" />
        </div>

        <div className="flex flex-col gap-4 lg:w-2/4">
            <div>
            <span className="text-red-600 font-semibold">{product.category}</span>
                    <h1 className="text-4xl font-bold">{product.name}</h1>

            </div>
            <p className="text-gray-700">
                {product.description}
            </p>
            <h6 className="text-2xl font-semibold">Price: {product.price}</h6>
            <div className="flex flex-row items-center gap-12">
                
                <button className="bg-red-500 text-white font-semibold py-3 px-16 rounded-xl h-full" onClick={() => addToCart(product.id)}>Add to Order</button>
            </div>
        </div>
      </div>
    );
  };
  
  
  export default ProductCard;