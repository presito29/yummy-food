import React, { useState, useEffect } from 'react';
import addImg from '../../images/table.png';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

function AddTable() {
    const [capacity, setCapacity] = useState("");
    const [smokerOrNo, setSmokerOrNo] = useState("");
    const [inside_outside, setInside_outside] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
          if (id) {
            try {
              const response = await axios.get(`/api/table/${id}`);
              setCapacity(response.data.capacity);
              setSmokerOrNo(response.data.smokerOrNo);
              setInside_outside(response.data.inside_outside);
            } catch (error) {
                alert(error);
            }
          }
        };
        fetchData();
      }, [id]);

    async function save(event) {
        event.preventDefault();
        try {
            let responseData;
            if (id) {
                responseData = await axios.put(`/api/table/${id}`, {
                    capacity: capacity,
                    smokerOrNo: smokerOrNo,
                    inside_outside: inside_outside
                });
              } else {
                responseData =  await axios.post("/api/table/save", {
                    capacity: capacity,
                    smokerOrNo: smokerOrNo,
                    inside_outside: inside_outside
                });
              }
           
            navigate("/");
            
        } catch (err) {
            alert(err);
        }
    }

    function pageTitle(){
        if(id){
          return <p className="text-center text-4xl font-bold mb-5 mx-1 mx-md-4 mt-4">UPDATE TABLE</p>
        }else{
          return <p className="text-center text-4xl font-bold mb-5 mx-1 mx-md-4 mt-4">ADD TABLE</p>
    
        }
    
      }
    

    return (
        <section className="bg-orange-200 min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg rounded-lg p-10 m-10 md:flex">
                <div className="md:w-1/2 h-1/2 md:flex-auto md:flex-shrink-0 h-max-40 w-max-50 mt-10">
                    <img src={addImg} alt="Sample image" className=" rounded-2xl h-45  my-12 w-full  md:h-50  " />
                </div>

                <div className=" md:w-1/2 h-1/2 mt-4 md:mt-0 md:ml-6">
                {pageTitle()}
        <br />
                    <form className="mx-1 mx-md-4 lg:flex lg:flex-col">

                        <div className="m-2 max-w-full">
                            <div className="flex items-center m-4">
                                <label htmlFor="capacity" className="sr-only">Capacity</label>
                                <input
                                    type="text"
                                    id="capacity"
                                    placeholder="Capacity"
                                    className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                                    value={capacity}
                                    onChange={(event) => setCapacity(event.target.value)}
                                />
                            </div>
                        </div>

                        <div className="m-2 max-w-full">
                            <div className="flex items-center m-4">
                                <label htmlFor="smokerOrNo"></label>
                                <select
                                    value={smokerOrNo}
                                    onChange={(event) => setSmokerOrNo(event.target.value)}
                                    className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                                    id="smokerOrNo"
                                    name="smokerOrNo">
                                                                            <option value="---">---</option>
 
                                    <option value="smoker">smoker</option>
                                    <option value="non-Smoker">non-smoker</option>
                                </select>
                            </div>
                        </div>

                        <div className="m-2 max-w-full">
                            <div className="flex items-center m-4">
                                <label htmlFor="inside_outside"></label><br />
                                <select
                                    id="inside_outside"
                                    name="inside_outside"
                                    className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
                                    value={inside_outside}
                                    onChange={(event) => setInside_outside(event.target.value)}>
                                         <option value="---">---</option>

                                    <option value="inside">inside</option>
                                    <option value="outside">outside</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-center m-15">
                            <button
                                id="button"
                                type="submit"
                                className="bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 focus:outline-none text-base"
                                onClick={save}
                            >
                                 {id ? 'Update Table' : 'Add Table'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default AddTable;
