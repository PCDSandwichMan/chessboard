import constants from "../constants";

const initialState = {
  playerOneConfig: {
    selectedIcon: "",
    selectedColor: "",
  },
  playerTwoConfig: {
    selectedIcon: "",
    selectedColor: "",
  },
  currentPlayerTurn: 1,
  boardState: [],
};

const gameReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // - Used for board setup mainly on load or refresh
    case constants.SET_BOARD_STATE:
      return {
        ...state,
        currentPlayerTurn: 1,
        boardState: payload,
      };

    // - Used for pawn movement for both players
    case constants.MOVE_PAWN:
      let newActiveBoard = state.boardState.map((rowArr) => rowArr);
      const tileType =
        newActiveBoard[payload.oldLocation[0]][payload.oldLocation[1]];
      newActiveBoard[payload.oldLocation[0]][payload.oldLocation[1]] = 0;
      newActiveBoard[payload.newLocation[0]][payload.newLocation[1]] = tileType;

      return {
        ...state,
        boardState: newActiveBoard,
      };

    // - Used to designate with tile should be highlighted
    case constants.HIGHLIGHT_OPTIONS:
      let highlightedBoard = state.boardState.map((rowArr) => {
        return rowArr.map((columnValue) => {
          if (columnValue === -1) {
            return 0;
          }
          return columnValue;
        });
      });
      payload.forEach(([row, column]) => (highlightedBoard[row][column] = -1));
      return {
        ...state,
        boardState: highlightedBoard,
      };

    // - Used to remove highlights from the board after movement
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

    // - Used multiple places just to simply swap the active characters turn
    case constants.SWAP_TURN:
      return {
        ...state,
        currentPlayerTurn: state.currentPlayerTurn === 1 ? 2 : 1,
      };

    // - Used to set the users preference |in lifted state mainly so that we can persist it|
    case constants.SET_CONFIG:
      if (payload.playerType === 1) {
        return {
          ...state,
          playerOneConfig: {
            selectedIcon: payload.selectedIcon,
            selectedColor: payload.selectedColor,
          },
        };
      } else {
        return {
          ...state,
          playerTwoConfig: {
            selectedIcon: payload.selectedIcon,
            selectedColor: payload.selectedColor,
          },
        };
      }

    // - Used to set the object of the old state to our current store
    case constants.LOAD_EXISTING_STATE:
      return {
        ...payload,
      };

    // - Used to clear the store on logout
    case constants.CLEAR_STORE:
      return initialState;

    // - Fallthrough
    default:
      return state;
  }
};

export default gameReducer;
