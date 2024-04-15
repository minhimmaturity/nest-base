import PropTypes from "prop-types";
import { useState } from "react";
import { useLocation } from "react-router";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { LoadingButton } from "@mui/lab";
import {
  BooleanInput,
  Form,
  Link,
  TextInput,
  required,
  useLogin,
} from "react-admin";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { loginRequest } from "../../services/api";
import { LoginParams } from "../../type";
const Login = () => {
  const login = useLogin();
  const location = useLocation();
  const handleSubmit = (auth: LoginParams) => {
    loginRequest(auth).then((res) => {
      login(res.data, location.state ? location.state.nextPathname : "/");
    });
  };

  return (
    <Form onSubmit={handleSubmit as any} noValidate>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <TextInput
            variant="outlined"
            autoFocus
            source="email"
            label={"Email"}
            validate={required()}
            fullWidth
          />
          <TextInput
            variant="outlined"
            source="password"
            label={"Password"}
            type="password"
            validate={required()}
            fullWidth
          />
          <Box
            sx={{
              width: 1,
              display: "flex",
              justifyContent: "start",
              flexDirection: "row",
            }}
          >
            <BooleanInput
              type="checkbox"
              source="remember"
              value="remember"
              color="primary"
            />
          </Box>
          <Button type="submit" fullWidth variant="contained">
            Sign In
          </Button>
        </Box>
      </Container>
    </Form>
  );
};

Login.propTypes = {
  authProvider: PropTypes.func,
  previousRoute: PropTypes.string,
};

export default Login;

interface FormValues {
  username?: string;
  password?: string;
}
