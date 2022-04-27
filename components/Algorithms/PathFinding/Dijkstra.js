import { getNeigbours, buildResult } from "../HelperFunctions";
import { PathFindingAlgorithm } from "./PathFindingAlgorithm";
import Instances from "../../Instances/Instances";
import WeightController from "../../Controller/WeightController";

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

    this.prev = new Array(Instances.getGrid().size());
    this.dist = new Array(Instances.getGrid().size());

    this.found = false;

    this.start = Instances.getStart().getIndex();
    this.finish = Instances.getFinish().getIndex();

    for (let i = 0; i < Instances.getGrid().size(); i++) {
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

      const neighbours = getNeigbours(node);

      this.visited.push(node);

      neighbours.map((neighbour) => {
        this.evaluateNeighbour(neighbour, node);
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

    if (
      this.dist[neighbour] >
      this.dist[node] +
        parseInt(WeightController.getInstance().getWeightOnIndex(node))
    ) {
      this.toVisit.push(neighbour);
      this.dist[neighbour] =
        this.dist[node] +
        parseInt(WeightController.getInstance().getWeightOnIndex(node));
      this.prev[neighbour] = node;
    }

    if (
      this.dist[node] +
        parseInt(WeightController.getInstance().getWeightOnIndex(node)) !=
      1
    ) {
      console.log(WeightController.getInstance().getWeightOnIndex(node));
    }

    if (neighbour === this.finish) {
      this.found = true;
    }
  }
}
