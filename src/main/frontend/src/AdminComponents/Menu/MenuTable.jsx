import React, { useEffect, useState } from "react";
import { Box, Card, CardHeader, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";




export const MenuTable = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');



  useEffect(() => {
    loadProducts();
  }, []);


  const loadProducts = async () => {
    try {
      console.log(jwt);
      const response = await axios.get("/api/product/all", {
        headers: {
          Authorization: `Bearer ${jwt}` 
        }
      });
      console.log(response.data);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const updateProduct = (id) => {
    navigate(`/admin/update-product/${id}`);
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`/api/api/admin/${id}`, {
        headers: {
          Authorization: `Bearer ${jwt}` 
        }
      });
      setProducts(products.filter(product => product.id !== id));
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };


  return (
    <Box>
      <Card sx={{ backgroundColor: '#FED7AA' }} className="mt-2">
        <CardHeader title={"Меню"} sx={{ pt: 2, alignItems: "center" }} />
        <IconButton onClick={() => navigate("/admin/add-product")} aria-label="settings">
          <CreateIcon /> Добави продукт
        </IconButton>
      </Card>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Снимка</TableCell>
              <TableCell align="right">Име</TableCell>
              <TableCell align="right">Цена</TableCell>
              <TableCell align="right">Категория</TableCell>
              <TableCell align="right">Описание</TableCell>
              <TableCell align="right">Актуализирай</TableCell>
              <TableCell align="right">Изтрий</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow key={product.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell align="right"><img src={product.imagePath} alt={product.imageName} className='w-30 h-40 object-cover' /></TableCell>
                <TableCell align="right">{product.name}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.category.name}</TableCell>
                <TableCell align="right">{product.description}</TableCell>
                <TableCell align="right">
                  <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-red active:bg-red-800" onClick={() => updateProduct(product.id)}>Актуализирай</button>
                </TableCell>
                <TableCell align="right"><IconButton onClick={() => deleteProduct(product.id)}><Delete /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}
