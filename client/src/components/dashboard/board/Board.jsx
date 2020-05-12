import React, { useEffect } from "react";
import "./board.scss";

// - Component
import Tile from "../tile/Tile";

// - Redux
import { connect } from "react-redux";
import { highlightOptions } from "../../../redux/actions/gameActions";

export const Board = ({ boardState, highlightOptions }) => {
  useEffect(() => {
    console.log(boardState);
  }, [boardState]);

  const selectTile = (player, row, column) => {
    highlightOptions(player, row, column, boardState);
  };

  return (
    <div className="boardComponent">
      {boardState.map((row, rowIndex) => (
        <div key={rowIndex} className="board__row">
          {row.map((column, colIdx) => (
            <Tile
              playerValue={column}
              row={rowIndex}
              column={colIdx}
              key={colIdx + rowIndex}
              selectTile={selectTile}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => ({
  boardState: state.game.boardState,
});

const mapDispatchToProps = { highlightOptions };

export default connect(mapStateToProps, mapDispatchToProps)(Board);
