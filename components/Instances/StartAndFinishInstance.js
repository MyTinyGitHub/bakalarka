import ControlState from "../Controller/ControlState";
import { number_of_cols } from "../Grid/grid";

let start = null;
let finish = null;
let instance = null;

class ObjectPositions {
  constructor(x, y) {
    this.row = x;
    this.column = y;
  }

  getRow() {
    return this.row;
  }

  getColumn() {
    return this.column;
  }

  setRow(row) {
    this.row = row;
  }

  setColumn(column) {
    this.column = column;
  }

  isRowEqual(row) {
    return this.row === row;
  }

  isColumnEqual(column) {
    return this.column === column;
  }

  isEqual(row, column) {
    return this.row === row && this.column == column;
  }

  getIndex() {
    return this.row * number_of_cols + this.column;
  }

  setPositions(row, column) {
    this.row = row;
    this.column = column;

    ControlState.getInstance().isPositionChanged(true);
  }
}

export default class StartAndFinishInstance {
  constructor() {
    start = new ObjectPositions(1, 1);
    finish = new ObjectPositions(1, 2);
  }

  static getStart() {
    if (instance === null) {
      instance = new StartAndFinishInstance();
    }
    return start;
  }

  static getFinish() {
    if (instance === null) {
      instance = new StartAndFinishInstance();
    }
    return finish;
  }
}
