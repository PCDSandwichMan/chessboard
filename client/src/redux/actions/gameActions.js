import constants from "../../redux/constants";

export const setGameState = (gameState) => (dispatch) => {
  console.log(gameState);
  dispatch({
    type: constants.SET_BOARD_STATE,
    payload: gameState,
  });
};
