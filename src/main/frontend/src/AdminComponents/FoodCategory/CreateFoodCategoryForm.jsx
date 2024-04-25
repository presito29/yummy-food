import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateFoodCategoryForm = () => {
    const [formData, setFormData] = useState({ name: "" });
    const navigate = useNavigate();
    const [error, setError] = useState(""); // State for error message

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setError("Category name is required"); // Set error message if name is empty
            return;
        }
        try {
            const response = await axios.post("/api/api/admin/category/create", formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            console.log("Category created:", response.data);
            // Handle success, reset form, show success message, etc.
            navigate("/admin/category")
            setFormData({ name: "" }); // Reset form after successful submission
            setError(""); // Reset error message

            // Fetch the latest category list after creating a new category
            // You can emit an event or call a function to update the category list in the parent component
            // For simplicity, let's assume there's a global function to fetch categories
            fetchCategories();
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
        setError(""); // Reset error message when user starts typing
    };

    return (
        <div className="">
            <div className="p-5">
                <h1 className="text-gray-400 text-center text-xl pb-10"> Добави категория</h1>
                <form className="space-y-5" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        id="name"
                        name="name"
                        label="Име на категорията"
                        variant="outlined"
                        onChange={handleInputChange}
                        value={formData.name}
                        error={!!error} // Set error state for TextField
                        helperText={error} // Display error message
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
