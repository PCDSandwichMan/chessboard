import React from "react";
import "./tile.scss";

// - Utils
import { ActiveIcon } from "../../../util/helpers";

// - Redux
import { connect } from "react-redux";
import {
  movePawn,
  removeHighlights,
  swapTurn,
} from "../../../redux/actions/gameActions"; 

export const Tile = ({
  playerValue,
  row,
  column,
  selectTile,
  isActive,
  setActiveTile,
  movePawn,
  removeHighlights,
  boardState,
  currentPlayerTurn,
  swapTurn,
  playerOnePref,
  playerTwoPref,
}) => {
  const isEvenTile = (row - column) % 2 === 0;

  // - Steps: moves player in 2d array, remove highlight including active, swap turns
  const handleTileClick = () => {
    if (isActive[0] !== -1 && boardState[row][column] === -1) {
      movePawn(isActive, [row, column]);
      setActiveTile([-1, -1]);
      removeHighlights();
      swapTurn();
    }
  };

  // - Steps: sets the active tile for glow, and options for glow |has to be players turn| 
  const handlePawnClick = () => {
    if (playerValue !== currentPlayerTurn) return;
    setActiveTile([row, column]);
    selectTile(playerValue, row, column);
  };
  
  return (
    <div
      onClick={handleTileClick}
      className={`
      tileComponent
      ${isEvenTile ? "tile--white" : "tile--black"}
      ${playerValue === -1 ? "tileComponent--highlight" : ""}
      `}
    > 
      {playerValue > 0 && (
        <ActiveIcon
          playerOneConfig={playerOnePref}
          playerTwoConfig={playerTwoPref}
          playerType={playerValue}
          fontSize="large"
          onClick={handlePawnClick} 
          className={`
          tile__pawn 
          ${row === isActive[0] && column === isActive[1] ? "pawn--active" : ""}
          `}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  boardState: state.game.boardState,
  currentPlayerTurn: state.game.currentPlayerTurn,
  playerOnePref: state.game.playerOneConfig,
  playerTwoPref: state.game.playerTwoConfig,
});

const mapDispatchToProps = { movePawn, removeHighlights, swapTurn };

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
