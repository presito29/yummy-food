import { Button, TextField, Typography } from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../State/Authentication/Action";
import { useDispatch } from "react-redux";

import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Потребителското име е задължително"),
  firstName: Yup.string().required("Първото име е задължително"),
  lastName: Yup.string().required("Фамилията е задължителна"),
  email: Yup.string().email("Невалиден имейл").required("Имейлът е задължителен"),
  password: Yup.string().min(8, "Паролата трябва да бъде поне 8 символа").required("Паролата е задължителна"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Паролите трябва да съвпадат')
    .required('Потвърждението на паролата е задължително'),
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

export const RegistrationForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        console.log("form values", values)
        dispatch(registerUser({userData:values, navigate }))
    }

    return (
        <div className="">
            <Typography variant="h5" className="text-center">
                Регистрация
            </Typography>
            <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
                {({ errors, touched }) => (
                    <Form>
                        <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                        <Field as={TextField}
                            name="username"
                            label="Потребителско име"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        
                        <ErrorMessage name="firstName" component="div" className="text-red-500 text-sm" />
                        <Field as={TextField}
                            name="firstName"
                            label="Първо име"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        
                        <ErrorMessage name="lastName" component="div" className="text-red-500 text-sm" />
                        <Field as={TextField}
                            name="lastName"
                            label="Фамилия"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        
                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                        <Field as={TextField}
                            name="email"
                            label="Имейл"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                        />
                        
                        <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                        <Field as={TextField}
                            name="password"
                            label="Парола"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="password"
                        />
                        
                        <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
                        <Field as={TextField}
                            name="confirmPassword"
                            label="Потвърди парола"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            type="password"
                        />
                        
                        <Button sx={{mt:2, padding:"1rem"}} fullWidth type="submit" variant="contained">Регистрация</Button>
                    </Form>
                )}
            </Formik>
            <Typography variant="body2" align="center" sx={{mt:3}}>
                Имаш акаунт?
                <Button size="small" onClick={() => navigate("/account/login")}>Вход</Button>
            </Typography>
        </div>
    )
}
