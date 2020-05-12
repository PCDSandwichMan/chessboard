import constants from "../../redux/constants";

export const setGameState = (gameState) => (dispatch) => {
  console.log(gameState);
  dispatch({
    type: constants.SET_BOARD_STATE,
    payload: gameState,
  });
};

// todo move to util helpers
const moveOptions = (player, row, column, board) => {
  /*======================
    the gist of this checks for bounds and if another piece is there 
    ======================*/
  let moves = [];
  if (player === 1) {
    // * Left Move (for player one)
    if (
      row + 1 <= board.length - 1 &&
      column - 1 >= 0 &&
      board[row + 1][column - 1] <= 0
    ) {
      moves.push([row + 1, column - 1]);
    }
    // * Right Move (for player one)
    if (
      row + 1 <= board.length - 1 &&
      column + 1 <= board.length - 1 &&
      board[row + 1][column + 1] <= 0
    ) {
      moves.push([row + 1, column + 1]);
    }
  } else if (player === 2) {
    // * Left Move (for player two)
    if (row - 1 >= 0 && column - 1 >= 0 && board[row - 1][column - 1] <= 0) {
      moves.push([row - 1, column - 1]);
    }
    // * Right Move (for player two)
    if (
      row - 1 >= 0 &&
      column + 1 <= board.length - 1 &&
      board[row - 1][column + 1] <= 0
    ) {
      moves.push([row - 1, column + 1]);
    }
  } else {
    throw new Error("Invalid Player");
  }
  return moves;
};

export const highlightOptions = (player, row, column, board) => (dispatch) => {
  const getOptions = moveOptions(player, row, column, board);

  dispatch({
    type: constants.HIGHLIGHT_OPTIONS,
    payload: getOptions,
  });
};

const movePawn = (oldLocation, newLocation) => (dispatch) => {
  dispatch({
    type: constants.MOVE_PAWN,
    payload: {
      oldLocation,
      newLocation,
    },
  });
};
