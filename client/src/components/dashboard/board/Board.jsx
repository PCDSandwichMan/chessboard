import React, { useEffect } from "react";
import "./board.scss";

// - Component
import Tile from "../tile/Tile";
// - Redux
import { connect } from "react-redux";

export const Board = ({ boardState }) => {
  useEffect(() => {
    console.log(boardState);
  }, [boardState]);

  return (
    <div className="boardComponent">
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} className="board__row">
          {row.map((column, colIdx) => (
            <Tile playerValue={column} row={rowIndex} column={colIdx} key={colIdx + rowIndex} />
          ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  boardState: state.game.boardState,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
