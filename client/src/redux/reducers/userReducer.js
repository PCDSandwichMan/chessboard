import constants from "../constants";

const initialState = {};

const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "value":
      return state;

    default:
      return state;
  }
};

export default userReducer;
