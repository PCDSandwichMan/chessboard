import React from "react";
import "./configOptions.scss";

// - Material
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import GitHubIcon from "@material-ui/icons/GitHub";
import AdbIcon from "@material-ui/icons/Adb";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";

// - Redux
import { connect } from "react-redux";

export const TwoConfigOptions = () => {
  return (
    <div className="configOptionsComponent">
      <h1>Player Two</h1>
      <div className=" configOptions__container">
        <h1>Colors</h1>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label="Pink"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label="Orange"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label="Purple"
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
        >
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label={<GitHubIcon />}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label={<AdbIcon />}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label={<EmojiEmotionsIcon />}
            labelPlacement="bottom"
          />
        </RadioGroup>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(TwoConfigOptions);
