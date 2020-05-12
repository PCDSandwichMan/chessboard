import React from "react";
import "./tile.scss";

function Tile({ row, column, active }) {
  console.log(active);
  return (
    <div
      className={
        (row - column) % 2 === 0
          ? "white whiteTileComponent"
          : "black whiteTileComponent"
      }
    >
      {active ? "true" : "false"}
    </div>
  );
}

export default Tile;
