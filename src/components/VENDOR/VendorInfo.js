import React, { useState } from "react";
import styled from "styled-components";
import { TextField, Typography, Button, Grid } from "@material-ui/core";
import Firebase from "firebase";
import instance from "../../firebase";
import { isUserLoggedIn } from "../../utils";

const db = Firebase.firestore(instance);

const Info = ({ vendor }) => {
  const [vendorInfo, setVendorInfo] = useState({
    businessName: vendor.businessName || "",
    ownerName: vendor.ownerName || "",
    phoneNumber: vendor.phoneNumber || "",
    email: vendor.email || "",
    address: vendor.address || "",
    uid: isUserLoggedIn().uid,
  });

  const handleChange = (event) => {
    setVendorInfo({ ...vendorInfo, [event.target.name]: event.target.value });
  };

  const updateDatabase = () => {
    db.collection("bazaar_vendors")
      .doc(vendorInfo.uid)
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
  };

  return (
    <Grid container>
      <Grid item md={6}>
        <Typography variant="h6">Vendor Info</Typography>
        <TextField
          name="businessName"
          label="Nama Bisnes"
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
          label="Nama"
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
          label="Nombor Whatsapp"
          placeholder="Utk terima pesanan makanan"
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
          placeholder="name@example.com"
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

        <Button onClick={onSubmit}>Save</Button>
      </Grid>
      <Grid item md={6}>
        test
      </Grid>
    </Grid>
  );
};

export default Info;
