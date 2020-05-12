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

// - Material
// * Player One
import StarsIcon from "@material-ui/icons/Stars";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlbumIcon from "@material-ui/icons/Album";
// * Player Two
import GitHubIcon from "@material-ui/icons/GitHub";
import AdbIcon from "@material-ui/icons/Adb";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

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

  const handleTileClick = () => {
    if (isActive[0] !== -1 && boardState[row][column] === -1) {
      movePawn(isActive, [row, column]);
      setActiveTile([-1, -1]);
      removeHighlights();
      swapTurn();
    }
  };

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
      {/* // todo implement playerValue !== 0 as a preview feature */}
      {playerValue > 0 && (
        <ActiveIcon
          playerOneConfig={playerOnePref}
          playerTwoConfig={playerTwoPref}
          playerType={playerValue}
          fontSize="large"
          onClick={handlePawnClick}
          // ${playerValue === 2 ? "pawn--grey" : ""}
          // ${playerValue === 1 ? "pawn--red" : ""}
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
