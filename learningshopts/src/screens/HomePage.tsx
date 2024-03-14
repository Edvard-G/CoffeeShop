import { Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Product } from "../validations/Types";
import CoffeeCard from "../components/CoffeeCard";
import BaseTemplate from "./BaseTemplate";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const HomePage: React.FC = () => {
  const [coffees, setCoffees] = useState<Product[]>([]);
  const user = useSelector((state: RootState) => state.auth.userInfo)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get<Product[]>("http://localhost:5000/api/products");
        setCoffees(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);


  return (
    <BaseTemplate>
      <Grid container spacing={3}>
        <Grid item xs={12} md={2}>
          <Typography variant="subtitle1" gutterBottom>
           {user?.email}
          </Typography>
         </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Coffee Products
          </Typography>
          <Container>
            {coffees.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                id={coffee.id}
                altitude={coffee.altitude}
                country={coffee.country}
                price={coffee.price}
                process={coffee.process}
                region={coffee.region}
                roasted={coffee.roasted}
                variety={coffee.variety}
              />
            ))}
          </Container>
        </Grid>
        <Grid item md={2}></Grid>
      </Grid>
    </BaseTemplate>
  );
};

export default HomePage;
