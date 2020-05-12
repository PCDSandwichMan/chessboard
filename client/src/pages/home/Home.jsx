import React, { useState } from "react";
import "./home.scss";

// - Components
import Login from "../../components/home/forms/login/Login";
import Register from "../../components/home/forms/register/Register";

function Home() {
  const [pageState, setPageState] = useState("login");

  return (
    <div className="homeView">
      {pageState === "login" ? (
        <Login setPageState={setPageState} />
      ) : (
        <Register setPageState={setPageState} />
      )}
    </div>
  );
}

export default Home;