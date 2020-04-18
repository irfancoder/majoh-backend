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
    purpose: "Pertolongan Vendor",
    name: "En. Irfan Ismail",
    email: "irfan@founders.my",
    phone: "+6013-688 7507",
  },
  {
    purpose: "Pihak Management Majoh ",
    name: "En. Hamzah Hamizan",
    email: "hamzah@founders.my",
    phone: "+6011-1010 1809",
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
