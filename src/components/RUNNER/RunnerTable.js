import React from "react";
import { Typography } from "@material-ui/core";

const RunnerTable = ({ title, url }) => {
  return (
    <div>
      <Typography
        style={{ marginBottom: "1em", marginTop: "1em" }}
        variant="h6"
      >
        {title}
      </Typography>
      {url ? (
        <iframe
          title="airtable_runner"
          class="airtable-embed"
          src={url}
          frameborder="0"
          onmousewheel=""
          width="100%"
          height="400"
          style={{ background: "transparent", border: "1px solid #ccc" }}
        ></iframe>
      ) : (
        <Typography variant="body">
          Sorry, there are no runners currently registered for this location
        </Typography>
      )}
    </div>
  );
};

export default RunnerTable;

// https://airtable.com/embed/shrHxEffa08d16vt7?backgroundColor=yellow&viewControls=on
