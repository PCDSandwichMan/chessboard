import React, { Component } from "react";
import { connect } from "react-redux";

export const Tile = () => {
  return (
    <div>
      <h1>Tile</h1>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Tile);
