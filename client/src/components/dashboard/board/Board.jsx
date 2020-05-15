import React, { useState } from "react";
import "./board.scss";

// - Material
import { CircularProgress } from "@material-ui/core";
// - Component
import Tile from "../tile/Tile.jsx";
// - Redux
import { connect } from "react-redux";
import { highlightOptions } from "../../../redux/actions/gameActions";

const Board = ({ boardState, highlightOptions }) => {
  const [activeTile, setActiveTile] = useState([-1, -1]);

  const selectTile = (player, row, column) => {
    highlightOptions(player, row, column, boardState);
  };

  if (boardState && boardState.length) {
    return (
      <div data-test="component-board" className="boardComponent">
        {/* // - Render tiles row by row */}
        {boardState.map((row, rowIndex) => (
          <div key={rowIndex} className="board__row">
            {row.map((column, colIdx) => (
              <Tile
                isActive={activeTile}
                setActiveTile={setActiveTile}
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
  }
  return <CircularProgress />;
};

const mapStateToProps = (state) => ({
  boardState: state.game.boardState,
});

const mapDispatchToProps = { highlightOptions };

export default connect(mapStateToProps, mapDispatchToProps)(Board);
