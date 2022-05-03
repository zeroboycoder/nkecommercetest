import React, { useReducer } from "react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogActions,
  DialogContent,
  Typography,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useSelector } from "react-redux";

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
        ...action.updateState,
      };
    }
    // Create Product
    case UPDATE_STATE: {
      return {
        ...action.updateState,
      };
    }
    default:
      break;
  }
};

export const CreateForm = ({
  showDialog,
  headerText,
  formType,
  datas,
  buttonText,
  toggleDialog,
}) => {
  const user = useSelector((store) => store.auth.user);
  const [state, dispatch] = useReducer(reducer, {
    // create staff
    uname: datas ? datas.name : "",
    phno: datas ? datas.phno : "",
    pword: "",
    permission: {
      create: datas ? datas.permissions.create : true,
      update: datas ? datas.permissions.update : false,
      delete: datas ? datas.permissions.delete : false,
      order: datas ? datas.permissions.order : false,
      all: datas ? datas.permissions.all : false,
    },
    // create product
    category: "",
    subCategory: "",
    pTitle: "",
    pDesc: "",
    price: "",
    pImage: "",
    isPopular: false,
    businessName: "pyaesonekhant",
    token: "this's token",
  });

  const inputChangeHandler = (label, value) => {
    dispatch({
      type: "UPDATE_INPUT",
      label,
      value,
    });
  };

  const checkboxHandler = (label, value) => {
    if (formType === "create_staff" || formType === "edit_staff") {
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
    }
    // Create Product
    if (formType === "create_product") {
      const updateState = { ...state };
      updateState[label] = value;
      dispatch({
        type: UPDATE_STATE,
        updateState,
      });
    }
  };

  const cancleHandler = () => {
    const updateState = {
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
      category: "",
      subCategory: "",
      pTitle: "",
      pDesc: "",
      price: "",
      pImage: "",
      isPopular: false,
      businessName: "pyaesonekhant",
      token: "this's token",
    };
    dispatch({
      type: "CLEAR_STATE",
      updateState,
    });
  };

  const submitHandler = () => {
    const datas = { ...state };
    console.log(datas);
  };

  const canClickCreate = () => {
    // if there's nothing, return false
    let canClick;
    if (formType === "create_staff") {
      canClick =
        state.uname.length > 0 &&
        state.phno.length > 0 &&
        state.pword.length > 0;
    }
    if (formType === "create_product") {
      canClick =
        state.category.length > 0 &&
        state.pTitle.length > 0 &&
        state.pDesc.length > 0 &&
        state.price.length > 0 &&
        state.pImage.length > 0;
    }
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
      {formType !== "edit_staff" && (
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
      )}
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

  // Edit Staff Form
  const editDialogForm = (
    <Dialog open={true} onClose={toggleDialog}>
      <DialogTitle>{headerText}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {CreateStaffForm}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={toggleDialog}>Cancle</Button>
        <Button onClick={toggleDialog} autoFocus>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );

  // Create Product Form
  const CreateProductForm = (
    <>
      <div className="CreateForm_inputGp">
        <p>Category</p>
        <Input
          id="category"
          label="Category"
          value={state.category}
          changed={inputChangeHandler}
        />
      </div>
      {user.BusinessName !== "Nyein" ? (
        <div className="CreateForm_inputGp">
          <p>Sub-Category</p>
          <Input
            id="subCategory"
            label="Sub-Category"
            value={state.subCategory}
            changed={inputChangeHandler}
          />
        </div>
      ) : null}
      <div className="CreateForm_inputGp">
        <p>Product Title</p>
        <Input
          id="pTitle"
          label="Product Title"
          value={state.pTitle}
          changed={inputChangeHandler}
        />
      </div>
      <div className="CreateForm_inputGp">
        <p>Product Description</p>
        <Input
          id="pDesc"
          label="Product Description"
          value={state.pDesc}
          changed={inputChangeHandler}
        />
      </div>
      <div className="CreateForm_inputGp">
        <p>Price</p>
        <Input
          id="price"
          label="Price"
          type="number"
          value={state.price}
          changed={inputChangeHandler}
        />
      </div>
      <div className="CreateForm_inputGp">
        <p>Product Image</p>
        <Input
          id="pImage"
          label="Product Image"
          value={state.pImage}
          changed={inputChangeHandler}
        />
      </div>
      <div className="CreateForm_inputGp">
        <p></p>
        <FormGroup style={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={<Checkbox checked={state.isPopular} />}
            label="Popular"
            onChange={(e) => checkboxHandler("isPopular", e.target.checked)}
          />
        </FormGroup>
      </div>
    </>
  );

  return (
    <>
      {formType === "edit_staff" && editDialogForm}
      {formType !== "edit_staff" && (
        <div className="CreateForm">
          <form
            className={
              formType !== "create_product"
                ? "CreateForm_form"
                : "CreateForm_productForm"
            }
          >
            {/* Form Title */}
            <Typography variant="h3" className="CreateForm_title">
              {headerText}
            </Typography>
            {/* Form based on formType */}
            {/* Create Staff */}
            {formType === "create_staff" && CreateStaffForm}

            {/* Create Product */}
            {formType === "create_product" && CreateProductForm}

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
                <Button
                  variant="contained"
                  color="error"
                  onClick={cancleHandler}
                >
                  Clear
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
      )}
    </>
  );
};

export default CreateForm;
