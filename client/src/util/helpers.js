import React from "react";
import jwtDecode from "jwt-decode";

// - Material
// * Player One
import StarsIcon from "@material-ui/icons/Stars";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlbumIcon from "@material-ui/icons/Album";
// * Player Two
import GitHubIcon from "@material-ui/icons/GitHub";
import AdbIcon from "@material-ui/icons/Adb";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
// * Fallback
import HelpIcon from "@material-ui/icons/Help";

// - Used as a helper for assigning the active icon on the pawn
export const ActiveIcon = ({
  playerOneConfig,
  playerTwoConfig,
  playerType,
  ...rest
}) => {
  if (playerType === 1) {
    switch (playerOneConfig.selectedIcon) {
      case "star":
        return (
          <StarsIcon
            style={{ color: playerOneConfig.selectedColor }}
            {...rest}
          />
        );
      case "userIcon":
        return (
          <AccountCircleIcon
            style={{ color: playerOneConfig.selectedColor }}
            {...rest}
          />
        );
      case "album":
        return (
          <AlbumIcon
            style={{ color: playerOneConfig.selectedColor }}
            {...rest}
          />
        );
      default:
        return (
          <HelpIcon
            style={{ color: playerOneConfig.selectedColor }}
            {...rest}
          />
        );
    }
  } else if (playerType === 2) {
    switch (playerTwoConfig.selectedIcon) {
      case "gitHubIcon":
        return (
          <GitHubIcon
            style={{ color: playerTwoConfig.selectedColor }}
            {...rest}
          />
        );
      case "android":
        return (
          <AdbIcon style={{ color: playerTwoConfig.selectedColor }} {...rest} />
        );
      case "emoji":
        return (
          <EmojiEmotionsIcon
            style={{ color: playerTwoConfig.selectedColor }}
            {...rest}
          />
        );
      default:
        return (
          <HelpIcon
            style={{ color: playerTwoConfig.selectedColor }}
            {...rest}
          />
        );
    }
  } else {
    return <HelpIcon {...rest} />;
  }
};

// - Used to generate 2d matrix for the board
export const genGameBoard = (rowCount) => {
  const newGameBoard = [];
  for (let i = 0; i < rowCount; i++) {
    // * Set player one pieces
    if (i <= 1) {
      // * Set Player 1
      newGameBoard.push(
        new Array(+rowCount).fill().map((e, j) => {
          return (i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)
            ? 1
            : 0;
        })
      );
    } else if (i === rowCount - 1 || i === rowCount - 2) {
      // * Set Player 2
      newGameBoard.push(
        new Array(+rowCount).fill().map((e, j) => {
          return (i % 2 === 0 && j % 2 === 0) || (i % 2 === 1 && j % 2 === 1)
            ? 2
            : 0;
        })
      );
    } else {
      // * Set Empty
      newGameBoard.push(new Array(+rowCount).fill().map((e) => 0));
    }
  }
  return newGameBoard;
};

// - Used for move prediction and validation
export const moveOptions = (player, row, column, board) => {
  /*======================
    the gist of this checks for bounds and if another piece is there 
    ======================*/
  let moves = [];
  if (player === 1) {
    // * Left Move (for player one)
    if (
      row + 1 <= board.length - 1 &&
      column - 1 >= 0 &&
      board[row + 1][column - 1] <= 0
    ) {
      moves.push([row + 1, column - 1]);
    }
    // * Right Move (for player one)
    if (
      row + 1 <= board.length - 1 &&
      column + 1 <= board.length - 1 &&
      board[row + 1][column + 1] <= 0
    ) {
      moves.push([row + 1, column + 1]);
    }
  } else if (player === 2) {
    // * Left Move (for player two)
    if (row - 1 >= 0 && column - 1 >= 0 && board[row - 1][column - 1] <= 0) {
      moves.push([row - 1, column - 1]);
    }
    // * Right Move (for player two)
    if (
      row - 1 >= 0 &&
      column + 1 <= board.length - 1 &&
      board[row - 1][column + 1] <= 0
    ) {
      moves.push([row - 1, column + 1]);
    }
  } else {
    throw new Error("Invalid Player");
  }
  return moves;
};

// - Used to check if the token is past expiration for route protection
export const tokenIsValid = (token) => {
  const decodeToken = jwtDecode(token);
  if (decodeToken.exp * 1000 < Date.now()) {
    localStorage.clear();
    return false;
  }
  return true;
};
