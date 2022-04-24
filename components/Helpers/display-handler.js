import { MazeBuilder } from "../Algorithms/LabBuilding/MazeBuilder";
import { number_of_cols, number_of_rows } from "../Grid/grid";

import ControlState from "../Controller/ControlState";
import Instances from "../Instances/Instances";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export class DisplayHandler {
  constructor() {}

  static displayAlgorithm() {
    if (Instances.getAlgorithm().isEmpty()) return;

    DisplayHandler.clearAlgorithm();

    const algorithm = Instances.getAlgorithm().getAlgorithm();

    const result = algorithm.execute();
    const array = result["visited"];
    const path = result["prev"];

    if (path.length === 0) {
      Instances.getCurrentOperationText().setTextFromLocale("no-valid-path");
      return;
    }

    ControlState.getInstance().setOperational(true);

    let i = 0;
    const tick = 50;

    Instances.getCurrentOperationText().setText(
      Instances.getLanguageText().getText("searching")
    );

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

    sleep(array.length * tick).then(() => {
      Instances.getCurrentOperationText().setTextFromLocale("building-path");
    });

    sleep(array.length * tick + path.length * tick).then(() => {
      ControlState.getInstance().setOperational(false);
      Instances.getCurrentOperationText().setTextFromLocale("finished");
      setTimeout(() => {
        Instances.getCurrentOperationText().setTextFromLocale("welcome");
      }, 8000);
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

  static displayAlgorithmStepByStep(direction, position, number_of_steps) {
    if (Instances.getAlgorithm().isEmpty()) return;

    const algorithm = Instances.getAlgorithm().getAlgorithm();

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

  static reset() {
    if (Instances.getGrid().isEmpty()) return;

    for (let index_x = 0; index_x < number_of_rows; index_x++) {
      for (let index_y = 0; index_y < number_of_cols; index_y++) {
        const result_index = index_x * number_of_cols + index_y;

        if (
          document.getElementById(result_index).classList[1] === "node-wall"
        ) {
          Instances.getGrid().getGrid().clearWall(index_x, index_y);
        }
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

  static instant() {
    if (Instances.getAlgorithm().isEmpty()) return;

    const algorithm = Instances.getAlgorithm().getAlgorithm();

    const result = algorithm.execute();
    const array = result["visited"];
    const path = result["prev"];

    if (path.length === 0) {
      return;
    }

    DisplayHandler.clearAlgorithm();

    let lfinish = Instances.getFinish().getIndex();

    path.push(lfinish);
    array.forEach((node) => {
      if (document.getElementById(node) != null)
        document.getElementById(node).classList.add("node-algo");
    });

    path.forEach((node) => {
      if (document.getElementById(node) != null)
        document.getElementById(node).classList.add("node-result");
    });
  }

  static create_maze() {
    if (Instances.getMaze().isEmpty()) return;
    if (Instances.getGrid().isEmpty()) return;

    if (!(Instances.getMaze().getAlgorithm() instanceof MazeBuilder)) return;

    DisplayHandler.reset();
    DisplayHandler.clearAlgorithm();

    let maze_grid = Instances.getMaze().getAlgorithm().create();

    let start = Instances.getStart().getIndex();
    let finish = Instances.getFinish().getIndex();

    maze_grid.map((row, row_idx) => {
      row.map((col, col_idx) => {
        let index = row_idx * number_of_cols + col_idx;
        if (col === 0) {
          Instances.getGrid().getGrid().clearWall(row_idx, col_idx);
        }

        if (col === 1 && index !== start && index !== finish) {
          if (!Instances.getGrid().getGrid().isWall(row_idx, col_idx)) {
            Instances.getGrid().getGrid().setWall(row_idx, col_idx);
          }
        }
      });
    });
  }
}
