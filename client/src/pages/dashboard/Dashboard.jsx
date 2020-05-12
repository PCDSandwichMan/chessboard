import React, { useState, useEffect } from "react";
import "./dashboard.scss";
// - Http
import axios from "axios";
import constants from "../../redux/constants";
// - Material
import { TextField, Button } from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// - Components
import Board from "../../components/dashboard/board/Board";
// - Redux
import { connect } from "react-redux";
import { setGameState } from "../../redux/actions/gameActions";
import OneConfigOptions from "../../components/dashboard/configOptions/OneConfigOptions";
import TwoConfigOptions from "../../components/dashboard/configOptions/TwoConfigOptions";
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
}) {
  const [rowCount, setRowCount] = useState(8);

  // todo matt: extract to helper
  const handleBoardSetup = (isNew) => {
    // - This can be taken but as describe is does not look great and will crash if over 40 tile requested (tested on 2017 MacBook Air)
    if (rowCount < 5 || rowCount >= 16) {
      alert(
        "I intentionally limit this is the handleBoardSetup function of Dashboard.jsx since less than 5 and there is no game and more than 13 and the screen dies"
      );
      return;
    }

    // - Create a new board if one is not in state or the user is creating a new board |this runs on mount as well|
    if (!boardState.length || isNew) {
      // * creates a 2d array with player 1 and play 2 reset
      const newGameBoard = genGameBoard(rowCount);
      setGameState(newGameBoard);
    }
  };

  useEffect(() => {
    handleBoardSetup();
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  // - Persists redux state for next login
  const handleUserGameSave = () => {
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
        <p onClick={handleUserGameSave}>Save Game</p>
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

const mapActionsToProps = { setGameState };

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
