import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { Link } from "react-router-dom";

const VendorItem = ({ vendor }) => {
  return (
    <Link
      to={{
        pathname: "/" + vendor.businessName,
        state: {
          vendor: vendor,
        },
      }}
    >
      <ListItem button style={{ background: "#eee" }}>
        <ListItemText primary={vendor.businessName} />
      </ListItem>
    </Link>
  );
};

export default VendorItem;
