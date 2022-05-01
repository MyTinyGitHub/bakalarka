import React, { Component } from "react";
import ControlState from "../Controller/ControlState";
import MouseMode from "../Controller/MouseMode";
import WeightController from "../Controller/WeightController";
import { DisplayHandler } from "../Helpers/display-handler";
import Instances from "../Instances/Instances";
import { nodes, walls } from "./grid";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weight: 1,
      finish: this.props.isFinish,
      start: this.props.isStart,
      wall: false,
    };

    this.row = this.props.row;
    this.column = this.props.column;
    this.id = this.props.id;
    nodes[this.id] = this;
  }

  getClassName() {
    return this.state.finish
      ? "node node-finish"
      : this.state.start
      ? "node node-start"
      : this.state.wall
      ? "node node-wall"
      : "node";
  }

  isWall() {
    return this.state.wall;
  }

  isFinish() {
    return this.state.finish;
  }

  isStart() {
    return this.state.start;
  }

  clearWall() {
    walls.delete(this.props.id);
    this.setState((state) => ({
      ...state,
      wall: false,
      weight: 1,
    }));
  }

  setWallOrWeight() {
    switch (WeightController.getInstance.getWeight()) {
      case Instances.getLanguageText().getText("select-weight"):
        this.setWall();
        break;
      default:
        this.setWeight();
    }
  }

  setWeight() {
    WeightController.getInstance().setWeightOnIndex(this.id);
    this.setState((state) => ({
      ...state,
      wall: false,
      weight: WeightController.getInstance().getWeight(),
    }));
  }

  setWall() {
    if (this.state != null) {
      walls.add(this.props.id);
      this.setState((state) => ({
        ...state,
        wall: true,
        weight: 1,
      }));
    }
  }

  getWeight() {
    return " weight" + this.state.weight;
  }

  changeStartAndFinishPosition(type, row, col) {
    switch (type) {
      case "start":
        Instances.getStart().setPositions(row, col);
        break;
      case "finish":
        Instances.getFinish().setPositions(row, col);
        break;
    }
  }

  mouseLeave() {
    switch (MouseMode.getInstance().getMode()) {
      case "finish":
        this.setState((state) => ({
          ...state,
          finish: false,
        }));
        break;

      case "start":
        this.setState((state) => ({
          ...state,
          start: false,
        }));
        break;

      case "clear":
        walls.delete(this.props.id);
        this.setState((state) => ({
          ...state,
          wall: false,
        }));
        break;

      case "wall":
        this.setWall();
    }
  }

  mouseClick() {
    if (!ControlState.getInstance().isOperational()) {
      if (!this.state.finish && !this.state.start) {
        if (MouseMode.getInstance().isEqual("clear")) {
          walls.delete(this.props.id);
          this.setState((state) => ({
            ...state,
            wall: false,
          }));
        } else {
          this.setWall();
        }
      } else {
        DisplayHandler.instant();
      }
    }
  }

  mouseDown() {
    if (ControlState.getInstance().isOperational()) return;

    if (this.state.finish) {
      MouseMode.getInstance().setMode("finish");
    } else if (this.state.start) {
      MouseMode.getInstance().setMode("start");
    } else if (this.state.wall) {
      MouseMode.getInstance().setMode("clear");
    } else {
      MouseMode.getInstance().setMode("wall");
    }
  }

  mouseEnter() {
    switch (MouseMode.getInstance().getMode()) {
      case "finish":
        this.changeStartAndFinishPosition("finish", this.row, this.column);
        this.setState((state) => ({
          ...state,
          finish: true,
        }));

        DisplayHandler.instant();
        break;
      case "start":
        this.changeStartAndFinishPosition("start", this.row, this.column);
        this.setState((state) => ({
          ...state,
          start: true,
        }));
        DisplayHandler.instant();
        break;
    }
  }

  render() {
    return (
      <div
        id={this.id}
        className={this.getClassName() + this.getWeight()}
        onMouseDown={() => this.mouseDown()}
        onMouseEnter={() => this.mouseEnter()}
        onMouseLeave={() => this.mouseLeave()}
        onMouseUp={() => this.mouseClick()}
      ></div>
    );
  }
}
