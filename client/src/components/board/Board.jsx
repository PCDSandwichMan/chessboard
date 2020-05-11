import React, { useState, useEffect } from "react";
import "./board.scss";

// - Components
import Tile from "../tile/Tile.jsx";

function Board({ tilesCol }) {
  const [board, setBoard] = useState({
    row: [],
  });

  useEffect(() => {
    if (!tilesCol || tilesCol <= 0 || tilesCol >= 80) {
      tilesCol = 0;
    }

    setBoard({
      row: new Array(parseInt(tilesCol)).fill().map((val, idx) => {
        return <Tile />;
      }),
    });
    console.log(board.row, tilesCol);
  }, [tilesCol]);

  return (
    <div className="board">
      {board.row.map((tile, i) => (
        <div key={i}>
          {board.row.map((tile, j) => (
            <Tile row={i} column={j} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
