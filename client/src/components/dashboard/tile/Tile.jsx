import React from "react";
import "./tile.scss";

// - Redux
import { connect } from "react-redux";

export const Tile = ({ playerValue, row, column }) => {
  return <div className="tileComponent">{playerValue}</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
