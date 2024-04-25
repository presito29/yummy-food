import React, { useEffect } from "react";
import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { loginUser } from "../State/Authentication/Action";

const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required")
});

const initialValues = {
    email: "",
    password: ""
};

export const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

   
    const token = new URLSearchParams(location.search).get('token');

    useEffect(() => {
        if (token) {
            
            axios.get(`http://localhost:8080/auth/confirm-account?token=${token}`)
                .then(response => {
                    
                    navigate("/account/login");
                })
                .catch(error => {
                    console.error('Error verifying email:', error);
                    
                });
        }
    }, [navigate, token]);

    const handleSubmit = (values) => {
        dispatch(loginUser({ userData: values, navigate }))
    }

    return (
        <div className="">
            <Typography variant="h5" className="text-center">Login</Typography>
            <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
                <Form>
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                    <Field as={TextField} name="email" label="Email" fullWidth variant="outlined" margin="normal" />
                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    <Field as={TextField} name="password" label="Password" fullWidth variant="outlined" margin="normal" type="password" />
                    <Button sx={{ mt: 2, padding: "1rem" }} fullWidth type="submit" variant="contained">Login</Button>
                </Form>
            </Formik>
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>Нямаш акаунт?
                <Button size="small" onClick={() => navigate("/account/register")}>Регистрирай се</Button>
            </Typography>
        </div>
    )
};
