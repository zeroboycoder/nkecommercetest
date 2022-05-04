import { LOGIN } from "../action/auth";

const initState = {
  user: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem("bname", action.data.BusinessName);
      localStorage.setItem("token", action.data.Token);
      localStorage.setItem("color", action.data.ColorCode);
      return {
        user: action.data,
      };
    default:
      return state;
  }
};
