import React, { useState } from "react";
import "./dashboard.scss";

// - Components
import Board from "../../components/board/Board";

function Dashboard() {
  const [tiles, setTiles] = useState(8);

  return (
    <div className="dashboardView">
      <div className="dashboardView__input--wrapper">
        <h4>How many rows would you like?</h4>
        <input
          className="dashboardView__input"
          type="number"
          value={tiles}
          placeholder="How many squares would you like?"
          onChange={(e) => setTiles(e.target.value)}
        />
      </div>
      <div>
        <Board tilesCol={tiles} />
      </div>
    </div>
  );
}

export default Dashboard;
