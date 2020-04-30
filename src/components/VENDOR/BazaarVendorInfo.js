import React, { useState } from "react";
import styled from "styled-components";
import {
  TextField,
  ListSubheader,
  Typography,
  Button,
  Grid,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";
import Firebase from "firebase";
import instance from "../../firebase";
import { isUserLoggedIn, getLocations } from "../../utils";
import Profile from "./Profile";
import MuiAlert from "@material-ui/lab/Alert";
import { Snackbar } from "@material-ui/core";

const db = Firebase.firestore(instance);

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Info = ({ vendor }) => {
  const [vendorInfo, setVendorInfo] = useState({
    businessName: vendor.businessName || "",
    ownerName: vendor.ownerName || "",
    telegramId: vendor.telegramId || "",
    email: vendor.email || "",
    location: vendor.location || "",
    uid: isUserLoggedIn().uid,
    profile: vendor.profile || "",
    start: vendor.start
      ? vendor.start.toDate()
      : new Date("2014-08-18T15:00:00"),
    end: vendor.end ? vendor.end.toDate() : new Date("2014-08-18T18:00:00"),
  });
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event) => {
    setVendorInfo({ ...vendorInfo, [event.target.name]: event.target.value });
  };

  const handleStartTime = (time) => {
    console.log(time);
    setVendorInfo({ ...vendorInfo, start: time });
  };
  const handleEndTime = (time) => {
    setVendorInfo({ ...vendorInfo, end: time });
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
        setOpen(true);
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    updateDatabase();
  };

  const getAllLocations = () => {
    let finalList = [];
    Object.keys(getLocations()).map((key, index) => {
      let header = <ListSubheader key={index}>{key}</ListSubheader>;
      finalList.push(header);
      getLocations()[key].map((item) => {
        return finalList.push(
          <MenuItem value={item} key={item}>
            {item}
          </MenuItem>
        );
      });
    });
    return (
      <Select
        name="location"
        value={vendorInfo.location}
        onChange={handleChange}
        defaultValue="Pilih lokasi"
      >
        <MenuItem value="">Pilih lokasi</MenuItem>
        {finalList}
      </Select>
    );
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
            name="telegramId"
            label="Telegram ID "
            placeholder="Taip /id dalam Telegram majohbot"
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={handleChange}
            defaultValue={vendorInfo.telegramId}
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
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1em",
              }}
            >
              <KeyboardTimePicker
                margin="normal"
                id="start"
                label="Masa Mula Delivery"
                value={vendorInfo.start}
                onChange={handleStartTime}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
              <KeyboardTimePicker
                margin="normal"
                id="end"
                label="Masa Tamat Delivery"
                value={vendorInfo.end}
                onChange={handleEndTime}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </div>
          </MuiPickersUtilsProvider>

          <FormControl variant="outlined" style={{ width: "100%" }}>
            <InputLabel htmlFor="filled-age-native-simple">
              Kawasan Perniagaan
            </InputLabel>
            {getAllLocations()}
          </FormControl>
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
      <Button variant="contained" color="primary" onClick={onSubmit}>
        Save
      </Button>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Account info saved!
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Info;
