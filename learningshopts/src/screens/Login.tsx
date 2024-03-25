import {
  Typography,
  Box,
  TextField,
  Grid,
  Container,
  Paper,
  Link,
  Button,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema } from "../validations/ValidationSchema";
import { loginAction } from "../slices/AuthSlice";
import { login } from "../services/UserService";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormSchema>({ resolver: zodResolver(LoginFormSchema) });

  const onSubmit: SubmitHandler<LoginFormSchema> = (data: LoginFormSchema) => {
    login(data)
      .then((returnedData) => {
        if (returnedData.status === 200) {
          dispatch(loginAction(returnedData.data.user));
          navigate("/main");
        }
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  return (
    <Box className="login-box">
      <Container component="form" onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ paddingX: 50 }}>
          <Typography variant="h3" component="h1" className="login-logo">
            Login
          </Typography>
          <Grid container direction="column" spacing={2} py={2}>
            <Grid item xs={6}>
              <TextField
                id="email"
                label="Email"
                fullWidth
                type="email"
                required
                {...register("email")}
              />
              {errors && <span>{errors.email?.message}</span>}
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="password"
                {...register("password")}
                label="Password"
                fullWidth
                type="password"
                required
              />
              {errors && <span>{errors.password?.message}</span>}
            </Grid>
          </Grid>
          <Button
            id="login"
            type="submit"
            variant="contained"
            fullWidth
            disabled={isSubmitting}
          >
            Login
          </Button>
          <Typography variant="subtitle1" className="signup-link">
            Don't have an account? <Link href="/signup">Sign up here</Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
