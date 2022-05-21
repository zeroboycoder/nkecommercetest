import axios from "axios";
import { Notify } from "notiflix";

export const CREATE_STAFF = "CREATE_STAFF";
export const UPDATE_STAFF = "UPDATE_STAFF";
export const DELETE_STAFF = "DELETE_STAFF";

export const onCreateStaff = (datas) => async (dispatch) => {
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

export const onUpdateStaff = (datas) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://ecommerceapi.nksoftwarehouse.com/Account/UpdateStaff",
      datas
    );
    const data = res.data;
    if (data.RespCode === "I0000") {
      Notify.success(data.RespDescription);
      dispatch({
        type: UPDATE_STAFF,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const onDeleteStaff = (datas) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://ecommerceapi.nksoftwarehouse.com/Account/DeleteStaff",
      datas
    );
    const data = res.data;
    console.log(data);
    if (data.RespCode === "I0000") {
      Notify.success(data.RespDescription);
      dispatch({
        type: DELETE_STAFF,
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};
