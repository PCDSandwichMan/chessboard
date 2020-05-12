import React, { useState } from "react";
import "./configOptions.scss";

// - Material
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlbumIcon from "@material-ui/icons/Album";

// - Redux
import { connect } from "react-redux";

export const OneConfigOptions = () => {
  const [playerOneColor, setPlayerOneColor] = useState("");
  const [playerOneShape, setPlayerOneShape] = useState("");

  return (
    <div className="configOptionsComponent">
      <h1>Player One</h1>
      <div className="configOptions__container">
        <h1>Colors</h1>
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
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="green"
            name="green"
            control={<Radio color="primary" />}
            label="Green"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="blue"
            name="blue"
            control={<Radio color="primary" />}
            label="Blue"
            labelPlacement="bottom"
          />
        </RadioGroup>
      </div>

      <div className="configOptions__container">
        <h1>Shapes</h1>
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
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="userIcon"
            name="userIcon"
            control={<Radio color="primary" />}
            label={<AccountCircleIcon className="configOptions__icon" />}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="album"
            name="album"
            control={<Radio color="primary" />}
            label={<AlbumIcon className="configOptions__icon" />}
            labelPlacement="bottom"
          />
        </RadioGroup>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OneConfigOptions);
