import { Box, Card, CardHeader, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { Orders } from "./Orders";

const orders = [1,1,1,1,1]
export const OrderTable = () => {
    return(
        <Box>
            <Card sx={{backgroundColor: '#FED7AA'}} className="mt-2">
                <CardHeader title={"All Orders"} sx={{pt:2, alignItems:"center"}}/>


            </Card>
            <TableContainer >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell align="right">Image</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Name</TableCell>
           < TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {1}
              </TableCell>
              <TableCell align="right">{"nz"}</TableCell>
              <TableCell align="right">{"nz"}</TableCell>
              <TableCell align="right">{"nz"}</TableCell>
              <TableCell align="right">{"nz"}</TableCell>
              <TableCell align="right">{"nz"}</TableCell>

              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </Box>
    )
}