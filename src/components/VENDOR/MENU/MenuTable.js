import React from "react";
import MaterialTable from "material-table";
import Firebase from "firebase";
import instance from "../../../firebase";
import { generateUUID } from "../../../utils";

const db = Firebase.firestore(instance);

const MenuTable = ({ vendor, dataMenu }) => {
  const [state, setState] = React.useState({
    columns: [
      {
        title: "Barang Jualan",
        field: "item",
      },
      {
        title: "Harga Min (RM)",
        field: "price_min",
        render: (rowData) => <p>RM {rowData.price_min || ""}</p>,
      },
      {
        title: "Harga Max (RM)",
        field: "price_max",
        render: (rowData) => <p>RM {rowData.price_max || ""}</p>,
      },
      {
        title: "MOQ",
        field: "moq",
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

  const addDatabase = (data) => {
    let passedData = data;
    passedData.vendor = vendor;
    passedData.uid = generateUUID();
    db.collection("bazaar_menu")
      .doc(passedData.uid)
      .set(passedData)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  const updateDatabase = (data) => {
    let passedData = data;
    passedData.vendor = vendor;
    db.collection("bazaar_menu")
      .doc(passedData.uid)
      .set(passedData)
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
          new Promise((resolve, reject) => {
            // state.columns.forEach(item => {
            //   if(item.field)
            // })
            // Object.keys(newData).map((key) => {
            //   if (newData[key] === state.columns.field) {
            //     reject("Missing data");
            //     alert("missing data");
            //   }
            // });

            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
              addDatabase(newData);
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

              db.collection("bazaar_menu")
                .doc(oldData.uid)
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
