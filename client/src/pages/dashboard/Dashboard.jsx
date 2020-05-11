import React, { useState } from "react";
import "./dashboard.scss";

// - Components
import Board from "../../components/board/Board";

function Dashboard() {
  const [tiles, setTiles] = useState(9);

  return (
    <div className="dashboardView">
      <input
        className="dashboardView__input"
        type="number"
        value={tiles}
        placeholder="How many squares would you like?"
        onChange={(e) => setTiles(e.target.value)}
      />
      <div>
        <Board tilesCol={tiles} />
      </div>
    </div>
  );
}

export default Dashboard;
