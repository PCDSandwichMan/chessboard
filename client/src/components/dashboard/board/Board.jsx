import React, { Component } from "react";
import "./board.scss";

// - Redux
import { connect } from "react-redux";

export class Board extends Component {
  render() {
    return (
      <div className="boardComponent">
        <p>Board</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
