import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import styled from "styled-components";
import dimensions from "../styles/dimensions";

const Container = styled.div`
  max-width: ${dimensions.maxwidthDesktop}px;
  margin: auto;
`;

const Layout = ({ children }) => {
  return (
    <div>
      <CssBaseline />

      <Container>{children}</Container>
    </div>
  );
};

export default Layout;
