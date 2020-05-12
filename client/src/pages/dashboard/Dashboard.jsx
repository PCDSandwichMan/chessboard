import React, { useState, useEffect } from "react";
import "./dashboard.scss";
// - Http
import axios from "axios";
import constants from "../../redux/constants";
// - Material
import { TextField, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// - Components
import Board from "../../components/dashboard/board/Board.jsx";
import OneConfigOptions from "../../components/dashboard/configOptions/OneConfigOptions.jsx";
import TwoConfigOptions from "../../components/dashboard/configOptions/TwoConfigOptions.jsx";
// - Redux
import { connect } from "react-redux";
import {
  setGameState,
  setExistingState,
} from "../../redux/actions/gameActions";
// - Utils
import { genGameBoard } from "../../util/helpers";

function Dashboard({
  setGameState,
  currentPlayerTurn,
  history,
  state,
  boardState,
  playerOneConfig,
  playerTwoConfig,
  setExistingState,
}) {
  const [rowCount, setRowCount] = useState(8);

  const handleBoardSetup = async (isNew) => {
    // - This can be removed, however, as describe is does not look great and will crash if over 40 tiles in width are requested (tested on 2017 MacBook Air)
    if (rowCount < 5 || rowCount >= 16) {
      alert(
        "I intentionally limit this is the handleBoardSetup function of Dashboard.jsx since less than 5 and there is no game and more than 15 and the screen dies"
      );
      return;
    }

    // - Create a new board if one is not in state or the user is creating a new board |this runs on mount as well|
    if (!boardState.length || isNew) {
      // * creates a 2d array with player 1 and play 2 reset
      const newGameBoard = genGameBoard(rowCount);
      await setGameState(newGameBoard);
      handleUserGameSave(newGameBoard);
    }
  };

  useEffect(() => {
    // - Handle the requirement for refreshing the board state on refresh
    axios
      .get(`${constants.BASE_URL}/user/state`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setExistingState(data.state.game);
        if (!data.state.game.boardState.length) {
          handleBoardSetup(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  // - Persists redux state for next login (I CAN RESET THE USER OPTIONS HERE TO IF I NEED THE GUIDE SAYS ONLY TO DO THE BOARD SATE NOT PREFERENCES IT SEEMS)
  const handleUserGameSave = (newGameBoard) => {
    if (newGameBoard[0]) {
      state.game.boardState = newGameBoard;
      state.game.currentPlayerTurn = 1;
    }
    axios
      .post(
        `${constants.BASE_URL}/user/save`,
        { ...state },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="dashboardView" data-test="dashboardView">
      <header>
        <div className="dashboard__logout" onClick={handleLogout}>
          <ExitToAppIcon className="dashboard__logout__icon" />
        </div>
        <div className="dashboard__controlsWrapper">
          <TextField
            label="How wide do you want your board to be?"
            color="primary"
            variant="outlined"
            value={rowCount}
            onChange={(e) => setRowCount(e.target.value)}
            type="number"
            className="dashboardView__input"
          />
          <Button
            onClick={() => handleBoardSetup(true)}
            variant="outlined"
            color="primary"
          >
            Create New Board
          </Button>
        </div>
      </header>
      <main className="dashboard__main">
        <p className="dashboard__main__save" onClick={handleUserGameSave}>
          Save Game
        </p>
        <p
          className="dashboard__main__reset"
          onClick={() => handleBoardSetup(true)}
        >
          Reset Game
        </p>
        <OneConfigOptions />
        <section>
          <div
            className={`dashboardView__mainTtl`}
            style={{
              background:
                currentPlayerTurn === 1
                  ? playerOneConfig.selectedColor
                  : playerTwoConfig.selectedColor,
            }}
          >
            <h1>
              Current Turn: Player {currentPlayerTurn === 1 ? "One" : "Two"}
            </h1>
          </div>
          <Board />
        </section>
        <TwoConfigOptions />
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentPlayerTurn: state.game.currentPlayerTurn,
  playerOneConfig: state.game.playerOneConfig,
  playerTwoConfig: state.game.playerTwoConfig,
  boardState: state.game.boardState,
  state: state,
});

const mapActionsToProps = { setGameState, setExistingState };

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
