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
import Firebase from "firebase";
import { isUserLoggedIn } from "../utils";
import { Redirect, Link } from "react-router-dom";
import instance from "../firebase";

var auth = Firebase.auth();

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

const db = Firebase.firestore(instance);

const Home = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");

  const handleInput = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //SignIn Firebase function
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        alert(
          "A password reset link has been sent to your email. Please check your inbox"
        );
      })
      .catch(function (error) {
        alert(error);
      });
  };

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
              Forgot Password
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
          </CardContent>
          <CardActions className={classes.login}>
            <Button onClick={handleSubmit}>reset</Button>
          </CardActions>
        </Card>

        <Link to="/">Back to login</Link>
      </Container>
    </Layout>
  );
};

export default Home;
