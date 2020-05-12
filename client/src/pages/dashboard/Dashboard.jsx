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

function Dashboard({ setGameState, currentPlayerTurn, history, state, boardState }) {
  
  const [rowCount, setRowCount] = useState(8);

  const handleBoardSetup = () => {
    if (rowCount <= 5 || rowCount >= 16) {
      alert(
        "I intentionally limit this is the handleBoardSetup function of Dashboard.jsx since less than 5 and there is no game and more than 13 and the screen dies"
      );
      return;
    }

    if (!boardState.length) {
      const newGameBoard = [];
      for (let i = 0; i < rowCount; i++) {
        // * Set player one pieces
        if (i <= 1) {
          // * Set Player 1
          newGameBoard.push(
            new Array(+rowCount).fill().map((e, j) => {
              return (i % 2 === 0 && j % 2 === 0) ||
                (i % 2 === 1 && j % 2 === 1)
                ? 1
                : 0;
            })
          );
        } else if (i === rowCount - 1 || i === rowCount - 2) {
          // * Set Player 2
          newGameBoard.push(
            new Array(+rowCount).fill().map((e, j) => {
              return (i % 2 === 0 && j % 2 === 0) ||
                (i % 2 === 1 && j % 2 === 1)
                ? 2
                : 0;
            })
          );
        } else {
          // * Set Empty
          newGameBoard.push(new Array(+rowCount).fill().map((e) => 0));
        }
      }
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

  const handleUserGameSave = () => {
    console.log(state);
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
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  };

  return (
    <div className="dashboardView">
      <header>
        <div className="dashboard__logout" onClick={handleLogout}>
          <ExitToAppIcon className="dashboard__logout__icon" />
        </div>
        <div>
          <TextField
            label="How wide do you want your board to be?"
            color="primary"
            variant="outlined"
            value={rowCount}
            onChange={(e) => setRowCount(e.target.value)}
            type="number"
            className="dashboardView__input"
          />
          <Button onClick={handleBoardSetup} variant="outlined" color="primary">
            Create New Board
          </Button>
        </div>
      </header>
      <main className="dashboard__main">
        <p onClick={handleUserGameSave}>Save Game</p>
        <OneConfigOptions />
        <section>
          <div
            className={`
            dashboardView__mainTtl
            ${
              currentPlayerTurn === 1
                ? "dashboardView__mainTtl--playerOne"
                : "dashboardView__mainTtl--playerTwo"
            }
            `}
          >
            <h1>Player {currentPlayerTurn === 1 ? "One" : "Two"}</h1>
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
  boardState: state.game.boardState,
  state: state,
});

const mapActionsToProps = { setGameState };

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
