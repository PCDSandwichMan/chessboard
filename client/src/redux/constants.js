module.exports = {
  BASE_URL:
    process.env.NODE_ENV !== "production" ? "http://localhost:5000" : "",
  // - Game Reducer
  SET_BOARD_STATE: "gameReducer:set-board-state",
  HIGHLIGHT_OPTIONS: "gameReducer:hight-options",
  REMOVE_HIGHLIGHTS: "gameReducer:remove-highlights",
  MOVE_PAWN: "gameReducer:move-pawn",
};
