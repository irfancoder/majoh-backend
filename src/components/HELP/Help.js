import React, { useState } from "react";
import styled from "styled-components";
import {
  TextField,
  Card,
  Typography,
  CardActions,
  Button,
  Grid,
  Avatar,
} from "@material-ui/core";
import Firebase from "firebase";
import instance from "../../firebase";

const contact = [
  {
    purpose: "Vendor Support",
    name: "",
    email: "",
    phone: "",
  },
  {
    purpose: "Management",
    name: "Hamzah Hamizan",
    email: "hamzah@founders.my",
    phone: "",
  },
];

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2em;
`;

const ContactUI = ({ contact }) => {
  return (
    <Container>
      <Typography style={{ marginBottom: "1em" }} variant="h6">
        {contact.purpose}
      </Typography>
      <Typography variant="body1">{contact.name}</Typography>
      <Typography variant="body1">Phone: {contact.phone}</Typography>
      <Typography variant="body1">Email: {contact.email}</Typography>
    </Container>
  );
};

const Help = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {contact.map((item) => {
        return <ContactUI contact={item} />;
      })}
    </div>
  );
};

export default Help;
