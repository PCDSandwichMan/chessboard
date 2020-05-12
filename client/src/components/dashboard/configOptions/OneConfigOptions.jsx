import React from "react";
import "./configOptions.scss";

// - Material
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import StarsIcon from "@material-ui/icons/Stars";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlbumIcon from "@material-ui/icons/Album";

// - Redux
import { connect } from "react-redux";

export const OneConfigOptions = () => {
  return (
    <div className="configOptionsComponent">
      <h1>Player One</h1>
      <div className="configOptions__container">
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
            label="Red"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label="Green"
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="bottom"
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
        >
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label={<StarsIcon />}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label={<AccountCircleIcon />}
            labelPlacement="bottom"
          />
          <FormControlLabel
            value="bottom"
            control={<Radio color="primary" />}
            label={<AlbumIcon />}
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
