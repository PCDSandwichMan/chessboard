import React, { useState, useEffect } from "react";
import "./configOptions.scss";

// - Material
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import AdbIcon from "@material-ui/icons/Adb";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

// - Redux
import { connect } from "react-redux";
import { setUserConfig } from "../../../redux/actions/gameActions";
import gameReducer from "../../../redux/reducers/gameReducer";

export const TwoConfigOptions = ({ setUserConfig, playerTwoConfig }) => {
  const [playerTwoColor, setPlayerTwoColor] = useState("");
  const [playerTwoShape, setPlayerTwoShape] = useState("");

  // * Load previous state into local state
  useEffect(() => {
    setPlayerTwoColor(playerTwoConfig.selectedColor);
    setPlayerTwoShape(playerTwoConfig.selectedIcon);
  }, []);

  useEffect(() => { 
      setUserConfig(2, playerTwoColor, playerTwoShape); 
  }, [playerTwoColor, playerTwoShape]);

  return (
    <div className="configOptionsComponent">
      <h1>Player Two Options</h1>
      <div className="configOptions__container">
        <h3>Colors</h3>
        <RadioGroup
          row
          name="position"
          defaultValue="top"
          value={playerTwoColor}
          onChange={(e) => setPlayerTwoColor(e.target.name)}
        >
          <FormControlLabel
            value="pink"
            name="pink"
            control={<Radio color="primary" />}
            label="Pink"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="purple"
            name="purple"
            control={<Radio color="primary" />}
            label="Purple"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="orange"
            name="orange"
            control={<Radio color="primary" />}
            label="Orange"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </div>

      <div className="configOptions__container">
        <h3>Shapes</h3>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
          value={playerTwoShape}
          onChange={(e) => setPlayerTwoShape(e.target.name)}
        >
          <FormControlLabel
            value="gitHubIcon"
            name="gitHubIcon"
            control={<Radio color="primary" />}
            label={<GitHubIcon className="configOptions__icon" />}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="android"
            name="android"
            control={<Radio color="primary" />}
            label={<AdbIcon className="configOptions__icon" />}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="emoji"
            name="emoji"
            control={<Radio color="primary" />}
            label={<EmojiEmotionsIcon className="configOptions__icon" />}
            labelPlacement="bottom"
          />
        </RadioGroup>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerTwoConfig: state.game.playerTwoConfig,
});

const mapDispatchToProps = { setUserConfig };

export default connect(mapStateToProps, mapDispatchToProps)(TwoConfigOptions);
