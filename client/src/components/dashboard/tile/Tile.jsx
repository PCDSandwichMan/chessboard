import React from "react";
import "./tile.scss";

// - Redux
import { connect } from "react-redux";

export const Tile = ({ playerValue, row, column }) => {
  return (
    <div
      className={
        (row - column) % 2 === 0
          ? "tile--white tileComponent"
          : "tile--black tileComponent"
      }
    >
      {playerValue !== 0 && (
        <div
          className={
            playerValue == 1 ? "tile__pawn pawn--red" : "tile__pawn pawn--grey"
          }
        ></div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
