import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


function TableAllProductsRoot() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Move useNavigate hook outside the component


  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await axios.get("/api/product/all"); 
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const addForm = () => {
    navigate("/add-product"); // Use navigate directly
  };

  const updateProduct = (id) => {
    navigate(`/update-product/${id}`);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/product/${id}`);
      setProducts(products.filter(product => product.id !== id));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

    return (
    <div>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-orange-300">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Productname
              </th>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Photo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Update
              </th>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="bg-orange-200 divide-y divide-gray-300">
          {products.map(product => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <img src={product.imagePath} alt={product.imageName} className='w-30 h-40 object-cover' />
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.capacity} g
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {product.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-red active:bg-red-800" onClick={() => updateProduct(product.id)}>Update</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-red active:bg-red-800" onClick={() => deleteProduct(product.id)}>Delete</button>              
              </td>
            </tr>
           
           ))}
          </tbody>
        </table>
         <br />
      <div className="flex justify-center m-15">
       
        <button
          id="button"
          type="button"
          className="bg-orange-600 text-white px-6 py-3 rounded-full hover:bg-red-800 focus:outline-none text-base" 
          onClick={addForm}
        >
          Add Product
        </button>
      </div>
          </div>
      );
};

export default TableAllProductsRoot;