import React, { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { useNavigate } from "react-router";
import { IconButton, Fab } from "@mui/material";
import { ModeEditOutline, DeleteOutline, Add } from "@mui/icons-material";

import "./Staff.css";
import CreateForm from "../../../components/CreateForm/CreateForm";
import Spinner from "../../../components/Spinner/Spinner";

const Staff = () => {
  const navigate = useNavigate();
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState();
  const [phno, setPhno] = useState();
  const [permissions, setPermissions] = useState();
  const [loading, setLoading] = useState(false);

  const toggleHandler = () => {
    setShowDialog((currentState) => !currentState);
  };

  // Edit Data Handler
  const editHandler = (data) => {
    const [name, phno, permissionsObj] = data;
    const permissions = {};
    permissionsObj.split(",").map((permission) => {
      permissions[permission.toLowerCase().trim()] = true;
    });
    setName(name);
    setPhno(phno);
    setPermissions(permissions);
    toggleHandler();
  };

  const deleteHandler = (data) => {
    console.log(data);
  };

  // Datas for MUI Data Table
  const columns = ["Name", "Phone Number", "Permission", ""];

  const data = [
    [
      "Joe James",
      "0923456789",
      "Create",
      [
        <IconButton className="staff_icon" onClick={editHandler}>
          <ModeEditOutline className={"staff_editIcon"} />
        </IconButton>,
        <IconButton className="staff_icon" onClick={deleteHandler}>
          <DeleteOutline className={"staff_deleteIcon"} />
        </IconButton>,
      ],
    ],
    [
      "John Walsh",
      "0923456789",
      "Create, Update, Delete, Order",
      [
        <IconButton className="staff_icon" onClick={editHandler}>
          <ModeEditOutline className={"staff_editIcon"} />
        </IconButton>,
        <IconButton className="staff_icon" onClick={deleteHandler}>
          <DeleteOutline className={"staff_deleteIcon"} />
        </IconButton>,
      ],
    ],
    [
      "Bob Herm",
      "0923456789",
      "Create, Delete",
      [
        <IconButton className="staff_icon" onClick={editHandler}>
          <ModeEditOutline className={"staff_editIcon"} />
        </IconButton>,
        <IconButton className="staff_icon" onClick={deleteHandler}>
          <DeleteOutline className={"staff_deleteIcon"} />
        </IconButton>,
      ],
    ],
    [
      "James Houston",
      "0923456789",
      "Update, Delete",
      [
        <IconButton className="staff_icon" onClick={editHandler}>
          <ModeEditOutline className={"staff_editIcon"} />
        </IconButton>,
        <IconButton className="staff_icon" onClick={deleteHandler}>
          <DeleteOutline className={"staff_deleteIcon"} />
        </IconButton>,
      ],
    ],
  ];

  let app = <Spinner />;
  if (!loading) {
    app = (
      <>
        {showDialog && (
          <CreateForm
            formType="edit_staff"
            headerText="Edit Staff"
            datas={{ name, phno, permissions }}
            showDialog={showDialog}
            toggleDialog={toggleHandler}
          />
        )}
        <MUIDataTable
          title={"Staffs"}
          data={data}
          columns={columns}
          options={{
            onRowClick: editHandler,
          }}
        />
        <div
          className="staff_addIcon"
          onClick={() => navigate("/admin/create-staff")}
        >
          <Fab aria-label="add">
            <Add />
          </Fab>
        </div>
      </>
    );
  }
  return app;
};

export default Staff;
