import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

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
            <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
                {({ errors, touched }) => (
                    <Form>
                         <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />

                        <Field as={TextField}
                            name="username"
                            label="Username"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />

                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                        <Field as={TextField}
                            name="firstName"
                            label="First Name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        

                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                        <Field as={TextField}
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        

                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        <Field as={TextField}
                            name="email"
                            label="Email"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        

                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        <Field as={TextField}
                            name="password"
                            label="Password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="password"
                        />
                        
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm"  />
                        <Field as={TextField}
                            name="confirmPassword"
                            label="Confirm Password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="password"
                        />
                        

                        <Button sx={{mt:2, padding:"1rem"}} fullWidth type="submit" variant="contained">Register</Button>
                    </Form>
                )}
            </Formik>
            <Typography variant="body2" align="center" sx={{mt:3}}>
                Имаш акаунт?
                <Button size="small" onClick={() => navigate("/account/login")}>Логни се</Button>
            </Typography>
        </div>
    )
}
