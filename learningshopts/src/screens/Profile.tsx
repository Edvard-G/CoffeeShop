import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import useravatar from "../assets/test.png";
import { User } from "../validations/Types";
import { useNavigate } from "react-router-dom";

interface CompProps {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Profile: React.FC = () => {
  const [initialValues, setInitialValues] = useState<CompProps>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInitialValues(() => ({
      ...initialValues,
      [name]: value,
    }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Are you sure you want to update your profile")
    navigate('/main')
  }

  return (
    <Container maxWidth="md">
      <Box my={5}>
        <Paper elevation={5} sx={{ p: 4 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              alignItems="left"
              spacing={2}
            >
              <Grid item>
                <Avatar
                  alt="Profile Picture"
                  src={useravatar}
                  sx={{ width: 90, height: 90 }}
                />
              </Grid>
              <Grid item>
                <Typography variant="h4" sx={{ color: "blueviolet" }}>
                  User Info
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={12} md={6} container direction="column" spacing={2} component='form'>
              <Typography variant="subtitle1">First Name</Typography>
              <TextField
                id="firstName"
                name="firstName"
                value={initialValues.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                variant="outlined"
                fullWidth
              />
              {initialValues.firstName}
              <Typography variant="subtitle1">Last Name</Typography>
              <TextField
                id="last-name"
                name="lastName"
                value={initialValues.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                variant="outlined"
                fullWidth
              />
              {initialValues.lastName}
              <Typography variant="subtitle1">Email</Typography>
              <TextField
                id="email"
                placeholder="Email"
                type="email"
                variant="outlined"
                fullWidth
              />
              <Typography variant="subtitle1">Password</Typography>
              <TextField
                id="password"
                placeholder="Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <Typography variant="subtitle1">Confirm Password</Typography>
              <TextField
                id="confirm-password"
                placeholder="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
              />
              <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={onSubmit}>
                Update Profile
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
