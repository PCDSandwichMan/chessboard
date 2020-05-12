import constants from "../constants";

const initialState = {
  currentPlayerTurn: 1,
  boardState: [],
};

const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case constants.SET_BOARD_STATE:
      return {
        ...state,
        boardState: payload,
      };
    case constants.MOVE_PAWN:
      let newerBoard = state.boardState.map((rowArr) => rowArr);
      console.log(payload);
      const tileType =
        newerBoard[payload.oldLocation[0]][payload.oldLocation[1]];
      newerBoard[payload.oldLocation[0]][payload.oldLocation[1]] = 0;
      newerBoard[payload.newLocation[0]][payload.newLocation[1]] = tileType;

      return {
        ...state,
        boardState: newerBoard,
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
      payload.forEach(([row, column]) => (newBoard[row][column] = -1));
      return {
        ...state,
        boardState: newBoard,
      };

    case constants.REMOVE_HIGHLIGHTS:
      return {
        ...state,
        boardState: state.boardState.map((rowArr) => {
          return rowArr.map((colVal) => {
            if (colVal === -1) {
              return 0;
            }
            return colVal;
          });
        }),
      };

    case constants.SWAP_TURN:
      return {
        ...state,
        currentPlayerTurn: state.currentPlayerTurn === 1 ? 2 : 1,
      };

    default:
      return state;
  }
};

export default gameReducer;
