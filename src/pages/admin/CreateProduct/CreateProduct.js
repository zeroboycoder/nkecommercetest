import React from "react";

import CreateForm from "../../../components/CreateForm/CreateForm";

const CreateProduct = () => {
  return (
    <div style={{ paddingBottom: "60px" }}>
      <CreateForm formType="create_product" headerText="Create Product" />
    </div>
  );
};

export default CreateProduct;
