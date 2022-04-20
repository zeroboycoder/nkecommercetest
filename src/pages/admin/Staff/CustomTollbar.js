import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { AddOutlined } from "@mui/icons-material";

class CustomToolbar extends React.Component {
  handleClick = () => {
    console.log("clicked on icon!");
  };

  render() {
    return (
      <React.Fragment>
        <Tooltip title={"custom icon"}>
          <IconButton onClick={this.handleClick}>
            <AddOutlined />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default CustomToolbar;
