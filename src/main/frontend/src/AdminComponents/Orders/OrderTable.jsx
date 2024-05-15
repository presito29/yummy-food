import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, updateOrderStatus } from "../../components/State/Order_Admin/Action";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";

const orderStatus = [
  {label: "Очакване", value: "Очакване"},
  {label: "Завършена", value: "Завършена"},
  {label: "Доставена", value: "Доставена"}
]

const OrderTable = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { orderAdmin } = useSelector(store => store);
  const [selectedStatus, setSelectedStatus] = useState('');

  


  useEffect(() => {
    
    dispatch(fetchOrders(jwt));
    
    console.log(orderAdmin, "Console")
  }, []);

  

  const handleChange = (orderId, event) => {
    setSelectedStatus(event.target.value);
    console.log(orderId)
    const jwt = localStorage.getItem("jwt");
    dispatch(updateOrderStatus({ orderId, orderStatus: event.target.value, jwt }));
  };
  return (
    <Box sx={{ backgroundColor: '#FED7AA' }}>
      <Card sx={{ backgroundColor: '#FED7AA' }} className="mt-2">
        <CardHeader title={"Всички поръчки"} sx={{ pt: 2, alignItems: "center" }} />
      </Card>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell align="center">Снимка</TableCell>
              <TableCell align="center">Собственик</TableCell>
              <TableCell align="center">Цена</TableCell>
              <TableCell align="center">Име на продукта</TableCell>
              <TableCell align="center">Статус на поръчката</TableCell>
              <TableCell align="center">Актуализация на статуса</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {orderAdmin.orders.map(row => (

              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="center">
                  <AvatarGroup>
                    {row.products.map(item => (
                      <Avatar key={item.id} src={item.product.imagePath} />
                    ))}
                  </AvatarGroup>
                </TableCell>
                <TableCell align="center">{row.user.email}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.products.map(item => (
                      <p>{item.product.name}</p>
                    ))}</TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">
                <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Статус</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedStatus}
        label="Status"
        onChange={(event) => handleChange(row.id, event)}
      >
        {orderStatus.map((status, index) => (
          <MenuItem key={index} value={status.value}>
            {status.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrderTable;
