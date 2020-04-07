import React from "react";
import styled from "styled-components";
import VendorInfo from "../components/VENDOR/VendorInfo";
import MenuDisplay from "../components/VENDOR/MENU/MenuDisplay";
import MenuUpload from "../components/VENDOR/MENU/MenuUpload";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 2fr;
`;

const Header = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
`;

const Dashboard = (props) => {
  console.log(props.location.state);

  return (
    <Layout>
      <Header>
        <Link to="/">Back</Link>
      </Header>

      <Container>
        <VendorInfo vendor={props.location.state.vendor} />
        <MenuDisplay vendor={props.location.state.vendor} />
      </Container>
      <MenuUpload vendor={props.location.state.vendor} />
    </Layout>
  );
};

export default Dashboard;
