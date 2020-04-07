import React, { useState } from "react";
import styled from "styled-components";
import {
  TextField,
  Card,
  Typography,
  CardActions,
  Button,
} from "@material-ui/core";
import Firebase from "firebase";
import instance from "../../firebase";

const Container = styled(Card)`
  width: 100%;
  box-sizing: border-box;
  padding: 1em;
`;

const db = Firebase.firestore(instance);

const Info = ({ vendor }) => {
  const [vendorInfo, setVendorInfo] = useState({
    businessName: vendor.businessName || "",
    ownerName: vendor.ownerName || "",
    phoneNumber: vendor.phoneNumber,
    email: vendor.email,
    address: vendor.address,
  });

  const handleChange = (event) => {
    setVendorInfo({ ...vendorInfo, [event.target.name]: event.target.value });
    // console.log(vendorInfo);
  };

  const updateDatabase = () => {
    db.collection("vendor")
      .doc(vendor.id)
      .set(vendorInfo)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateDatabase();
    // console.log(vendorInfo);
  };

  return (
    <Container>
      <Typography variant="h6">Vendor Info</Typography>
      <TextField
        name="businessName"
        label="Business name"
        fullWidth
        disabled
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={vendorInfo.businessName}
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        name="ownerName"
        label="Name"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={vendorInfo.ownerName}
        variant="outlined"
        onChange={handleChange}
      />
      <TextField
        name="phoneNumber"
        label="Phone number"
        placeholder="+60"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
        defaultValue={vendorInfo.phoneNumber}
        variant="outlined"
      />
      <TextField
        name="email"
        label="Email"
        placeholder="+60"
        fullWidth
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={vendorInfo.email}
        variant="outlined"
      />
      <TextField
        name="address"
        label="Pickup Address"
        placeholder="Lot "
        fullWidth
        onChange={handleChange}
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        defaultValue={vendorInfo.address}
        variant="outlined"
      />
      <CardActions style={{ justifyContent: "flex-end" }}>
        <Button onClick={onSubmit}>Save</Button>
      </CardActions>
    </Container>
  );
};

export default Info;
