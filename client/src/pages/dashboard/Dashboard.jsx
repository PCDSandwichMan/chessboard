import React, { useState, useEffect } from "react";
import "./dashboard.scss";

// - Components
import Board from "../../components/dashboard/board/Board";

// - Redux
import { connect } from "react-redux";
import { setGameState } from "../../redux/actions/gameActions";
import OneConfigOptions from "../../components/dashboard/configOptions/OneConfigOptions";
import TwoConfigOptions from "../../components/dashboard/configOptions/TwoConfigOptions";

function Dashboard({ setGameState, currentPlayerTurn }) {
  const [rowCount, setRowCount] = useState(8);

  const handleSubmit = () => {
    //create 2d array
    console.log(rowCount);
    if (rowCount <= 5 || rowCount >= 16) {
      alert(
        "I intentionally limit this is the handleSubmit function of Dashboard.jsx since less than 5 and there is no game and more than 13 and the screen dies"
      );
      return;
    }

    const newGameBoard = [];
    for (let i = 0; i < rowCount; i++) {
      // * Set player one pieces
      if (i <= 1) {
        // * Set Player 1
        newGameBoard.push(
          new Array(+rowCount).fill().map((e, j) => {
            return (i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)
              ? 1
              : 0;
          })
        );
      } else if (i === rowCount - 1 || i === rowCount - 2) {
        // * Set Player 2
        newGameBoard.push(
          new Array(+rowCount).fill().map((e, j) => {
            return (i % 2 == 0 && j % 2 == 0) || (i % 2 == 1 && j % 2 == 1)
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
  };

  useEffect(() => {
    handleSubmit();
  }, []);

  return (
    <div className="dashboardView">
      <header>
        <h3>How wide should the board be?</h3>
        <div>
          <input
            type="number"
            value={rowCount}
            onChange={(e) => setRowCount(e.target.value)}
            min="5"
            max="15"
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </header>
      <main>
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
});

const mapActionsToProps = { setGameState };

export default connect(mapStateToProps, mapActionsToProps)(Dashboard);
