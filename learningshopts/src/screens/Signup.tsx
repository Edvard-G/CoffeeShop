import React from "react";
import {
  Typography,
  TextField,
  Grid,
  Container,
  Paper,
  Link,
  Button,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  SignUpFormSchema,
  SignUpFormSchemaType,
} from "../validations/ValidationSchema";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      gender: "",
      role: "user",
    },
  });

  const onSubmit = async (data: SignUpFormSchemaType) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/signup",
        data
      );
      console.log(response.data);
      navigate("/");
    } catch (error: any) {
      console.error(
        "Failed to sign up:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <Container component="form" onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={6} sx={{ paddingX: 50, alignContent: "center" }}>
        <Typography variant="h3" component="h1" pb={3}>
          Sign Up
        </Typography>
        <Grid container spacing={2} direction="column">
          <Grid item xs={6}>
            <TextField
              label="First Name"
              fullWidth
              {...register("first_name", { required: true })}
              error={Boolean(errors.first_name)}
              helperText={errors.first_name?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              fullWidth
              {...register("last_name")}
              error={Boolean(errors.last_name)}
              helperText={errors.last_name?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email")}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password")}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              {...register("confirmPassword")}
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              {...register("date_of_birth")}
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.date_of_birth)}
              helperText={errors.date_of_birth?.message}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Gender"
                  defaultValue=""
                  fullWidth
                  error={Boolean(errors.gender)}
                  helperText={errors.gender?.message}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Role"
                  fullWidth
                  error={Boolean(errors.role)}
                  helperText={errors.role?.message}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </TextField>
              )}
            />
          </Grid>

          <Button type="submit" disabled={isSubmitting}>
            Sign Up
          </Button>
          <Typography align="center">
            Already have an account? <Link href="/">Click here!</Link>
          </Typography>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Signup;
