import React, { useState, useEffect } from "react";
import axios from "axios";
import MUIDataTable from "mui-datatables";
import { IconButton, Fab } from "@mui/material";
import {
  ModeEditOutline,
  DeleteOutline,
  Add,
  Close,
} from "@mui/icons-material";
import { Notify } from "notiflix";

import "./Staff.css";
import CreateForm from "../../../components/CreateForm/CreateForm";
import Spinner from "../../../components/Spinner/Spinner";

const Staff = () => {
  const [returnStaffPage, setReturnStaffPage] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [tableColumns, setTableColumns] = useState([
    "Id",
    "Name",
    "Phone Number",
    "Role",
    "Permission",
    "",
  ]);
  const [tableDatas, setTableDatas] = useState([]);
  const [name, setName] = useState();
  const [phno, setPhno] = useState();
  const [permissions, setPermissions] = useState();
  const [loading, setLoading] = useState(false);

  // Fetch staff data
  useEffect(async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const datas = await axios.post(
      "https://ecommerceapi.nksoftwarehouse.com/Account/UserList",
      { token }
    );
    const users = datas.data;
    if (users.RespCode === "W0003") {
      Notify.failure("Invalid token. Please login again");
      return;
    }
    users.map((user) => console.log(user));
  }, [axios]);

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
        {returnStaffPage ? (
          <MUIDataTable
            title={"Staffs"}
            data={data}
            columns={columns}
            options={{
              onRowClick: editHandler,
            }}
          />
        ) : (
          <CreateForm formType="create_staff" headerText="Create Staff" />
        )}
        <div
          className="staff_addIcon"
          onClick={() => setReturnStaffPage((currentState) => !currentState)}
        >
          <Fab aria-label="add">{returnStaffPage ? <Add /> : <Close />}</Fab>
        </div>
      </>
    );
  }
  return app;
};

export default Staff;
