import React from "react";
import MaterialTable from "material-table";
import Firebase from "firebase";
import instance from "../../../firebase";

const db = Firebase.firestore(instance);

const MenuTable = ({ vendor, dataMenu }) => {
  const [state, setState] = React.useState({
    columns: [
      { title: "Item", field: "item" },
      { title: "Type", field: "type" },
      { title: "Desc", field: "description" },
      {
        title: "Price (RM)",
        field: "price",
        type: "currency",
      },
      { title: "Thumbnail", field: "thumbnail" },
    ],
    data: dataMenu,
  });

  const updateDatabase = (data) => {
    db.collection("vendor")
      .doc(vendor.id)
      .collection("menu")
      .doc(data.item)
      .set(data)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  return (
    <MaterialTable
      style={{ marginLeft: "1em", marginRight: "1em" }}
      title="Menu"
      columns={state.columns}
      data={state.data}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
              updateDatabase(newData);
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
                updateDatabase(newData);
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });

              db.collection("vendor")
                .doc(vendor.id)
                .collection("menu")
                .doc(oldData.item)
                .delete()
                .then(function () {
                  console.log("Document successfully deleted!");
                })
                .catch(function (error) {
                  console.error("Error removing document: ", error);
                });
            }, 600);
          }),
      }}
    />
  );
};

export default MenuTable;
