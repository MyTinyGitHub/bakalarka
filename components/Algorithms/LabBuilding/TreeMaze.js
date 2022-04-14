import { number_of_rows, number_of_cols } from "../../Grid/grid";
import { MazeBuilder } from "./MazeBuilder";

export class TreeMaze extends MazeBuilder {
  constructor() {
    super();

    this.grid = [];
  }

  create_maze() {
    for (let row = 0; row < number_of_rows; row++) {
      const current_row = [];
      for (let col = 0; col < number_of_cols; col++) {
        current_row.push(1);
      }
      this.grid.push(current_row);
    }

    for (let row = 1; row < number_of_rows; row += 2) {
      for (let col = 1; col < number_of_cols; col += 2) {
        this.grid[row][col] = 0;

        const randomEvent = Math.floor(Math.random() * 10);
        if (randomEvent < 4) {
          this.clearCheckRowFirst(row, col);
        } else {
          this.clearCheckColFirst(row, col);
        }
      }
    }
    return this.grid;
  }

  isEdge(row) {
    return row - 1 >= 1;
  }

  clearCheckColFirst(row, col) {
    if (this.isEdge(col)) {
      this.clearLeftColumn(row, col);
    } else if (this.isEdge(row)) {
      this.clearRowAbove(row, col);
    }
  }

  clearCheckRowFirst(row, col) {
    if (this.isEdge(row)) {
      this.clearRowAbove(row, col);
    } else if (this.isEdge(col)) {
      this.clearLeftColumn(row, col);
    }
  }

  clearRowAbove(row, col) {
    this.grid[row - 1][col] = 0;
  }

  clearLeftColumn(row, col) {
    this.grid[row][col - 1] = 0;
  }
}
