import constants from "../../redux/constants";
import { moveOptions } from "../../util/helpers";

// - Used to set the initial game state of the board if not existing
export const setGameState = (gameState) => async (dispatch) => {
  return dispatch({
    type: constants.SET_BOARD_STATE,
    payload: gameState,
  });
};

// - Used to high tile options after clicking pawn
export const highlightOptions = (player, row, column, board) => (dispatch) => {
  const getOptions = moveOptions(player, row, column, board);

  dispatch({
    type: constants.HIGHLIGHT_OPTIONS,
    payload: getOptions,
  });
};

// - Removes all highlights on predicted tiles
export const removeHighlights = () => (dispatch) => {
  dispatch({
    type: constants.REMOVE_HIGHLIGHTS,
  });
};

// - Moves the paws to the selected tile as long as it meets the constraints and stays in bounds
export const movePawn = (oldLocation, newLocation) => (dispatch) => {
  dispatch({
    type: constants.MOVE_PAWN,
    payload: {
      oldLocation,
      newLocation,
    },
  });
};

// - Handle the current turn for each player to prevent consecutive moves
export const swapTurn = () => (dispatch) => {
  dispatch({
    type: constants.SWAP_TURN,
  });
};

// - This sets the users configuration for tile and pawn color for ether player 1 or 2
export const setUserConfig = (playerType, selectedColor, selectedIcon) => (
  dispatch
) => {
  dispatch({
    type: constants.SET_CONFIG,
    payload: {
      playerType,
      selectedColor,
      selectedIcon,
    },
  });
};

// - This fires on login and will assign the only state object to the store if existing
export const setExistingState = (oldState) => (dispatch) => {
  dispatch({
    type: constants.LOAD_EXISTING_STATE,
    payload: oldState,
  });
};
