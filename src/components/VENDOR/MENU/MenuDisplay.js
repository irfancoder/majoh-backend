import React from "react";

import {
  useFirestoreCollectionData,
  useFirestore,
  SuspenseWithPerf,
} from "reactfire";
import MenuTable from "./MenuTable";

const MenuDisplay = ({ vendor }) => {
  const Menu = () => {
    // lazy load the Firestore SDK and create a document reference
    const menuRef = useFirestore()
      .collection("vendor")
      .doc(vendor.id)
      .collection("menu");

    // subscribe to the doc. just one line!
    const dataMenu = useFirestoreCollectionData(menuRef);

    return <MenuTable vendor={vendor} dataMenu={dataMenu} />;
  };

  return (
    <SuspenseWithPerf
      fallback={<p>loading burrito status...</p>}
      traceId={"load-burrito-status"}
    >
      <Menu />
    </SuspenseWithPerf>
  );
};

export default MenuDisplay;
