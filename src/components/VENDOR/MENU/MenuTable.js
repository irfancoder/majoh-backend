import React from "react";
import MaterialTable from "material-table";
import Firebase from "firebase";
import instance from "../../../firebase";

const db = Firebase.firestore(instance);

const MenuTable = ({ vendor, dataMenu }) => {
  const [state, setState] = React.useState({
    columns: [
      { title: "Item", field: "item" },
      { title: "Desc", field: "description" },
      {
        title: "Price (RM)",
        field: "price",
        render: (rowData) => <p>RM {rowData.price}</p>,
      },
      {
        title: "Image URL",
        field: "thumbnail",
        render: (rowData) => (
          <img
            src={rowData.thumbnail}
            alt={rowData.item}
            style={{ width: 50, borderRadius: "50%" }}
          />
        ),
      },
    ],
    data: dataMenu,
  });

  const updateDatabase = (data) => {
    db.collection("bazaar_vendors")
      .doc(vendor.uid)
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
      style={{ paddingLeft: "1em", paddingRight: "1em" }}
      title="Menu"
      columns={state.columns}
      data={state.data}
      options={{
        actionsColumnIndex: -1,
      }}
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

              db.collection("bazaar_vendors")
                .doc(vendor.uid)
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
