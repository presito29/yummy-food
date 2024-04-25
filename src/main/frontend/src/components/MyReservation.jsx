import { Box, Card, CardHeader, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const MyReservation = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  
  const jwt = localStorage.getItem('jwt');



  useEffect(() => {
    loadReservations();
  }, []);


  const loadReservations = async () => {
    try {
      console.log(jwt);
      const response = await axios.get("http://localhost:8080/my-reservation", {
        headers: {
          Authorization: `Bearer ${jwt}` 
        }
      });
      console.log(response.data);
      setReservations(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

    return(
        <Box>
            
            <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Номер на маса</TableCell>
            <TableCell align="right">Пушач или не</TableCell>
            <TableCell align="right">Вън или вътре</TableCell>
            <TableCell align="right">Дата</TableCell>
            <TableCell align="right">Час</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
        {reservations.map((row) => {
  // Split the time string into hours and minutes
  const [hours, minutes] = row.reservationTime.split(':');

  // Create a new date object with the time values
  const reservationTime = new Date();
  reservationTime.setHours(parseInt(hours, 10));
  reservationTime.setMinutes(parseInt(minutes, 10));

  return (
    <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="right">{row.table.id}</TableCell>
      <TableCell align="right">{row.table.smokerOrNo ? 'smoker' : 'non smoker'}</TableCell>
      <TableCell align="right">{row.table.inside_outside}</TableCell>
      <TableCell align="right">{new Date(row.reservationDate).toLocaleDateString()}</TableCell>
      <TableCell align="right">
        {reservationTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </TableCell>
    </TableRow>
  );
})}

        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    )
}