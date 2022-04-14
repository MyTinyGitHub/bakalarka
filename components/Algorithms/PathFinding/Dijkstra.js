import { getNeigbours, buildResult } from "../HelperFunctions";
import { walls, number_of_cols, number_of_rows } from "../../Grid/grid";
import { start_col, start_row, finish_col, finish_row } from "../../Grid/grid";
import { PathFindingAlgorithm } from "./PathFindingAlgorithm";

export class Dijkstra extends PathFindingAlgorithm {
  constructor() {
    super();

    this.visited = [];
    this.toVisit = [];
    this.dist = [];
    this.prev = [];

    this.found = false;

    this.start = -1;
    this.finish = -1;
  }

  initialize() {
    this.visited = [];

    this.prev = new Array(number_of_cols * number_of_rows);
    this.dist = new Array(number_of_cols * number_of_rows);

    this.found = false;

    this.start = start_row * number_of_cols + start_col;
    this.finish = finish_row * number_of_cols + finish_col;

    for (let i = 0; i < number_of_cols * number_of_rows; i++) {
      this.dist[i] = Infinity;
      this.prev[i] = null;
    }

    this.dist[this.start] = 0;
  }

  execute() {
    this.initialize();
    this.toVisit.push(this.start);

    let node = this.start;

    do {
      let lowestIdx = 0;
      let lowestVal = Infinity;

      for (let i = 0; i < this.toVisit.length; i++) {
        if (lowestVal > this.dist[this.toVisit[i]]) {
          lowestIdx = i;
          lowestVal = this.dist[this.toVisit[i]];
        }
      }

      node = this.toVisit.splice(lowestIdx, 1)[0];

      let neighbours = getNeigbours(node);
      this.visited.push(node);

      neighbours.map((neighbour) => {
        return this.evaluateNeighbour(neighbour, node);
      });

      if (this.found) {
        break;
      }
    } while (this.toVisit.length != 0);

    return buildResult(this.visited, this.prev, this.start, this.finish);
  }

  evaluateNeighbour(neighbour, node) {
    if (this.found) {
      return;
    }

    if (this.dist[neighbour] > this.dist[node] + 1) {
      this.toVisit.push(neighbour);

      this.dist[neighbour] = this.dist[node] + 1;
      this.prev[neighbour] = node;
    }

    if (neighbour === this.finish) {
      this.found = true;
    }
  }
}
