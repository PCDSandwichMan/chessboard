import React from "react";
import "./tile.scss";

function Tile({ row, column }) {
  return (
    <div
      className={
        (row - column) % 2 === 0
          ? "white whiteTileComponent"
          : "black whiteTileComponent"
      }
    ></div>
  );
}

export default Tile;
