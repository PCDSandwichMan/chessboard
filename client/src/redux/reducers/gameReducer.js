import constants from "../constants";

const initialState = {
  boardState: [],
};

const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.SET_BOARD_STATE:
      return {
        ...state,
        boardState: payload,
      };

    default:
      return state;
  }
};

export default gameReducer;
