import React from "react";
import Layout from "../components/Layout";
import styled from "styled-components";
import VendorList from "../components/VENDOR/VendorList";
import Typography from "@material-ui/core/Typography";

const Container = styled.div`
  width: 100%;
  margin: auto;
  padding-top: 4em;
  text-align: center;
`;

const Home = () => {
  return (
    <Layout>
      <Container>
        <Typography variant="h6">MajohVendors</Typography>
        <VendorList />
      </Container>
    </Layout>
  );
};

export default Home;
