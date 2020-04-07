import React from "react";
import VendorItem from "./VendorItem";
import List from "@material-ui/core/List";
import styled from "styled-components";
import {
  useFirestoreCollectionData,
  useFirestore,
  SuspenseWithPerf,
} from "reactfire";
const Container = styled.div`
  width: 100%;
  max-width: 100vh;
  height: 100vh;
  margin: auto;
`;

const VendorList = () => {
  const Vendor = () => {
    // lazy load the Firestore SDK and create a document reference
    const burritoRef = useFirestore().collection("vendor");

    // subscribe to the doc. just one line!
    const dataVendor = useFirestoreCollectionData(burritoRef);
    console.log(dataVendor);
    return dataVendor.map((vendor, index) => {
      return <VendorItem vendor={vendor} key={index} />;
    });
  };

  return (
    <Container>
      <List>
        <SuspenseWithPerf
          fallback={<p>loading burrito status...</p>}
          traceId={"load-burrito-status"}
        >
          <Vendor />
        </SuspenseWithPerf>
      </List>
    </Container>
  );
};

export default VendorList;
