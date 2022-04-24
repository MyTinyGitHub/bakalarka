import { getNeigbours, buildResult } from "../HelperFunctions";
import { PathFindingAlgorithm } from "./PathFindingAlgorithm";
import Instances from "../../Instances/Instances";

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

    this.found = false;
    this.prev = new Array(Instances.getGrid().size());

    this.start = Instances.getStart().getIndex();
    this.finish = Instances.getFinish().getIndex();
  }

  execute() {
    this.initialize();
    let node = this.start;

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
