import React from "react";
import "./tile.scss";

// - Redux
import { connect } from "react-redux";

export const Tile = ({ playerValue, row, column, selectTile }) => {
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
          onClick={() => selectTile(playerValue, row, column)}
          className={`
          tile__pawn 
          ${playerValue === 2 ? "pawn--grey" : ""}
          ${playerValue === 1 ? "pawn--red" : ""}
          `}
        ></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
