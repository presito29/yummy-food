import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';

const CreateFoodCategoryForm = () => {
    const [formData, setFormData] = useState({ name: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/api/admin/category/create", formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            console.log("Category created:", response.data);
            // Handle success, reset form, show success message, etc.
        } catch (error) {
            console.error("Error creating category:", error);
            // Handle error, show error message, etc.
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div className="">
            <div className="p-5">
                <h1 className="text-gray-400 text-center text-xl pb-10"> Добави категория</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name" // Corrected name attribute
                        label="Име на категорията"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.name} // Corrected value attribute
                    />
                    <Button variant="contained" type="submit">
                        Добави категория
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateFoodCategoryForm;
