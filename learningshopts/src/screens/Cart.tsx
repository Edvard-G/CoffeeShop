import { Box, Grid, Paper, Typography, Button, Divider } from "@mui/material";
import BaseTemplate from "./BaseTemplate";
import { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../components/Message";

const Cart: React.FC = () => {
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0.00);
  

  return (
    <BaseTemplate>
      <Grid container>
        <Grid item xs={8}>
          <Typography variant="h3" component="h1" color="GrayText">Shopping Cart</Typography>
          <Box sx={{width: "50%"}}>
            {totalItems === 0 ? <Message >Cart is empty <Link to={'/main'}>Go Back</Link> </Message> : totalItems}
            </Box>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={4} sx={{ minHeight: "250px" }}>
            <Box pl={2}>
              <Typography variant="h6">Subtotal {`(${totalItems})`} items</Typography>
              <Typography variant="subtitle1">${totalPrice.toFixed(2)}</Typography>
              <Divider />
              <Button variant="contained">Proceed to Checkout</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </BaseTemplate>
  );
};

export default Cart;
