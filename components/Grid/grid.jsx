import React, { Component } from "react";
import Node from "./node";
import { UINavbar } from "../UI/drop-down-menu";
import classes from "./Grid.module.css";

import { DisplayHandler } from "../Helpers/display-handler";

import MouseMode from "../Controller/MouseMode";
import Instances from "../Instances/Instances";
import CurrentOperation from "../UI/current-operation";

export let number_of_rows = 16;
export let number_of_cols = 16;

export const walls = new Set();

const setWallBool = (Grid, r, c, value) =>
  Grid.map((row, rowIdx) =>
    rowIdx === r
      ? row.map((column, columnIdx) =>
          columnIdx === c
            ? {
                ...column,
                isWall: value,
              }
            : column
        )
      : row
  );

const setWall = (Grid, r, c) =>
  Grid.map((row, rowIdx) =>
    rowIdx === r
      ? row.map((column, columnIdx) =>
          columnIdx === c
            ? {
                ...column,
                isWall: !column.isWall,
              }
            : column
        )
      : row
  );

const setFinish = (Grid, r, c, value) =>
  Grid.map((row, rowIdx) =>
    rowIdx === r
      ? row.map((column, columnIdx) =>
          columnIdx === c
            ? {
                ...column,
                isFinish: value,
              }
            : column
        )
      : row
  );

const setStart = (Grid, r, c, value) =>
  Grid.map((row, rowIdx) =>
    rowIdx === r
      ? row.map((column, columnIdx) =>
          columnIdx === c
            ? {
                ...column,
                isStart: value,
              }
            : column
        )
      : row
  );

export default class GridClass extends Component {
  constructor() {
    super();

    this.state = {
      grid: [],
    };

    Instances.getGrid().setGrid(this);

    this.mouse_down = this.mouse_down.bind(this);
    this.mouseUp = this.mouse_up.bind(this);
    this.changeStartAndFinishPosition =
      this.changeStartAndFinishPosition.bind(this);

    this.setWall = function setWall(row, col) {
      walls.add(row * number_of_cols + col);

      this.setState((state) => ({
        grid: setWallBool(state.grid, row, col, true),
      }));
    }.bind(this);

    this.clearWall = function clearWall(row, col) {
      walls.delete(row * number_of_cols + col);
      this.setState((state) => ({
        grid: setWallBool(state.grid, row, col, false),
      }));
    }.bind(this);

    this.toggleWall = function toggleWall(row, col) {
      if (walls.has(row * number_of_cols + col)) {
        walls.delete(row * number_of_cols + col);
      } else {
        walls.add(row * number_of_cols + col);
      }

      this.setState((state) => ({
        grid: setWall(state.grid, row, col),
      }));
    }.bind(this);

    this.isWall = function isWall(row, col) {
      return walls.has(row * number_of_cols + col);
    };

    this.setFinish = function toggleFinish(row, col, value) {
      if (value === true) this.changeStartAndFinishPosition("finish", row, col);

      this.setState((state) => ({
        grid: setFinish(state.grid, row, col, value),
      }));

      DisplayHandler.instant();
    }.bind(this);

    this.setStart = function toggleStart(row, col, value) {
      if (value == true) this.changeStartAndFinishPosition("start", row, col);

      this.setState((state) => ({
        grid: setStart(state.grid, row, col, value),
      }));

      DisplayHandler.instant();
    }.bind(this);
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

  componentDidMount() {
    number_of_rows = Math.floor((window.innerHeight - 200) / 32);
    number_of_cols = Math.floor(window.innerWidth / 32);
    document.documentElement.style.setProperty("--grid-size", number_of_cols);

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

  create_grid() {
    let grid = [];
    for (let row = 0; row < number_of_rows; row++) {
      let current_row = [];

      for (let column = 0; column < number_of_cols; column++) {
        current_row.push({
          isWall: false,
          isFinish: Instances.getFinish().isEqual(row, column),
          isStart: Instances.getStart().isEqual(row, column),
        });
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
              {this.state.grid.map((row, rowIdx) => {
                return row.map((column, columnIdx) => {
                  const { isWall, isFinish, isStart } = column;

                  return (
                    <Node
                      row={rowIdx}
                      column={columnIdx}
                      key={rowIdx * number_of_cols + columnIdx}
                      id={rowIdx * number_of_cols + columnIdx}
                      isWall={isWall}
                      isFinish={isFinish}
                      isStart={isStart}
                    ></Node>
                  );
                });
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
