import React from "react";
import { TextField } from "@mui/material";

const Input = (props) => {
  return (
    <TextField
      fullWidth
      required
      id={props.id}
      value={props.value}
      onChange={(e) => props.changed(props.id, e.target.value)}
      type={props.type}
    />
  );
};

export default Input;
