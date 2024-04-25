import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Card, Divider, Grid, Modal, TextField } from "@mui/material";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { createOrder } from "../State/Order/Action";
import { clearCartAction, findCart } from "../State/Cart/Action";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  outline: "none",
  boxShadow: 24,
  p: 4,
};

const initialValues = {
  streetAddress: "",
  number: "",
};

const Cart = () => {
  const cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0); // State to hold total price

  useEffect(() => {
    // Calculate total price whenever cart items change
    const calculateTotalPrice = () => {
      let total = cart.cartItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
      setTotalPrice(total);
    };
    calculateTotalPrice();
  }, [cart.cartItems]);

  const handleOpenAddressModal = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values) => {
    const data = {
      jwt: localStorage.getItem("jwt"),
      order: {
        address: {
          street: values.streetAddress,
          number: values.number,
        },
      },
    };
    dispatch(createOrder(data));
    dispatch(clearCartAction());
    navigate("/");
    location.reload();

    console.log("Form values", values);
  };

  return (
    <>
      <main className="lg:flex justify-between bg-orange-100">
        <section className="lg:w-[30%] space-y-6 lg:min-h-screen pt-10">
          {cart.cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Divider />
          <div className="px-5 text-lg">
            <p className="font-extralight py-5">Подробнисти за сметката</p>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-400">
                <p>Цена на продуктите:</p>
                <p>{totalPrice} лв.</p>
              </div>
              <div className="flex justify-between text-gray-400">
                <p>Такса за доставка:</p>
                <p>5 лв.</p>
              </div>
              <Divider />
              <div className="flex justify-between text-gray-400">
                <p>Крайна цена:</p>
                <p>{totalPrice + 5} лв.</p>
              </div>
            </div>
          </div>
        </section>
        <Divider orientation="vertical" flexItem />
        <section className="lg:w-[70%] flex justify-center px-5 pb-10 lg:pb-0 m-7">
          <Card className="p-4 h-32">
            <div className="flex items-center p-3">
              <AddLocationAltIcon className="text-4xl mr-2" />
              <h1 className="font-semibold text-lg text-black">
                Добави адрес
              </h1>
            </div>
            <Button
              variant="outlined"
              fullWidth
              onClick={handleOpenAddressModal}
            >
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
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Улица"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="number"
                    label="Номер на улицата"
                    fullWidth
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                  >
                    Добави
                  </Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
};

export default Cart;
