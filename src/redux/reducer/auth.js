import { LOGIN } from "../action/auth";

const initState = {
  data: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case LOGIN:
      console.log("Datas : ", action.data);
      return {
        data: action.data,
      };
    default:
      return state;
  }
};
