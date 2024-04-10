import React from 'react';
import regImg from '../images/login.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import {  useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

function Login() {


  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        try {
          await axios.post("/api/users/login", {
            email: email,
            password: password,
            }).then((res) => 
            {
             console.log(res.data);
             
             if (res.data.message == "Email not exits") 
             {
               alert("Email not exits");
             } 
             else if(res.data.message == "Login Success")
             { 
                
                navigate('/home');
             } 
              else 
             { 
                alert("Incorrect Email and Password not match");
             }
          }, fail => {
           console.error(fail); // Error!
  });
        }
 
         catch (err) {
          alert(err);
        }
      
      }


  return (
    
    <section className="bg-orange-200 min-h-screen flex items-center justify-center">
    <div className="bg-white shadow-lg rounded-lg p-8 m-11 md:flex">
    <div className="md:w-1/2 h-1/2 md:flex-auto md:flex-shrink-0 h-max-40 w-max-50">
  <img src={regImg} alt="Sample image" className="rounded-2xl w-full  md:h-50" />
</div>

      <div className=" md:w-1/2 h-1/2 mt-4 md:mt-0 md:ml-6">
        <p className="text-center text-4xl font-bold mb-5 mx-1 mx-md-4 mt-4">LOGIN</p>
        
          <form className="mx-1 mx-md-4 lg:flex lg:flex-col">

      <div className="m-6 max-w-full">
        <div className="flex items-center m-4">
        <FontAwesomeIcon icon={faUser} className="text-lg me-2" />
          <label htmlFor="username" className="sr-only">
            Email
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
            value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
          
          
          />
        </div>
      </div>
      <div className="m-6 max-w-full">
        <div className="flex items-center m-4">
        <FontAwesomeIcon icon={faLock} className="text-lg me-2" />
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            className="w-full md:w-2/3 lg:w-full xl:w-full border-b-2 border-gray-300 focus:outline-none focus:border-orange-200"
            value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
          
          />
        </div>
      </div>
      
      <div className="flex justify-center m-15">
        <button
          id="button"
          type="button"
          className="bg-red-700 text-white px-6 py-3 rounded-full hover:bg-red-800 focus:outline-none text-base"
          onClick={login}
        >
          Login
        </button>
      </div>
    </form>
        </div>
      </div>
    </section>
       
  )
}

export default Login