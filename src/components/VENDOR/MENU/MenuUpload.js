import React, { Component } from "react";
import { DropzoneArea } from "material-ui-dropzone";
import Firebase from "firebase";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const storage = Firebase.storage();

class DropzoneAreaExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      url: "",
      open: false,
    };
  }

  handleTooltipClose = () => {
    this.setState({
      open: false,
    });
  };

  handleTooltipOpen = () => {
    navigator.clipboard.writeText(this.state.url);
    this.setState({
      open: true,
    });
  };

  handleChange(files) {
    this.setState({
      files: files,
    });
    console.log(files);
  }

  handleUpload() {
    if (this.state.files.length > 0) {
      let self = this;
      let storageRef = storage.ref();
      let bucket = storageRef.child(
        `vendor_bazaar_images/${this.props.vendor.uid}/${this.state.files[0].name}`
      );
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
  }
  render() {
    return (
      <div style={{ width: "100%", marginTop: "3em", marginBottom: "5em" }}>
        <ClickAwayListener onClickAway={this.handleTooltipClose}>
          <div>
            <Tooltip
              PopperProps={{
                disablePortal: true,
              }}
              onClose={this.handleTooltipClose}
              open={this.state.open}
              disableFocusListener
              disableHoverListener
              disableTouchListener
              placement="top"
              title="URL copied!"
            >
              <Typography onClick={this.handleTooltipOpen}>
                Steps to upload images
                <br />
                (1) Drag or select the image file to be uploaded
                <br />
                (2) Click 'Upload' to upload the image <br />
                (3) A URL will be generated below once image file is uploaded.
                Click on the URL to copy, and paste inside the menu
                <br />
                <br />
                Cara Memuat Naik Gambar
                <br />
                (1) Pilih atau letakkan gambar ke dalam kotak dibawah
                <br />
                (2) Tekan 'Upload' untuk memuat naik gambar <br />
                (3) URL akan dijana selepas gambar telah dimuat naik. Hanya klik
                pada URL untuk copy-paste ke dalam menu.
                <br />
                <br />
                URL: {this.state.url}
                <br />
              </Typography>
            </Tooltip>
          </div>
        </ClickAwayListener>

        <DropzoneArea
          acceptedFiles={["image/jpeg", "image/png", "image/bmp"]}
          filesLimit={1}
          onChange={this.handleChange.bind(this)}
        />
        {this.state.files.length > 0 ? (
          <Button
            style={{ width: "100%", textAlign: "right", marginTop: "1em" }}
            variant="contained"
            color="primary"
            onClick={this.handleUpload.bind(this)}
          >
            Upload one image at a time
          </Button>
        ) : (
          <Button
            style={{ width: "100%", textAlign: "right", marginTop: "1em" }}
            variant="contained"
            disabled
          >
            Upload one image at a time
          </Button>
        )}
      </div>
    );
  }
}

export default DropzoneAreaExample;
