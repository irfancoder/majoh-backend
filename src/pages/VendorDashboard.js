import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
import PropTypes from "prop-types";
import VendorInfo from "../components/VENDOR/BazaarVendorInfo";
import MenuDisplay from "../components/VENDOR/MENU/MenuDisplay";
import MenuUpload from "../components/VENDOR/MENU/MenuUpload";
import Layout from "../components/Layout";
import RunnerTable from "../components/RUNNER/RunnerTable";
import Help from "../components/HELP/Help";
import { Button, Tabs, Tab, Box, Typography } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import Firebase from "../firebase";
import { useFirestoreDocData, useFirestore, SuspenseWithPerf } from "reactfire";
import { isUserLoggedIn } from "../utils";

const Container = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 1em;
`;

const Header = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
`;

const TabPanel = (props) => {
  const { children, value, index } = props;

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  return (
    <Typography role="tabpanel" hidden={value !== index}>
      {value === index && <Box m={2}>{children}</Box>}
    </Typography>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tabPanel: {
    marginLeft: "2em",
  },
  logout: {
    width: "100%",
  },
}));

const Dashboard = () => {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!isUserLoggedIn()) {
    return <Redirect to="/" />;
  }

  const handleLogout = () => {
    Firebase.auth()
      .signOut()
      .then(function () {
        window.location = "/";
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const Vendor = () => {
    const ref = useFirestore()
      .collection("bazaar_vendors")
      .doc(isUserLoggedIn().uid);

    const vendorData = useFirestoreDocData(ref);
    console.log(vendorData);

    return (
      <Container className={classes.root}>
        <div>
          <Tabs
            value={value}
            onChange={handleChange}
            className={classes.tabs}
            scrollButtons="auto"
          >
            <Tab label="Vendor" />
            <Tab label="Menu" />
            <Tab label="Runner" />
            <Tab label="Help" />
            <Tab label="Logout" />
          </Tabs>
        </div>
        <TabPanel value={value} index={0}>
          <VendorInfo vendor={vendorData} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MenuDisplay vendor={vendorData} />
          <MenuUpload vendor={vendorData} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <RunnerTable
            title="Miri"
            url="https://airtable.com/embed/shrHxEffa08d16vt7?backgroundColor=yellow&viewControls=on"
          />
          <RunnerTable title="Kuching" />
          <RunnerTable title="Bintulu" />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Help />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Typography style={{ marginTop: "1em" }}>
            You will log out of your account. Continue?
          </Typography>

          <Typography style={{ marginBottom: "1em" }}>
            Anda akan keluar dari akaun anda. Teruskan?
          </Typography>

          <Button
            className={classes.logout}
            variant="contained"
            color="primary"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </TabPanel>
      </Container>
    );
  };

  return (
    <Layout>
      <SuspenseWithPerf
        fallback={<p>opening the shop...</p>}
        traceId={"load-burrito-status"}
      >
        <Vendor />
      </SuspenseWithPerf>
    </Layout>
  );
};

export default Dashboard;
