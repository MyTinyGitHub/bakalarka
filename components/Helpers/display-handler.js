import { MazeBuilder } from "../Algorithms/LabBuilding/MazeBuilder";
import { number_of_cols, number_of_rows } from "../Grid/grid";
import { step_position } from "../UI/drop-down-menu";
import { start_col, start_row, finish_col, finish_row } from "../Grid/grid";
export class DisplayHandler {
  constructor() {}

  static displayAlgorithm(algorithm) {
    if (algorithm == null) return;

    const result = algorithm.execute();
    const array = result["visited"];
    const path = result["prev"];

    if (path.length === 0) {
      return;
    }

    DisplayHandler.clearAlgorithm();

    let i = 0;
    const tick = 50;

    array.forEach((node) => {
      setTimeout(() => {
        document.getElementById(node).classList.add("node-algo");
      }, tick * ++i);
    });

    path.forEach((node) => {
      setTimeout(() => {
        document.getElementById(node).classList.add("node-result");
      }, tick * ++i);
    });
  }

  static addToAlgorithm(array, path, position) {
    if (position < array.length) {
      document.getElementById(array[position]).classList.add("node-algo");
      return position + 1;
    }

    if (position >= array.length && position < path.length + array.length) {
      let temp_position = position - array.length;
      document.getElementById(path[temp_position]).classList.add("node-result");
      return position + 1;
    }
    return position;
  }

  static displayAlgorithmStepByStep(
    direction,
    algorithm,
    position,
    number_of_steps
  ) {
    if (algorithm == null) return;

    const result = algorithm.execute();
    const array = result["visited"];
    const path = result["prev"];

    switch (direction) {
      case "back":
        if (position - number_of_steps < 0) {
          number_of_steps = position;
        }

        for (let i = 0; i < number_of_steps; i++) {
          position = DisplayHandler.removeFromAlgorithm(array, path, position);
        }
        break;
      case "next":
        if (position + number_of_steps > array.length + path.length) {
          number_of_steps = array.length + path.length - position;
        }

        for (let i = 0; i < number_of_steps; i++) {
          position = DisplayHandler.addToAlgorithm(array, path, position);
        }
        break;
      default:
        return position;
    }
    return position;
  }

  static removeFromAlgorithm(array, path, position) {
    if (position > 0) {
      position--;
    }

    if (position < array.length) {
      DisplayHandler.clearOneSquare(array[position]);
      return position;
    }
    if (position >= array.length && position < path.length + array.length) {
      const temp_position = position - array.length;
      DisplayHandler.clearOneSquarePath(path[temp_position]);
      return position;
    }
  }

  static reset(grid) {
    for (let index_x = 0; index_x < number_of_rows; index_x++) {
      for (let index_y = 0; index_y < number_of_cols; index_y++) {
        const result_index = index_x * number_of_cols + index_y;

        if (document.getElementById(result_index).classList[1] === "node-wall")
          document.getElementById(result_index).className = "node";

        grid.clearWall(index_x, index_y);
      }
    }
  }

  static clearOneSquare(node_index) {
    if (document.getElementById(node_index).classList.contains("node-finish")) {
      document.getElementById(node_index).className = "node node-finish";
    }
    if (document.getElementById(node_index).classList.contains("node-start")) {
      document.getElementById(node_index).className = "node node-start";
    }
    if (document.getElementById(node_index).classList.contains("node-algo")) {
      document.getElementById(node_index).className = "node";
    }
  }

  static clearOneSquarePath(node_index) {
    if (document.getElementById(node_index).classList.contains("node-finish")) {
      document.getElementById(node_index).className = "node node-finish";
    }
    if (document.getElementById(node_index).classList.contains("node-start")) {
      document.getElementById(node_index).className =
        "node node-algo node-start";
    }
    if (document.getElementById(node_index).classList.contains("node-result")) {
      document.getElementById(node_index).className = "node node-algo";
    }
  }

  static clearAlgorithm() {
    for (let index_x = 0; index_x < number_of_rows; index_x++) {
      for (let index_y = 0; index_y < number_of_cols; index_y++) {
        let result_index = index_x * number_of_cols + index_y;
        DisplayHandler.clearOneSquare(result_index);
      }
    }
  }

  static instant(algorithm) {
    if (algorithm == null) return;
    step_position = 0;

    const result = algorithm.execute();
    const array = result["visited"];
    const path = result["prev"];

    if (path.length === 0) {
      return;
    }

    DisplayHandler.clearAlgorithm();
    let lstart = start_row * number_of_cols + start_col;
    let lfinish = finish_row * number_of_cols + finish_col;

    path.push(lfinish);
    array.forEach((node) => {
      document.getElementById(node).classList.add("node-algo");
    });

    path.forEach((node) => {
      document.getElementById(node).classList.add("node-result");
    });
  }

  static create_maze(grid, maze) {
    if (maze === null) return;
    DisplayHandler.clearAlgorithm();

    if (!(maze instanceof MazeBuilder)) return;

    let maze_grid = maze.create_maze();

    let start = -1;
    let finish = -1;

    for (let i = 0; i < number_of_cols * number_of_rows; i++) {
      let node_element = document.getElementById(i).classList[i];

      if (node_element === "node-start") {
        start = i;
      }

      if (node_element === "node-finish") {
        finish = i;
      }
    }

    maze_grid.map((row, row_idx) => {
      row.map((col, col_idx) => {
        let index = row_idx * number_of_cols + col_idx;
        if (col === 0) {
          grid.clearWall(row_idx, col_idx);
        }

        if (col === 1 && index !== start && index !== finish) {
          if (!grid.isWall(row_idx, col_idx)) {
            grid.setWall(row_idx, col_idx);
          }
        }
      });
    });
  }
}
