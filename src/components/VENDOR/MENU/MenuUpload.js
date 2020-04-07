import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Firebase from "firebase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const storage = Firebase.storage();

class DropzoneAreaExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],

      url: "",
    };
  }

  handleChange(files) {
    this.setState({
      files: files,
    });
  }

  handleUpload() {
    let self = this;
    let storageRef = storage.ref();
    let bucket = storageRef.child(this.props.vendor.id);
    this.state.files.forEach((fileToUpload) => {
      bucket.put(fileToUpload).then((snapshot) => {
        snapshot.ref.getDownloadURL().then((url) => {
          self.setState({
            url: url,
          });
        });
      });
    });
  }
  render() {
    return (
      <div style={{ width: "100%", marginTop: "3em", marginBottom: "5em" }}>
        <Typography>{this.state.url}</Typography>
        <DropzoneArea onChange={this.handleChange.bind(this)} />
        <Button
          style={{ width: "100%", textAlign: "right", marginTop: "1em" }}
          variant="contained"
          color="primary"
          onClick={this.handleUpload.bind(this)}
        >
          Upload one image at a time
        </Button>
      </div>
    );
  }
}

export default DropzoneAreaExample;
