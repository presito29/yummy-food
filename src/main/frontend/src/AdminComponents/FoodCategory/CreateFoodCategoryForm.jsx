import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const CreateFoodCategoryForm = () => {
    const [formData, setFormData] = useState({ name: "" });
    const navigate = useNavigate();
    const [error, setError] = useState(""); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            setError("Category name is required"); 
            return;
        }
        try {
            const response = await axios.post("/api/api/admin/category/create", formData, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('jwt')}`
                }
            });
            console.log("Category created:", response.data);
           
            navigate("/admin/category")
            setFormData({ name: "" }); 
            setError(""); 

           
            fetchCategories();
        } catch (error) {
            console.error("Error creating category:", error);
            
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setError(""); 
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
                        error={!!error} 
                        helperText={error} 
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
