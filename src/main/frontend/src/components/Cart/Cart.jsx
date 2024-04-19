import { Box, Divider, Grid, Modal, TextField } from "@mui/material";
import React, {useState} from "react";
import CartItem from "./CartItem";
import { AddressCard } from "./AddressCart";
import { Button, Card } from "@mui/material";
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useDispatch, useSelector } from "react-redux"
import { ErrorMessage, Field, Formik, Form } from "formik";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { createOrder } from "../State/Order/Action";
import { useNavigate } from "react-router-dom";
import { clearCartAction } from "../State/Cart/Action";

//import * as Yup from "yup"

export const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: "none",
    boxShadow: 24,
    p: 4,
  };
  const initialValues={
    streetAddress: "",
    number: ""
  }

  
const Cart = () => {
    
    const {cart} = useSelector(store => store)
    const handleOpedAddressModal = () => setOpen(true);
      const [open, setOpen] = useState(false);
      const handleClose = () => setOpen(false);
      const dispatch = useDispatch();
      const navigate = useNavigate()
      const handleSubmit = (values) => {
        const data = {
        jwt: localStorage.getItem("jwt"),
        order: {
          address:{
            street: values.streetAddress,
            number: values.number
          }

        }
        }
        dispatch(createOrder(data))
        dispatch(clearCartAction())
        navigate("/")
        console.log("form value", values)
      }
      

    
    return(
        <>
            <main className="lg:flex justify-between bg-orange-100">
                <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10 ">

                    {cart.cartItems.map((item)=><CartItem item={item}/>)}
                    <Divider/>
                <div className="px-5 text-lg">
                    <p className="font-extralight py-5">Подробнисти за сметката</p>
                    <div className="space-y-3">
                        <div className="flex justify-between text-gray-400">
                            <p>Цена на продуктите:</p>
                            <p>{cart.cart.total} лв.</p>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <p>Такса за доставка:</p>
                            <p>5 лв.</p>
                        </div>
                        <Divider/>
                        <div className="flex justify-between text-gray-400">
                            <p>Крайна цена:</p>
                            <p>{cart.cart.total + 5} лв.</p>
                        </div>
                    </div>
                </div>
                </section>
                <Divider orientation="vertical" flexItem/>
                <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0 m-7">
                   
                <Card className="p-4 h-32">
  <div className="flex items-center p-3">
    <AddLocationAltIcon className="text-4xl mr-2" />
    <h1 className="font-semibold text-lg text-black">Добави нов адрес</h1>
  </div>
  <Button variant="outlined" fullWidth onClick={handleOpedAddressModal}>
    Добави адрес
  </Button>
</Card>

   
                </section>
            </main>
            <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>

<Formik initialValues={initialValues}
//validationSchema={validationSchema}
onSubmit={handleSubmit}>

<Form>
<Grid container spacing={2}>
<Grid item xs={12}>
<Field as={TextField} name="streetAddress" label ="Улица" fullWidth variant="outlined" 
//error={!ErrorMessage("streerAddress")} helperText={<ErrorMessage>
 //   {(msg) => <span className="text-red-600">{msg}</span>}
//</ErrorMessage>}
/>

</Grid>

<Grid item xs={12}>
<Field as={TextField} name="number" label ="Номер на улицата" fullWidth variant="outlined" 
//error={!ErrorMessage("streerAddress")} helperText={<ErrorMessage>
  //  {(msg) => <span className="text-red-600">{msg}</span>}
//</ErrorMessage>}
/>

</Grid>
<Grid item xs={12}>
<Button fullWidth variant="contained" type="submit">Добави</Button>
</Grid>
</Grid>
</Form>
</Formik>
  </Box>
</Modal>
        </>
    )
}
export default Cart