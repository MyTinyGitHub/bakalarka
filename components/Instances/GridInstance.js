let instance = null;

export default class GridInstance {
  constructor() {
    this.grid = null;

    this.columns = 0;
    this.rows = 0;
  }

  setGrid(grid) {
    this.grid = grid;
  }

  getGrid() {
    return this.grid;
  }

  isEmpty() {
    return this.grid === null;
  }

  setColumns(columns) {
    this.columns = columns;
  }

  setRows(rows) {
    this.rows = rows;
  }

  getColumns() {
    return this.columns;
  }

  getRows() {
    return this.rows;
  }

  size() {
    return this.rows * this.columns;
  }

  static getInstance() {
    if (instance == null) {
      instance = new GridInstance();
    }

    return instance;
  }
}
