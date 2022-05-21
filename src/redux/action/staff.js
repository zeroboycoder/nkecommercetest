import axios from "axios";
import { Notify } from "notiflix";

export const CREATE_STAFF = "CREATE_STAFF";

export const onCreateStaff = (datas) => async (dispatch) => {
  console.log(datas);
  try {
    const res = await axios.post(
      "https://ecommerceapi.nksoftwarehouse.com/Account/CreateStaff",
      datas
    );
    const data = res.data;
    if (data.RespCode === "I0000") {
      Notify.success(data.RespDescription);
      dispatch({
        type: CREATE_STAFF,
      });
    }
  } catch (error) {
    console.log("error : ", error);
  }
};
