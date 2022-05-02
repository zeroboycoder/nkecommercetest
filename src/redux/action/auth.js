import axios from "axios";

export const LOGIN = "LOGIN";

export const onLogin = (data) => async (dispatch) => {
  const res = await axios.post(
    "https://ecommerceapi.nksoftwarehouse.com/Admin/Login",
    data
  );
  const resData = res.data;
  console.log("Reach action");
  dispatch({
    type: LOGIN,
    data: resData,
  });
};
