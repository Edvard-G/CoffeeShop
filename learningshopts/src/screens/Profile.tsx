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
import React from "react";
import useravatar from "../assets/test.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Profile: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    alert("Are you sure you want to update your profile");
    navigate("/main");
  };

  const textFieldData = [
    {
      id: "firstName",
      label: "First Name",
      name: "firstName",
      value: user?.first_name,
      placeholder: user?.first_name,
      type: "text",
    },
    {
      id: "last-name",
      label: "Last Name",
      name: "lastName",
      value: user?.last_name,
      placeholder: "Last Name",
      type: "text",
    },
    {
      id: "email",
      label: "Email",
      name: "email",
      value: user?.email,
      placeholder: "Email",
      type: "email",
    },
    {
      id: "password",
      label: "Password",
      name: "password",
      value: user?.password,
      placeholder: "Password",
      type: "password",
    },
    {
      id: "confirm-password",
      label: "Confirm Password",
      name: "confirmPassword",
      value: user?.confirm_password,
      placeholder: "Confirm Password",
      type: "password",
    },
  ];

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
            <Grid
              item
              xs={12}
              md={6}
              container
              direction="column"
              spacing={2}
              component="form"
            >
              {textFieldData.map((textField, index) => (
                <React.Fragment key={index}>
                  <Typography variant="subtitle1">{textField.label}</Typography>
                  <TextField
                    id={textField.id}
                    name={textField.name}
                    value={textField.value}
                    placeholder={textField.placeholder}
                    type={textField.type}
                    variant="outlined"
                    fullWidth
                  />
                </React.Fragment>
              ))}
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3 }}
                onClick={onSubmit}
              >
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
