import React, { useState } from "react";
import "./home.scss";

// - Components
import Login from "../../components/home/forms/login/Login.jsx";
import Register from "../../components/home/forms/register/Register.jsx";

function Home() {
  const [pageState, setPageState] = useState("login");

  const drivenImages = [
    "https://static.wixstatic.com/media/cfd4c6_7652149ff9d14692aeb9507504bbc55e~mv2.png/v1/fill/w_208,h_208,al_c,q_85,usm_0.66_1.00_0.01/drvd-distribution.webp",
    "https://static.wixstatic.com/media/cfd4c6_0c2cfd1a44dd49989c59a48ad0bb5e22~mv2.png/v1/fill/w_213,h_208,al_c,q_85,usm_0.66_1.00_0.01/gr-white.webp",
    "https://static.wixstatic.com/media/cfd4c6_a0ab9b83b0d44ef898787f02c91893ce~mv2.png/v1/fill/w_208,h_208,al_c,q_85,usm_0.66_1.00_0.01/budee-white.webp",
    "https://static.wixstatic.com/media/cfd4c6_6e7b7479e5f84c7a8ef68a2a84494bd0~mv2.png/v1/fill/w_208,h_208,al_c,q_85,usm_0.66_1.00_0.01/fbg-white.webp",
    "https://static.wixstatic.com/media/cfd4c6_3ca91e8177454c9cbfc4ec51f87ac61d~mv2.png/v1/fill/w_211,h_208,al_c,q_85,usm_0.66_1.00_0.01/mhr-white.webp",
    "https://static.wixstatic.com/media/cfd4c6_d82ad5682d324bbeb84ae7a4aadcd687~mv2.png/v1/fill/w_208,h_208,al_c,q_85,usm_0.66_1.00_0.01/weedwaves-white.webp",
  ];

  return (
    <div className="homeView" data-test="view-home">
      <div className="home__background">
        <img src={drivenImages[0]} alt="driven business units logos" />
        <img src={drivenImages[1]} alt="driven business units logos" />
        <img src={drivenImages[2]} alt="driven business units logos" />
        <img src={drivenImages[3]} alt="driven business units logos" />
        <img src={drivenImages[4]} alt="driven business units logos" />
        <img src={drivenImages[5]} alt="driven business units logos" />
      </div>
      <main>
        {pageState === "login" ? (
          <Login setPageState={setPageState} />
        ) : (
          <Register setPageState={setPageState} />
        )}
      </main>
    </div>
  );
}

export default Home;
