module.exports = {
  BASE_URL:
    process.env.NODE_ENV !== "production" ? "http://localhost:5000" : "",
  // - Game Reducer
  SET_BOARD_STATE: "gameReducer:set-board-state",
};
