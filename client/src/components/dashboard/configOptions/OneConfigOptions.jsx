import React, { useState, useEffect } from "react";
import "./configOptions.scss";

// - Material
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlbumIcon from "@material-ui/icons/Album";

// - Redux
import { connect } from "react-redux";
import { setUserConfig } from "../../../redux/actions/gameActions";

export const OneConfigOptions = ({ setUserConfig, playerOneConfig }) => {
  const [playerOneColor, setPlayerOneColor] = useState("");
  const [playerOneShape, setPlayerOneShape] = useState("");

  // * Load previous state into local state
  useEffect(() => { 
    setPlayerOneShape(playerOneConfig.selectedIcon);
    setPlayerOneColor(playerOneConfig.selectedColor);
  }, [playerOneConfig]);

  useEffect(() => {
    setUserConfig(1, playerOneColor, playerOneShape);
  }, [playerOneColor, playerOneShape]);

  return (
    <div className="configOptionsComponent">
      <h1>Player One Options</h1>
      <div className="configOptions__container">
        <h3>Colors: </h3>
        <RadioGroup
          row
          name="position"
          defaultValue="top"
          value={playerOneColor}
          onChange={(e) => setPlayerOneColor(e.target.name)}
        >
          <FormControlLabel
            value="red"
            name="red"
            control={<Radio color="primary" />}
            label="Red"
          />
          <FormControlLabel
            value="green"
            name="green"
            control={<Radio color="primary" />}
            label="Green"
          />
          <FormControlLabel
            value="blue"
            name="blue"
            control={<Radio color="primary" />}
            label="Blue"
          />
        </RadioGroup>
      </div>

      <div className="configOptions__container">
        <h3>Shapes: </h3>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
          value={playerOneShape}
          onChange={(e) => setPlayerOneShape(e.target.name)}
        >
          <FormControlLabel
            value="star"
            name="star"
            control={<Radio color="primary" />}
            label={<StarsIcon className="configOptions__icon" />}
          />
          <FormControlLabel
            value="userIcon"
            name="userIcon"
            control={<Radio color="primary" />}
            label={<AccountCircleIcon className="configOptions__icon" />}
          />
          <FormControlLabel
            value="album"
            name="album"
            control={<Radio color="primary" />}
            label={<AlbumIcon className="configOptions__icon" />}
          />
        </RadioGroup>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  playerOneConfig: state.game.playerOneConfig,
});

const mapDispatchToProps = { setUserConfig };

export default connect(mapStateToProps, mapDispatchToProps)(OneConfigOptions);
