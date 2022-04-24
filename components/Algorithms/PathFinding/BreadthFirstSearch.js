import { getNeigbours, buildResult } from "../HelperFunctions";
import { PathFindingAlgorithm } from "./PathFindingAlgorithm";
import Instances from "../../Instances/Instances";

export class BreadthFirstSearch extends PathFindingAlgorithm {
  constructor() {
    super();
    this.visited = new Set();
    this.toVisit = [];
    this.prev = [];

    this.found = false;

    this.start = -1;
    this.finish = -1;
  }

  initialize() {
    this.visited = new Set();
    this.toVisit = [];
    this.prev = new Array(Instances.getGrid().size());

    this.found = false;

    this.start = Instances.getStart().getIndex();
    this.finish = Instances.getFinish().getIndex();
  }

  execute() {
    this.initialize();
    let node = this.start;
    this.toVisit.push(this.start);

    do {
      node = this.toVisit.shift();
      this.visited.add(node);
      if (node === this.finish) {
        this.found = true;
      }

      if (this.found) {
        break;
      }

      let neighbours = getNeigbours(node);

      neighbours.forEach((neighbor) => {
        if (!this.toVisit.includes(neighbor) && !this.visited.has(neighbor)) {
          this.prev[neighbor] = node;
          this.toVisit.push(neighbor);
        }
      });
    } while (this.toVisit.length != 0);

    return buildResult(
      Array.from(this.visited),
      this.prev,
      this.start,
      this.finish
    );
  }
}
