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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";
import Firebase from "firebase";
import instance from "../../firebase";
import { isUserLoggedIn, getLocations } from "../../utils";
import Profile from "./Profile";
const db = Firebase.firestore(instance);

const Info = ({ vendor }) => {
  const [vendorInfo, setVendorInfo] = useState({
    businessName: vendor.businessName || "",
    ownerName: vendor.ownerName || "",
    phoneNumber: vendor.phoneNumber || "",
    email: vendor.email || "",
    location: vendor.location || "",
    uid: isUserLoggedIn().uid,
    profile: vendor.profile || "",
  });

  const handleChange = (event) => {
    setVendorInfo({ ...vendorInfo, [event.target.name]: event.target.value });
  };
  const saveProfile = (file) => {
    setVendorInfo({ ...vendorInfo, profile: file });
  };

  const updateDatabase = () => {
    db.collection("bazaar_vendors")
      .doc(vendorInfo.uid)
      .update(vendorInfo)
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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <Typography style={{ alignSelf: "flex-start" }} variant="h6">
        Vendor Info
      </Typography>
      <Typography style={{ alignSelf: "flex-start" }} variant="body2">
        Sila isikan butiran bisnes anda.
      </Typography>
      <Grid container>
        <Grid item md={6}>
          <TextField
            name="businessName"
            label="Nama Bisnes"
            fullWidth
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
            disabled
            onChange={handleChange}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            defaultValue={vendorInfo.email}
            variant="outlined"
          />
          <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel htmlFor="filled-age-native-simple">
              Kawasan Perniagaan
            </InputLabel>
            <Select
              name="location"
              margin="normal"
              value={vendorInfo.location}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
            >
              {getLocations().map((item) => {
                return <MenuItem value={item}>{item}</MenuItem>;
              })}
            </Select>
          </FormControl>
          {/* <TextField
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
          /> */}
        </Grid>
        <Grid
          style={{
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
          }}
          item
          md={6}
        >
          <Avatar
            style={{ width: "40vh", height: "40vh", marginBottom: "1em" }}
            src={vendorInfo.profile}
          >
            M
          </Avatar>
          <Profile vendor={vendor} saveProfile={saveProfile} />
        </Grid>
      </Grid>
      <Button onClick={onSubmit}>Save</Button>
    </div>
  );
};

export default Info;
