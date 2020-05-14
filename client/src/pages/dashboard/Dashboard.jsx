import React, { useState, useEffect } from "react";
import "./dashboard.scss";
// - Http
import axios from "axios";
import constants from "../../redux/constants";
// - Utils
import { genGameBoard } from "../../util/helpers";
// - Material
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// - Components
import Board from "../../components/dashboard/board/Board.jsx";
import OneConfigOptions from "../../components/dashboard/configOptions/OneConfigOptions.jsx";
import TwoConfigOptions from "../../components/dashboard/configOptions/TwoConfigOptions.jsx";
import { BoardSizeInput } from "../../components/dashboard/boardSizeInput/BoardSizeInput";
// - Redux
import { connect } from "react-redux";
import {
  setGameState,
  setExistingState,
  setUserConfig,
  clearStore,
} from "../../redux/actions/gameActions";

function Dashboard({
  setGameState,
  history,
  state,
  boardState,
  currentPlayerTurn,
  playerOneConfig,
  playerTwoConfig,
  setExistingState,
  setUserConfig,
  clearStore,
}) {
  const [rowCount, setRowCount] = useState(8);

  const handleBoardSetup = async (isNew) => {
    // - This can be removed, however, as described it does not look great and will crash if over 40 tiles in width are requested (tested on 2017 MacBook Air)
    if (rowCount < 5 || rowCount >= 18) {
      alert(
        "I intentionally limit this in the handleBoardSetup() function of pages/dashboard/Dashboard.jsx since having less than 5 tiles wide and there is no game and more than 17 and the screen dies"
      );
      return;
    }

    // - Creates a new board if one is not in state or the user is creating a new board |this runs on mount as well|
    if (!boardState.length || isNew) {
      // * creates a 2d array with player 1 and play 2 reset
      const newGameBoard = genGameBoard(rowCount);
      await setGameState(newGameBoard);
      handleUserGameSave(newGameBoard);
    }
  };

  useEffect(() => {
    // - Handles the requirement for refreshing the board state on refresh
    axios
      .get(`${constants.BASE_URL}/user/state`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        const { game } = data.state;
        setExistingState(game);
        if (!game.boardState.length) {
          handleBoardSetup(true);
        }
        if (
          !game.playerOneConfig.selectedColor ||
          !game.playerOneConfig.selectedIcon
        ) {
          setUserConfig(1, "red", "default");
        }
        if (
          !game.playerTwoConfig.selectedColor ||
          !game.playerTwoConfig.selectedIcon
        ) {
          setUserConfig(2, "grey", "default");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    clearStore();
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
        <h3>Checkerboard Challenge</h3>
        <div className="dashboard__logout" onClick={handleLogout}>
          <ExitToAppIcon className="dashboard__logout__icon" />
        </div>
      </header>
      <main className="dashboard__main">
        <div className="dashboard__mainLeft">
          <BoardSizeInput
            handleLogout={handleLogout}
            rowCount={rowCount}
            setRowCount={setRowCount}
            handleBoardSetup={handleBoardSetup}
            handleUserGameSave={handleUserGameSave}
          />
          <OneConfigOptions />
          <TwoConfigOptions />
        </div>
        <div className="dashboard__mainRight">
          <div
            style={{
              background:
                currentPlayerTurn === 1
                  ? playerOneConfig.selectedColor
                  : playerTwoConfig.selectedColor,
            }}
            className="dashboard__mainRight__ttl"
          >
            <h3>
              {currentPlayerTurn === 1 ? "Player one" : "Player two"} it's your
              turn
            </h3>
          </div>
          <div className="dashboard__mainRight__board">
            <Board />
          </div>
        </div>
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

const mapActionsToProps = {
  setGameState,
  setExistingState,
  setUserConfig,
  clearStore,
};

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
