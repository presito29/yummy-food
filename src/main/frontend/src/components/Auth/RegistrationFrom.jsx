import { Button, FormControl, InputLabel, MenuItem, TextField, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";
import { useDispatch } from "react-redux";


const initialValues = {
    username:"",
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
    role:"USER"
}
 export const RegistrationForm = () =>{
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) =>{
        console.log("form values", values )
        dispatch(registerUser({userData:values, navigate }))

    }
    return(
        <div className="">

            <Typography variant="h5" className="text-center">
                Register
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues}>
                <Form>
                <Field as={TextField}
                    name = "username"
                    label = "Username"
                    fullWidth
                    variant = "outlined"
                    margin ="normal"/>

                <Field as={TextField}
                    name = "firstName"
                    label = "First Name"
                    fullWidth
                    variant = "outlined"
                    margin ="normal"/>

                <Field as={TextField}
                    name = "lastName"
                    label = "Last Name"
                    fullWidth
                    variant = "outlined"
                    margin ="normal"/>

                    <Field as={TextField}
                    name = "email"
                    label = "Email"
                    fullWidth
                    variant = "outlined"
                    margin ="normal"/>

                  <Field as={TextField}
                    name = "password"
                    label = "Password"
                    fullWidth
                    variant = "outlined"
                    margin ="normal"
                    type = "password"/>

                 <Field as={TextField}
                    name = "confirmPassword"
                    label = "Confirm Password"
                    fullWidth
                    variant = "outlined"
                    margin ="normal"
                    type = "password"/>
                    
                    <Button sx={{mt:2, padding:"1rem"}} fullWidth type="submet" variant="conteined">Register</Button>
                </Form>
            </Formik>
            <Typography variant="body2" align="center" sx={{mt:3}}>
                 Имаш акаунт?
                <Button size="small" onClick={()=> navigate("/account/login")}>Логни се</Button>

            </Typography>
        </div>
    )
 }