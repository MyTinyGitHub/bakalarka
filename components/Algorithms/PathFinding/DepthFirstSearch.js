import { getNeigbours, buildResult } from "../HelperFunctions";
import { walls, number_of_cols, number_of_rows } from "../../Grid/grid";
import { start_col, start_row, finish_col, finish_row } from "../../Grid/grid";
import { PathFindingAlgorithm } from "./PathFindingAlgorithm";

export class DepthFirstSearch extends PathFindingAlgorithm {
  constructor() {
    super();

    this.toVisit = [];
    this.visited = [];
    this.alreadyVisited = new Set();
    this.prev = [];

    this.finish = -1;
    this.start = -1;

    this.found = false;
  }

  initialize() {
    this.alreadyVisited = new Set();

    this.visited = [];
    this.toVisit = [];

    this.prev = new Array(number_of_cols * number_of_rows);
    this.found = false;

    this.start = start_row * number_of_cols + start_col;
    this.finish = finish_row * number_of_cols + finish_col;
  }

  execute() {
    this.initialize();
    let node = this.start;
    let next_node = null;

    this.toVisit.push(node);
    this.visited.push(node);

    do {
      if (node === this.finish) {
        this.found = true;
        break;
      }

      let allNodesVisited = true;

      let neighbours = getNeigbours(node);
      for (let i = 0; i < neighbours.length; i++) {
        if (!this.alreadyVisited.has(neighbours[i])) {
          this.alreadyVisited.add(neighbours[i]);
          this.prev[neighbours[i]] = node;
          this.toVisit.push(node);
          allNodesVisited = false;
          node = neighbours[i];
          break;
        }
      }

      if (allNodesVisited) {
        node = this.toVisit.pop();
      }
    } while (!this.found && this.toVisit.length != 0);

    return buildResult(
      Array.from(this.alreadyVisited),
      this.prev,
      this.start,
      this.finish
    );
  }
}
