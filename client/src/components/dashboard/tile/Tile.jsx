import React from "react";
import "./tile.scss";

// - Redux
import { connect } from "react-redux";
import { movePawn, removeHighlights } from "../../../redux/actions/gameActions";

export const Tile = ({
  playerValue,
  row,
  column,
  selectTile,
  isActive,
  setActiveTile,
  movePawn,
  removeHighlights,
}) => {
  const isEvenTile = (row - column) % 2 === 0;

  const handleTileClick = () => {
    if (isActive[0] !== -1) {
      movePawn(isActive, [row, column]);
      setActiveTile([-1, -1]);
      removeHighlights()
    }
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
        <div
          onClick={() => {
            setActiveTile([row, column]);
            selectTile(playerValue, row, column);
          }}
          className={`
          tile__pawn 
          ${playerValue === 2 ? "pawn--grey" : ""}
          ${playerValue === 1 ? "pawn--red" : ""}
          ${row === isActive[0] && column === isActive[1] ? "pawn--active" : ""}
          `}
        ></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { movePawn, removeHighlights };

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
