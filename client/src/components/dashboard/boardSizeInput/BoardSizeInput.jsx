import React from "react";
import "./boardSizeInput.scss";
// - Material
import { TextField, Button } from "@material-ui/core";

export const BoardSizeInput = ({ 
  rowCount,
  setRowCount,
  handleBoardSetup,
  handleUserGameSave,
}) => {
  return (
    <div className="boardSizeInputComponent">
      <div className="boardSizeInputComponent__wrapper">
        <div className="boardSizeInputComponent__utilBar">
            <TextField
              label="Enter Board Width"
              color="primary"
              variant="outlined"
              value={rowCount}
              onChange={(e) => setRowCount(e.target.value)}
              type="number"
              className="boardSizeInputComponent__input"
              size="small"
            />
            <Button
              onClick={() => handleBoardSetup(true)}
              variant="outlined"
              color="primary"
            >
              Create New Board
            </Button>
        </div>
        <div className="boardSizeInputComponent__utilBtns">
          <Button
            variant="outlined"
            className="boardSizeInputComponent__main__save"
            onClick={handleUserGameSave}
          >
            Save Game
          </Button>
          <Button
            variant="outlined"
            className="boardSizeInputComponent__main__reset"
            onClick={() => handleBoardSetup(true)}
          >
            Reset Game
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BoardSizeInput;
