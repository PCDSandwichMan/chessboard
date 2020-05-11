import React, { useState } from "react";
import "./dashboard.scss";

// - Components
import Board from "../../components/board/Board";

function Dashboard() {
  const [tiles, setTiles] = useState(0);

  return (
    <div>
      <form action="">
        <input
          type="number"
          value={tiles}
          onChange={(e) => setTiles(e.target.value)}
        />
      </form>
      <div>
        <Board tilesCol={tiles} />
      </div>
    </div>
  );
}

export default Dashboard;
