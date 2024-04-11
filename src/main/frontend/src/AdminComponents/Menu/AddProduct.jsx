import React, { useState, useEffect } from 'react';
import addImg from '../../images/add.jpg';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function AddProduct() {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');

  const { id } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [capacity, setCapacity] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(undefined);

  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [capacityError, setCapacityError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/product/${id}`);
          setName(response.data.name);
          setPrice(response.data.price);
          setCategory(response.data.category);
          setCapacity(response.data.capacity);
          setDescription(response.data.description);
          setImage(response.data.image);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };
    fetchData();
  }, [id]);

  const handleSave = async (event) => {
    event.preventDefault();
    // Validation
    let isValid = true;
    if (!name.trim()) {
      setNameError('Name is required');
      isValid = false;
    }
    if (!price.trim()) {
      setPriceError('Price is required');
      isValid = false;
    }
    if (!category.trim()) {
      setCategoryError('Category is required');
      isValid = false;
    }
    if (!capacity.trim()) {
      setCapacityError('Capacity is required');
      isValid = false;
    }
    if (!description.trim()) {
      setDescriptionError('Description is required');
      isValid = false;
    }
    if (!isValid) {
      return;
    }
    try {
      let responseData;
      const config = {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      };
  
      if (id) {
        responseData = await axios.put(`/api/api/admin/${id}`, {
          name,
          price,
          category,
          capacity,
          description,
        }, config);
      } else {
        responseData = await axios.post('/api/api/admin/create', {
          name,
          price,
          category,
          capacity,
          description,
        }, config);
      }
  
      // Handle response
      if (image) {
        const formData = new FormData();
        formData.append('id', responseData.data.id);
        formData.append('file', image);
        await axios.put('/api/api/admin/photo', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${jwt}`
          },
        });
      }
  
      alert('Product saved successfully');
      navigate('/admin/menu');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  function pageTitle() {
    return id ? (
      <p className="text-center text-4xl font-bold mb-5 mx-1 mx-md-4 mt-4">
        UPDATE PRODUCT
      </p>
    ) : (
      <p className="text-center text-4xl font-bold mb-5 mx-1 mx-md-4 mt-4">
        ADD PRODUCT
      </p>
    );
  }

  return (
    <section className="bg-orange-200 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 m-10 md:flex">
        <div className="md:w-1/2 h-1/2 md:flex-auto md:flex-shrink-0 h-max-40 w-max-50">
          <img
            src={addImg}
            alt="Sample image"
            className="rounded-2xl h-45  my-12 w-full  md:h-50  "
          />
        </div>

        <div className="md:w-1/2 h-1/2 mt-4 md:mt-0 md:ml-6">
          {pageTitle()}
          <br />
          <form className="mx-1 mx-md-4 lg:flex lg:flex-col">
            <div className="m-2 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Name"
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    setNameError('');
                  }}
                />
              </div>
              {nameError && <span className="text-red-500">{nameError}</span>}

            </div>
            <div className="m-2 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="price" className="sr-only">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  placeholder="Price"
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                  value={price}
                  onChange={(event) => {
                    setPrice(event.target.value);
                    setPriceError('');
                  }}
                />
              </div>
              {priceError && <span className="text-red-500">{priceError}</span>}

            </div>
            <div className="m-2 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="category" className="sr-only">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  placeholder="Category"
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                  value={category}
                  onChange={(event) => {
                    setCategory(event.target.value);
                    setCategoryError('');
                  }}
                />
                
              </div>
              {categoryError && <span className="text-red-500">{categoryError}</span>}
            </div>
            <div className="m-2 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="capacity" className="sr-only">
                  Capacity
                </label>
                <input
                  type="text"
                  id="capacity"
                  placeholder="Capacity"
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                  value={capacity}
                  onChange={(event) => {
                    setCapacity(event.target.value);
                    setCapacityError('');
                  }}
                />
              </div>
              {capacityError && <span className="text-red-500">{capacityError}</span>}

            </div>
            <div className="m-2 max-w-full">
              <div className="flex items-center m-3">
                <label htmlFor="description" className="sr-only">
                  Description
                </label>
                <textarea
                  placeholder="Description"
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                  value={description}
                  onChange={(event) => {
                    setDescription(event.target.value);
                    setDescriptionError('');
                  }}
                />
               
              </div>
              {descriptionError && <span className="text-red-500">{descriptionError}</span>}
            </div>
            <div className="m-2 max-w-full">
              <div className="flex items-center m-4">
                <label htmlFor="file" className="sr-only">
                  Upload Image
                </label>
                <input
                  type="file"
                  id="file"
                  placeholder="Upload Image"
                  className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 
    file:bg-gradient-to-b
    file:from-orange-300
    file:to-orange-500
    file:px-6 file:py-1 
    file:m-1 file:border-none
    file:rounded-full
    file:text-gray
    file:cursor-pointer
    file:shadow-lg 
    file:shadow-orange-400/25"
                  onChange={(event) => {
                    setImage(event.target.files[0]);
                  }}
                />
              </div>
            </div>
            <br />
            <div className="flex justify-center m-15">
              <button
                id="button"
                type="button"
                className="bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 focus:outline-none text-base"
                onClick={handleSave}
              >
                {id ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default AddProduct;
