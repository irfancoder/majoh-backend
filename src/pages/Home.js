import React, { useState } from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import VendorList from "../components/VENDOR/VendorList";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
  TextField,
  IconButton,
  InputAdornment,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import dimensions from "../styles/dimensions";
import Firebase from "../firebase";
import { isUserLoggedIn } from "../utils";
import { Redirect } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 4em;
  text-align: center;
  max-width: ${dimensions.maxwidthMobile - 100}px;
`;

const useStyles = makeStyles((theme) => ({
  container: {
    boxSizing: "border-box",
    paddingTop: "2em",
  },
  input: {
    marginBottom: "2em",
  },
  login: {
    justifyContent: "flex-end",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setLogin({ ...login, showPassword: !login.showPassword });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleInput = (event) => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //SignIn Firebase function
    Firebase.auth()
      .signInWithEmailAndPassword(login.email, login.password)
      .then(() => {
        alert("logged in");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        alert(error.message);
        // ...
      });
  };

  if (isUserLoggedIn()) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Layout>
      <Container>
        <Typography style={{ marginBottom: "2em" }} variant="h6">
          MajohVendors
        </Typography>
        <Card>
          <CardContent>
            <Typography
              style={{ marginBottom: "1em", textAlign: "start" }}
              variant="h6"
            >
              Vendor Login
            </Typography>

            <TextField
              className={classes.input}
              name="email"
              type="string"
              fullWidth
              label="Email"
              variant="outlined"
              onChange={handleInput}
            />

            <TextField
              className={classes.input}
              name="password"
              type="password"
              fullWidth
              label="Password"
              variant="outlined"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {login.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={handleInput}
            />
          </CardContent>
          <CardActions className={classes.login}>
            <Button onClick={handleSubmit}>login</Button>
          </CardActions>
        </Card>

        {/* <VendorList /> */}
      </Container>
    </Layout>
  );
};

export default Home;
