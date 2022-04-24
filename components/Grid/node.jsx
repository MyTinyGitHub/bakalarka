import React, { Component } from "react";
import ControlState from "../Controller/ControlState";
import MouseMode from "../Controller/MouseMode";
import { DisplayHandler } from "../Helpers/display-handler";
import Instances from "../Instances/Instances";
export default class Node extends Component {
  constructor(props) {
    super(props);
    this.row = this.props.row;
    this.column = this.props.column;
    this.id = this.props.id;
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
    switch (MouseMode.getInstance().getMode()) {
      case "finish":
        Instances.getGrid().getGrid().setFinish(this.row, this.column, false);
        break;
      case "start":
        Instances.getGrid().getGrid().setStart(this.row, this.column, false);
        break;
      case "clear":
        Instances.getGrid().getGrid().clearWall(this.row, this.column);
        break;
      case "wall":
        Instances.getGrid().getGrid().setWall(this.row, this.column);
    }
  }

  mouseClick() {
    if (!ControlState.getInstance().isOperational()) {
      if (!this.props.isFinish && !this.props.isStart) {
        if (this.props.isWall && MouseMode.getInstance().isEqual("clear")) {
          Instances.getGrid().getGrid().clearWall(this.row, this.column);
        } else {
          Instances.getGrid().getGrid().setWall(this.row, this.column);
        }
      } else {
        DisplayHandler.instant();
      }
    }
  }

  mouseDown() {
    if (ControlState.getInstance().isOperational()) return;

    if (this.props.isFinish) {
      MouseMode.getInstance().setMode("finish");
    } else if (this.props.isStart) {
      MouseMode.getInstance().setMode("start");
    } else if (this.props.isWall) {
      MouseMode.getInstance().setMode("clear");
    } else {
      MouseMode.getInstance().setMode("wall");
    }
  }

  mouseEnter() {
    switch (MouseMode.getInstance().getMode()) {
      case "finish":
        Instances.getGrid().getGrid().setFinish(this.row, this.column, true);
        DisplayHandler.instant();
        break;
      case "start":
        Instances.getGrid().getGrid().setStart(this.row, this.column, true);
        DisplayHandler.instant();
        break;
    }
  }

  render() {
    return (
      <div
        id={this.id}
        className={this.getClassName()}
        onMouseDown={() => this.mouseDown()}
        onMouseEnter={() => this.mouseEnter()}
        onMouseLeave={() => this.mouseLeave()}
        onMouseUp={() => this.mouseClick()}
      ></div>
    );
  }
}
