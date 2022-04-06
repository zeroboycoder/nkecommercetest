import React, { useState } from "react";
import MUIDataTable from "mui-datatables";

import CreateForm from "../../../components/CreateForm/CreateForm";

const columns = ["Name", "Phone Number", "Permission"];

const data = [
  ["Joe James", "0923456789", "Create"],
  ["John Walsh", "0923456789", "Create, Update, Delete, Order"],
  ["Bob Herm", "0923456789", "Create, Delete"],
  ["James Houston", "0923456789", "Update, Delete"],
];

const Staff = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [name, setName] = useState();
  const [phno, setPhno] = useState();
  const [permissions, setPermissions] = useState();

  const toggleHandler = () => {
    setShowDialog((currentState) => !currentState);
  };

  const clickHandler = (data) => {
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

  return (
    <div>
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
        options={{ onRowClick: clickHandler }}
      />
    </div>
  );
};

export default Staff;
