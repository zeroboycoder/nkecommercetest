import React, { useReducer } from "react";
import {
  Button,
  Checkbox,
  Typography,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import Input from "../Input/Input";
import "./CreateForm.css";

const UPDATE_INPUT = "UPDATE_INPUT";
const UPDATE_CHECKBOX = "UPDATE_CHECKBOX";
const CLEAR_STATE = "CLEAR_STATE";
const UPDATE_STATE = "UPDATE_STATE";

const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_INPUT: {
      return {
        ...state,
        [action.label]: action.value,
      };
    }
    // Create Staff Form
    case UPDATE_CHECKBOX: {
      return {
        ...state,
        permission: action.permission,
      };
    }
    case CLEAR_STATE: {
      return {
        uname: "",
        phno: "",
        pword: "",
        permission: {
          create: false,
          update: false,
          delete: false,
          order: false,
        },
      };
    }
    default:
      break;
  }
};

export const CreateForm = ({ headerText, formType, buttonText }) => {
  const [state, dispatch] = useReducer(reducer, {
    // create staff
    uname: "",
    phno: "",
    pword: "",
    permission: {
      create: true,
      update: false,
      delete: false,
      order: false,
      all: false,
    },
  });

  const inputChangeHandler = (label, value) => {
    console.log(label, value);
    dispatch({
      type: "UPDATE_INPUT",
      label,
      value,
    });
  };

  const checkboxHandler = (label, value) => {
    const updatePermission = { ...state.permission };
    if (label === "all") {
      for (const key in updatePermission) {
        updatePermission[key] = value;
      }
    }
    updatePermission[label] = value;
    dispatch({
      type: UPDATE_CHECKBOX,
      permission: updatePermission,
    });
  };

  const cancleHandler = () => {
    dispatch({
      type: "CLEAR_STATE",
    });
  };

  const submitHandler = () => {
    const datas = { ...state };
    console.log(datas);
  };

  const canClickCreate = () => {
    // if there's nothing, return false
    let canClick =
      state.uname.length > 0 && state.phno.length > 0 && state.pword.length > 0;
    return canClick; // return true
  };

  // Create Staff Form
  const CreateStaffForm = (
    <>
      <div className="CreateForm_inputGp">
        <p>Username</p>
        <Input
          id="uname"
          label="Username"
          value={state.uname}
          changed={inputChangeHandler}
        />
      </div>
      <div className="CreateForm_inputGp">
        <p>PhoneNo</p>
        <Input
          id="phno"
          label="Phone No"
          value={state.phno}
          changed={inputChangeHandler}
        />
      </div>
      <div className="CreateForm_inputGp">
        <p>Password</p>
        <Input
          id="pword"
          label="Password"
          value={state.pword}
          type="password"
          changed={inputChangeHandler}
        />
      </div>
      <div className="CreateForm_inputGp">
        <p>Permission</p>
        <FormGroup style={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={<Checkbox checked={state.permission.create} />}
            label="Create"
            onChange={(e) => checkboxHandler("create", e.target.checked)}
          />
          <FormControlLabel
            control={<Checkbox checked={state.permission.update} />}
            label="Update"
            onChange={(e) => checkboxHandler("update", e.target.checked)}
          />
          <FormControlLabel
            control={<Checkbox checked={state.permission.delete} />}
            label="Delete"
            onChange={(e) => checkboxHandler("delete", e.target.checked)}
          />
          <FormControlLabel
            control={<Checkbox checked={state.permission.order} />}
            label="Check Order"
            onChange={(e) => checkboxHandler("order", e.target.checked)}
          />
          <FormControlLabel
            control={<Checkbox checked={state.permission.all} />}
            label="All"
            onChange={(e) => checkboxHandler("all", e.target.checked)}
          />
        </FormGroup>
      </div>
    </>
  );

  return (
    <div className="CreateForm">
      {/* Form Title */}
      <Typography variant="h3" className="CreateForm_title">
        {headerText}
      </Typography>
      <form className="CreateForm_form">
        {/* Form based on formType */}
        {/* Create Staff */}
        {CreateStaffForm}
        {/* Button */}
        <div className="CreateForm_inputGp">
          <p></p>
          <FormGroup
            style={{
              display: "flex",
              flexDirection: "row",
              width: "215px",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" color="error" onClick={cancleHandler}>
              Cancle
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={submitHandler}
              disabled={!canClickCreate()}
            >
              Create
            </Button>
          </FormGroup>
        </div>
      </form>
    </div>
  );
};

export default CreateForm;
