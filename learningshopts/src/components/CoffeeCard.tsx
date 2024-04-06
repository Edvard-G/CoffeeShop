import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material";
import coffeelogo from "../assets/logo-espresso.jpg";
import { Product } from "../validations/Types";

const CoffeeCard: React.FC<Product> = ({
  altitude,
  country,
  price,
  process,
  region,
  variety,
}) => {
  return (
    <Card sx={{ maxWidth: 200, display: "inline-block", margin: "10px" }}>
      <CardMedia
        component="img"
        alt="coffee"
        image={coffeelogo}
        sx={{ height: "auto", width: "100%" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {country}
        </Typography>
        <Typography variant="subtitle1">Region: {region}</Typography>
        <Typography variant="subtitle1">Price: ${price}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Add to Card</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default CoffeeCard;
