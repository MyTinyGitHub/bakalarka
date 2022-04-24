import { number_of_rows, number_of_cols } from "../../Grid/grid";
import { MazeBuilder } from "./MazeBuilder";

export class SideWinder extends MazeBuilder {
  constructor() {
    super();
  }

  create() {
    const grid = [];
    for (let row = 0; row < number_of_rows; row++) {
      const current_row = [];
      for (let col = 0; col < number_of_cols; col++) {
        current_row.push(1);
      }
      grid.push(current_row);
    }

    for (let col = 1; col < number_of_cols - 1; col++) {
      grid[1][col] = 0;
    }

    for (let row = 1; row < number_of_rows - 1; row++) {
      grid[row][number_of_cols - 2] = 0;
    }

    for (let row = 2; row < number_of_rows; row += 2) {
      let row_stack = [];
      for (let col = 1; col < number_of_cols - 2; col += 2) {
        grid[row][col] = 0;
        row_stack.push(col);

        if (Math.random() >= 0.75) {
          const i = Math.floor(Math.random() * row_stack.length);
          grid[row - 1][row_stack[i]] = 0;
          row_stack = [];
        } else {
          grid[row][col + 1] = 0;
        }
      }
    }

    return grid;
  }
}
