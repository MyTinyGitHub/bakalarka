import { getNeigbours, buildResult } from "../HelperFunctions";
import { walls, number_of_cols, number_of_rows } from "../../Grid/grid";
import { start_col, start_row, finish_col, finish_row } from "../../Grid/grid";
import { PathFindingAlgorithm } from "./PathFindingAlgorithm";

export class Astar extends PathFindingAlgorithm {
  constructor() {
    super();

    this.prev = [];
    this.aVisited = new Set();

    this.toVisit = [];

    this.gScore = [];
    this.hScore = [];

    this.start = -1;
    this.finish = -1;

    this.found = false;
  }

  initialize() {
    this.gScore = new Array(number_of_cols * number_of_rows);
    this.hScore = new Array(number_of_cols * number_of_rows);

    this.prev = new Array(number_of_cols * number_of_rows);
    this.aVisited = new Set();

    this.toVisit = [];
    this.found = false;

    this.start = start_row * number_of_cols + start_col;
    this.finish = finish_row * number_of_cols + finish_col;

    for (let i = 0; i < number_of_cols * number_of_rows; i++) {
      this.gScore[i] = Infinity;
      this.hScore[i] = Infinity;
    }

    this.gScore[this.start] = 0;
    this.hScore[this.start] = this.calculateHScore(this.start, this.finish);
  }

  execute() {
    this.initialize();
    let node = this.start;
    this.toVisit.push(this.start);

    while (this.toVisit.length != 0 && !this.found) {
      const index_of_lowest_value = this.getIndexOfLowestFScore();
      node = this.toVisit.splice(index_of_lowest_value, 1)[0];

      if (!this.aVisited.has(node)) {
        this.aVisited.add(node);
      }

      getNeigbours(node).map((neighbour) => {
        if (this.found || this.aVisited.has(neighbour)) {
          return;
        }

        this.hScore[neighbour] = this.calculateHScore(neighbour, this.finish);

        if (this.gScore[neighbour] > this.gScore[node] + 1) {
          this.toVisit.push(neighbour);

          this.gScore[neighbour] = this.gScore[node] + 1;
          this.prev[neighbour] = node;
        }

        if (neighbour === this.finish) {
          this.found = true;
        }
      });
    }

    return buildResult(
      Array.from(this.aVisited),
      this.prev,
      this.start,
      this.finish
    );
  }

  getIndexOfLowestFScore() {
    let index_of_lowest_value = 0;
    let lowest_value = Infinity;

    for (let index = 0; index < this.toVisit.length; index++) {
      let calc_fscore =
        this.gScore[this.toVisit[index]] + this.hScore[this.toVisit[index]];

      if (lowest_value >= calc_fscore) {
        index_of_lowest_value = index;
        lowest_value = calc_fscore;
      } else if (lowest_value === calc_fscore) {
        index_of_lowest_value = index;
      }
    }
    return index_of_lowest_value;
  }

  calculateHScore(node, finish) {
    let xValue = Math.abs((node % number_of_cols) - (finish % number_of_cols));
    let yValue = Math.abs(
      Math.floor(node / number_of_cols) - Math.floor(finish / number_of_cols)
    );

    return xValue + yValue;
  }
}
