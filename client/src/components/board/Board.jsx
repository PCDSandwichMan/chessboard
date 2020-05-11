import React, { useState, useEffect } from "react";
import "./board.scss";

// - Components
import Tile from "../tile/Tile.jsx";

function Board({ tilesCol }) {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    if (!tilesCol || tilesCol <= 0 || tilesCol >= 80) {
      tilesCol = 0;
    }

    setBoard(
      new Array(parseInt(tilesCol)).fill().map((val, idx) => {
        return <Tile />;
      })
    );
  }, [tilesCol]);

  return (
    <div className="boardComponent">
      {board.map((tile, i) => (
        <div key={i}>
          {board.map((tile, j) => (
            <Tile row={i} column={j} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
