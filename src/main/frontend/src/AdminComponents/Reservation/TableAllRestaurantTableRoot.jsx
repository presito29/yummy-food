
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TableAllRestaurantTableRoot() {
  const [tables, setTables] = useState([]);
  const navigate = useNavigate(); // Move useNavigate hook outside the component


  useEffect(() => {
    loadTable();
  }, []);

  const loadTable = async () => {
    try {
      const response = await axios.get("/api/table/all"); 
      console.log(response.data);
      setTables(response.data);
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

   const addForm = () => {
    navigate("/admin/add-table"); // Use navigate directly
  }; 

  const updateTable = (id) => {
    navigate(`/admin/update-table/${id}`);
  }; 

  const deleteTable = async (id) => {
    try {
      await axios.delete(`/api/table/delete/${id}`);
      setTables(tables.filter(table => table.id !== id));
      
    } catch (error) {
      console.error('Error deleting table:', error);
      alert('Failed to delete table');
    }
  };
    return (
      <div>
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-orange-300">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Table Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Capacity
              </th>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Smoker Or No
              </th>
              <th scope="col" className="px-6 py-3 text-left text-lg font-large text-gray-800 uppercase tracking-wider">
                Inside Or Outside
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
          {tables.map(table => (
            <tr key={table.id} className='justify-center'>
              <td className="px-6 py-4 whitespace-nowrap">
                {table.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {table.capacity}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
               {table.smokerOrNo}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {table.inside_outside}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-red active:bg-red-800" onClick={() => updateTable(table.id)}>Update</button>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-red active:bg-red-800" onClick={() => deleteTable(table.id)}>Delete</button>              
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
          Add Table
        </button>
      </div>
          </div>
      );
};

export default TableAllRestaurantTableRoot;