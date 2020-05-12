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
    case constants.HIGHLIGHT_OPTIONS:
      // todo export to helper or other action
      let newBoard = state.boardState.map((rowArr) => {
        return rowArr.map((columnValue) => {
          if (columnValue === -1) {
            return 0;
          }
          return columnValue;
        });
      });

      console.log(newBoard);
      payload.forEach(([row, column]) => (newBoard[row][column] = -1));
      return {
        ...state,
        boardState: newBoard,
      };
    default:
      return state;
  }
};

export default gameReducer;
