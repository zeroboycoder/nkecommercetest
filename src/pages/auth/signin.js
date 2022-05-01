import React, { useCallback, useReducer } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./signin.css";

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT":
      return {
        ...state,
        [action.name]: action.value,
      };
    default:
      return state;
  }
};

const Signin = (props) => {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, {
    uname: "",
    password: "",
    bname: "NK Software House",
    canClick: false,
  });

  const inputChangeHandler = useCallback(
    (name, value) => {
      dispatch({ type: "CHANGE_INPUT", name, value });
    },
    [dispatch]
  );

  const checkCanClick = () => {
    let canClick = false;
    if (
      state.uname.trim().length >= 1 &&
      state.password.trim().length >= 1 &&
      state.bname.trim().length >= 1
    ) {
      canClick = true;
    }
    return canClick;
  };

  const submitHandler = async () => {
    try {
      const data = {
        UserName: "Admin01",
        Password: "admin@123",
      };
      const res = await axios.post(
        "https://ecommerceapi.nksoftwarehouse.com/Admin/Login",
        data
      );
      const result = res.data;
      console.log(result);
    } catch (error) {
      throw new Error(error);
    }
  };

  const keyDown = (event) => {
    event.which === 13 && submitHandler();
  };

  return (
    <div className="screen">
      <Box component="form" className="form">
        <div className="inputgroup">
          <Typography variant="h2" className="formTitle">
            Sign In
          </Typography>
          <TextField
            required
            id="uname"
            label="Username"
            className="formText"
            value={state.uname}
            onChange={(e) => inputChangeHandler("uname", e.target.value)}
          />
          <TextField
            required
            id="password"
            label="Password"
            type="password"
            className="formText"
            value={state.password}
            onChange={(e) => inputChangeHandler("password", e.target.value)}
            onKeyDown={(e) => keyDown(e)}
          />
          <TextField
            required
            id="bname"
            label="Business Name"
            defaultValue="NK Software House"
            className="formText"
          />
          <Button
            variant="contained"
            className="formBtn"
            disabled={checkCanClick() ? false : true}
            onClick={submitHandler}
          >
            Sign In
          </Button>
        </div>
      </Box>
    </div>
  );
};

export default Signin;
