import React, { useReducer } from "react";

import CreateForm from "../../../components/CreateForm/CreateForm";

const CreateStaff = () => {
  return (
    <div className="CreateStaff">
      <CreateForm formType="create_staff" headerText="Create Staff" />
    </div>
  );
};

export default CreateStaff;
