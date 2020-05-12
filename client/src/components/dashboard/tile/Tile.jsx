import React, { useState } from "react";
import "./tile.scss";

// - Redux
import { connect } from "react-redux";

export const Tile = ({
  playerValue,
  row,
  column,
  selectTile,
  isActive,
  setActiveTile,
}) => {
  const isEvenTile = (row - column) % 2 === 0;
  return (
    <div
      className={`
      tileComponent
      ${isEvenTile ? "tile--white" : "tile--black"}
      ${playerValue === -1 ? "tileComponent--highlight" : ""}
      `}
    >
      {playerValue !== 0 && (
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
