import React, { Component } from "react";
import Node from "./node";
import { UINavbar } from "../UI/drop-down-menu";
import classes from "./Grid.module.css";

import { DisplayHandler } from "../Helpers/display-handler";

import MouseMode from "../Controller/MouseMode";
import Instances from "../Instances/Instances";
import CurrentOperation from "../UI/current-operation";
import WeightController from "../Controller/WeightController";
import { ColumnResize } from "@progress/kendo-react-data-tools";

export let number_of_rows = 16;
export let number_of_cols = 16;

export const walls = new Set();
export const nodes = [];

export default class GridClass extends Component {
  constructor() {
    super();

    this.state = {
      grid: [],
    };

    Instances.getGrid().setGrid(this);
  }

  componentDidMount() {
    number_of_rows = Math.floor((window.innerHeight - 200) / 32);
    number_of_cols = Math.floor(window.innerWidth / 32);

    document.documentElement.style.setProperty("--grid-size", number_of_cols);

    for (let i = 0; i < number_of_cols * number_of_rows; i++) {
      WeightController.getInstance().setConcreteWeightOnIndex(i, 1);
    }

    Instances.getGrid().setRows(number_of_rows);
    Instances.getGrid().setColumns(number_of_cols);

    this.setState({
      grid: this.create_grid(),
    });
  }

  mouse_down(e) {
    e.preventDefault();
  }

  mouse_up(e) {
    MouseMode.getInstance().setMode("");
  }

  mouse_leave(e) {
    if (MouseMode.getInstance().isEqual("wall")) {
      MouseMode.getInstance().setMode("");
    }
  }

  clearWall() {
    this.state.grid.map((row, rowIdx) => {
      return row.map((column) => {
        column.setWall();
      });
    });
  }

  create_grid() {
    let grid = [];
    for (let row = 0; row < number_of_rows; row++) {
      let current_row = [];

      for (let column = 0; column < number_of_cols; column++) {
        current_row.push(
          <Node
            row={row}
            column={column}
            key={row * number_of_cols + column}
            id={row * number_of_cols + column}
            isWall={false}
            isFinish={Instances.getFinish().isEqual(row, column)}
            isStart={Instances.getStart().isEqual(row, column)}
          ></Node>
        );
      }
      grid.push(current_row);
    }
    return grid;
  }

  render() {
    return (
      <>
        <UINavbar></UINavbar>
        <CurrentOperation></CurrentOperation>

        <div onMouseDown={(e) => this.mouse_down(e)}>
          <div onMouseUp={(e) => this.mouse_up(e)}>
            <div
              onMouseLeave={(e) => this.mouse_leave(e)}
              className={classes.grid}
            >
              {this.state.grid.map((row) => {
                return row.map((node) => {
                  return node;
                });
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
