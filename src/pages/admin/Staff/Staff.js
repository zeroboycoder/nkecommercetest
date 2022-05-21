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
import { useDispatch } from "react-redux";

import "./Staff.css";
import CreateForm from "../../../components/CreateForm/CreateForm";
import Spinner from "../../../components/Spinner/Spinner";
import {
  onCreateStaff,
  onUpdateStaff,
  onDeleteStaff,
} from "../../../redux/action/staff";

const Staff = () => {
  const dispatch = useDispatch();
  const [returnStaffPage, setReturnStaffPage] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [tableColumns, setTableColumns] = useState([
    "Id",
    "Name",
    "Phone Number",
    "Email",
    "Role",
    "Permission",
    "",
  ]);
  const [tableDatas, setTableDatas] = useState([]);
  const [uid, setUid] = useState();
  const [name, setName] = useState();
  const [phno, setPhno] = useState();
  const [permissions, setPermissions] = useState();
  const [loading, setLoading] = useState(false);

  // Fetch staff data
  useEffect(async () => {
    setLoading(true);
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
    let tempArr = [];
    users.map((user) => {
      const userPermissionsArr = [];
      if (user.CreatePermission === "True") {
        userPermissionsArr.push("Create");
      }
      if (user.UpdatePermission === "True") {
        userPermissionsArr.push("Update");
      }
      if (user.DeletePermission === "True") {
        userPermissionsArr.push("Delete");
      }
      if (user.CheckOrderPermission === "True") {
        userPermissionsArr.push("Order");
      }
      const userPermissions = userPermissionsArr.join(", ");
      tempArr = [
        ...tempArr,
        [
          user.Id,
          user.UserName,
          user.PhoneNumber,
          user.Email ? user.Email : "-",
          user.Role,
          userPermissions,
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
    });
    setTableDatas(tempArr);
    setLoading(false);
  }, [axios]);

  // Edit Staff Handler
  // Fetch user data
  const editHandler = (data) => {
    const userId = data[0];
    const name = data[1];
    const phno = data[2];
    const permissionsObj = data[5];
    const permissions = {};
    permissionsObj.split(",").map((permission) => {
      permissions[permission.toLowerCase().trim()] = true;
    });
    setUid(userId);
    setName(name);
    setPhno(phno);
    setPermissions(permissions);
    toggleHandler();
  };

  const toggleHandler = () => {
    setShowDialog((currentState) => !currentState);
  };

  const updateStaff = (data) => {
    dispatch(onUpdateStaff(data));
    toggleHandler();
  };

  // Delete Staff
  const deleteHandler = () => {
    const data = {
      Id: uid,
      Token: localStorage.getItem("token"),
    };
    dispatch(onDeleteStaff(data));
  };

  const submitHandler = (datas) => {
    dispatch(onCreateStaff(datas));
  };

  // Datas for MUI Data Table
  const columns = tableColumns;

  let app = <Spinner />;
  if (!loading) {
    app = (
      <>
        {/* Edit Staff */}
        {showDialog && (
          <CreateForm
            formType="edit_staff"
            headerText="Edit Staff"
            datas={{ uid, name, phno, permissions }}
            showDialog={showDialog}
            toggleDialog={toggleHandler}
            updateStaff={updateStaff}
          />
        )}
        {/* Staff page or Create Staff page */}
        {returnStaffPage ? (
          <MUIDataTable
            title={"Staffs"}
            data={tableDatas}
            columns={columns}
            options={{
              onRowClick: editHandler,
            }}
          />
        ) : (
          <CreateForm
            formType="create_staff"
            headerText="Create Staff"
            onPressed={submitHandler}
          />
        )}
        {/* Fav Icon */}
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
