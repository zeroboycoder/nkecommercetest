import { LOGIN } from "../action/auth";

const initState = {
  user: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("Datas : ", action.data);
      return {
        user: action.data,
      };
    default:
      return state;
  }
};
