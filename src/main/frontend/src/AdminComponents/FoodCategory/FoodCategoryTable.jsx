import { Box, Card, CardHeader, IconButton, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CreateFoodCategoryForm from "./CreateFoodCategoryForm";
import axios from "axios";

const orders = [1,1,1,1,1]
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
export const FoodCategoryTable = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose= () => setOpen(false);
  const [category, setCategory] = useState([]);
  
  const jwt = localStorage.getItem('jwt');



  useEffect(() => {
    loadCategories();
  }, []);


  const loadCategories = async () => {
    try {
      console.log(jwt);
      const response = await axios.get("/api/category/all", {
        headers: {
          Authorization: `Bearer ${jwt}` 
        }
      });
      console.log(response.data);
      setCategory(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
    return(
        <Box>
            <Card sx={{backgroundColor: '#FED7AA'}} className="mt-2">

                <CardHeader title={"Food Category"} sx={{pt:2, alignItems:"center"}}/>
                {
          <IconButton onClick={handleOpen} aria-label="settings">
            <CreateIcon />
          </IconButton>
        }
        <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Id</TableCell>
            <TableCell align="right">Name</TableCell>
            

          </TableRow>
        </TableHead>
        <TableBody>
          {category.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             
              <TableCell align="right">{row.id}</TableCell>
              <TableCell align="right">{row.name}</TableCell>
              

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </Card>
            <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateFoodCategoryForm/>
        </Box>
      </Modal>
        </Box>
    )
}