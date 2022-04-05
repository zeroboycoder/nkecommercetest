import React from "react";
import MUIDataTable from "mui-datatables";

const columns = ["Name", "Phone Number", "Permission"];

const data = [
  ["Joe James", "0923456789", "Create"],
  ["John Walsh", "0923456789", "Create, Edit"],
  ["Bob Herm", "0923456789", "Create, Delete"],
  ["James Houston", "0923456789", "Edit, Delete"],
];

const Staff = () => {
  return (
    <div>
      <MUIDataTable title={"Staffs"} data={data} columns={columns} />
    </div>
  );
};

export default Staff;
