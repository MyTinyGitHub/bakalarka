import React, { Component } from "react";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      row: this.props.row,
      column: this.props.column,
      id: this.props.id,
    };
  }

  getClassName() {
    return this.props.isFinish
      ? "node node-finish"
      : this.props.isStart
      ? "node node-start"
      : this.props.isWall
      ? "node node-wall"
      : "node";
  }

  mouseLeave() {
    if (this.props.isFinish && this.props.mouseMode === "finish") {
      this.props.setFinish(this.state.row, this.state.column, false);
      return;
    }

    if (this.props.isStart && this.props.mouseMode === "start") {
      this.props.setStart(this.state.row, this.state.column, false);
      return;
    }

    if (this.props.mouseMode === "wall") {
      this.props.setWall(this.state.row, this.state.column);
    }
  }

  mouseClick() {
    if (!this.props.isFinish && !this.props.isStart) {
      this.props.setWall(this.state.row, this.state.column);
    }
  }

  mouseDown() {
    if (this.props.isFinish) {
      this.props.setMouseState("finish");
    } else if (this.props.isStart) {
      this.props.setMouseState("start");
    } else {
      this.props.setMouseState("wall");
    }
  }

  mouseEnter() {
    if (this.props.mouseMode === "finish") {
      this.props.setFinish(this.state.row, this.state.column, true);
      return;
    }

    if (this.props.mouseMode === "start") {
      this.props.setStart(this.state.row, this.state.column, true);
      return;
    }
  }

  render() {
    return (
      <div
        id={this.state.id}
        className={this.getClassName()}
        onMouseDown={() => this.mouseDown()}
        onMouseEnter={() => this.mouseEnter()}
        onMouseLeave={() => this.mouseLeave()}
        onMouseUp={() => this.mouseClick()}
      ></div>
    );
  }
}
