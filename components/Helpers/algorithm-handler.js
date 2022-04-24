import { SideWinder } from "../Algorithms/LabBuilding/SideWinder";
import { TreeMaze } from "../Algorithms/LabBuilding/TreeMaze";
import { Astar } from "../Algorithms/Pathfinding/Astar";
import { BreadthFirstSearch } from "../Algorithms/PathFinding/BreadthFirstSearch";
import { DepthFirstSearch } from "../Algorithms/PathFinding/DepthFirstSearch";
import { Dijkstra } from "../Algorithms/PathFinding/Dijkstra";

import Instances from "../Instances/Instances";

export class AlgorithmHandler {
  constructor() {}

  static calculateAlgorithm(which) {
    switch (which) {
      case Instances.getLanguageText().getText("astar"):
        Instances.getAlgorithm().setAlgorithm(new Astar());
        break;

      case Instances.getLanguageText().getText("dijkstra"):
        Instances.getAlgorithm().setAlgorithm(new Dijkstra());
        break;

      case Instances.getLanguageText().getText("bfs"):
        Instances.getAlgorithm().setAlgorithm(new BreadthFirstSearch());
        break;

      case Instances.getLanguageText().getText("dfs"):
        Instances.getAlgorithm().setAlgorithm(new DepthFirstSearch());
        break;

      default:
        Instances.getAlgorithm().setAlgorithm(null);
    }
  }

  static determine_maze(maze) {
    switch (maze) {
      case Instances.getLanguageText().getText("tree-maze"):
        Instances.getMaze().setAlgorithm(new TreeMaze());
        break;

      case Instances.getLanguageText().getText("side-winder-maze"):
        Instances.getMaze().setAlgorithm(new SideWinder());
        break;

      default:
        Instances.getMaze().setAlgorithm(null);
    }
  }
}
