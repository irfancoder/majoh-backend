import React, { Component } from "react";
import { DropzoneDialog } from "material-ui-dropzone";
import Button from "@material-ui/core/Button";
import Firebase from "firebase";
import instance from "../../firebase";

const db = Firebase.firestore(instance);
const storage = Firebase.storage();

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      files: [],
      url: "",
    };
  }

  handleClose() {
    this.setState({
      open: false,
    });
  }
  handleUpload(files) {
    let self = this;
    let storageRef = storage.ref();
    let bucket = storageRef.child(
      `vendor_bazaar_images/${this.props.vendor.uid}/${files[0].name}`
    );
    files.forEach((fileToUpload) => {
      bucket.put(fileToUpload).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          db.collection("bazaar_vendors")
            .doc(this.props.vendor.uid)
            .update({
              profile: url,
            })
            .then(function () {
              self.setState({
                open: false,
              });

              self.props.saveProfile(url);
            })
            .catch(function (error) {
              console.error("Error writing document: ", error);
            });
        });
      });
    });
  }

  handleSave(files) {
    //Saving files to state for further use and closing Modal.

    this.handleUpload(files);
  }

  handleOpen() {
    this.setState({
      open: true,
    });
  }

  render() {
    return (
      <div>
        <Button onClick={this.handleOpen.bind(this)}>Edit profile</Button>
        <DropzoneDialog
          open={this.state.open}
          onSave={this.handleSave.bind(this)}
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          showPreviews={true}
          maxFileSize={5000000}
          filesLimit={1}
          onClose={this.handleClose.bind(this)}
        />
      </div>
    );
  }
}
