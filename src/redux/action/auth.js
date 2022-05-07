import axios from "axios";
import { Notify } from "notiflix";

export const LOGIN = "LOGIN";

export const onLogin = (data, navigate) => async (dispatch) => {
  const res = await axios.post(
    "https://ecommerceapi.nksoftwarehouse.com/Admin/Login",
    data
  );
  const resData = res.data;
  const { RespCode, RespDescription } = resData;
  if (RespCode === "E0002") {
    Notify.failure(RespDescription);
    return;
  }
  if (RespCode === "I0000") {
    dispatch({
      type: LOGIN,
      data: resData,
    });
    Notify.success(RespDescription);
    navigate("/admin/dashboard");
  }
};
