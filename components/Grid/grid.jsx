import React, { Component } from "react";
import Node from "./node";
import Navbar from "../UI/navbar";
import classes from "./Grid.module.css";

import { DisplayHandler } from "../Helpers/display-handler";
import { AlgorithmHandler } from "../Helpers/algorithm-handler";

export let number_of_rows = 16;
export let number_of_cols = 16;
export const walls = new Set();

export let start_row = 1;
export let start_col = 1;

export let finish_row = 2;
export let finish_col = 1;

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
      mouseMode: "",
      seconds: 0,
    };

    this.set_mouse_state = this.set_mouse_state.bind(this);
    this.mouse_down = this.mouse_down.bind(this);
    this.mouseUp = this.mouse_up.bind(this);

    this.result = [];
    this.array = [];
    this.path = [];

    this.algorithm = null;
    this.maze = null;

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

    this.toggleFinish = function toggleFinish(row, col, value) {
      if (value === true) {
        finish_col = col;
        finish_row = row;

        DisplayHandler.clearAlgorithm();
        DisplayHandler.instant(this.algorithm);
      }

      this.setState((state) => ({
        grid: setFinish(state.grid, row, col, value),
      }));
    }.bind(this);

    this.toggleStart = function toggleStart(row, col, value) {
      if (value == true) {
        start_col = col;
        start_row = row;

        DisplayHandler.clearAlgorithm();
        DisplayHandler.instant(this.algorithm);
      }

      this.setState((state) => ({
        grid: setStart(state.grid, row, col, value),
      }));
    }.bind(this);
  }

  componentDidMount() {
    number_of_rows = Math.floor((window.innerHeight - 200) / 32);
    number_of_cols = Math.floor(window.innerWidth / 32);
    document.documentElement.style.setProperty("--grid-size", number_of_cols);

    this.setState({
      grid: this.create_grid(),
    });
  }

  mouse_down(e) {
    e.preventDefault();
  }

  mouse_up(e) {
    this.setState({
      mouseMode: "",
    });
  }

  mouse_leave(e) {
    if (this.state.mouseMode == "wall") {
      this.mouse_up("false");
    }
  }

  set_mouse_state(state) {
    this.setState({
      mouseMode: state,
    });
  }

  create_grid() {
    let grid = [];
    for (let row = 0; row < number_of_rows; row++) {
      let current_row = [];

      for (let column = 0; column < number_of_cols; column++) {
        current_row.push({
          isWall: false,
          isFinish: finish_row === row && finish_col === column,
          isStart: start_row === row && start_col === column,
        });
      }
      grid.push(current_row);
    }
    return grid;
  }

  render() {
    return (
      <>
        <Navbar
          reset={() => DisplayHandler.reset(this)}
          display={() => DisplayHandler.displayAlgorithm(this.algorithm)}
          calculate={(e) => {
            this.algorithm = AlgorithmHandler.calculateAlgorithm(e);
          }}
          calculate_maze={(e) => {
            this.maze = AlgorithmHandler.determine_maze(e);
          }}
          display_maze={() => DisplayHandler.create_maze(this, this.maze)}
          clearAlgorithm={() => {
            DisplayHandler.clearAlgorithm();
          }}
          displayStepByStep={(direction, position, step) =>
            DisplayHandler.displayAlgorithmStepByStep(
              direction,
              this.algorithm,
              position,
              step
            )
          }
        ></Navbar>

        <div onMouseDown={(e) => this.mouse_down(e)}>
          <div onMouseUp={(e) => this.mouse_up(e)} className={classes.griddiv}>
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
                      mouseMode={this.state.mouseMode}
                      setMouseState={this.set_mouse_state}
                      setWall={this.toggleWall}
                      setFinish={this.toggleFinish}
                      setStart={this.toggleStart}
                      wallSet={walls}
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
