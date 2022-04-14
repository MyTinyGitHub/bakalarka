import { SideWinder } from "../Algorithms/LabBuilding/SideWinder";
import { TreeMaze } from "../Algorithms/LabBuilding/TreeMaze";
import { Astar } from "../Algorithms/Pathfinding/Astar";
import { BreadthFirstSearch } from "../Algorithms/PathFinding/BreadthFirstSearch";
import { DepthFirstSearch } from "../Algorithms/PathFinding/DepthFirstSearch";
import { Dijkstra } from "../Algorithms/PathFinding/Dijkstra";
import { PathFindingAlgorithm } from "../Algorithms/Pathfinding/PathFindingAlgorithm";

export class AlgorithmHandler {
  constructor() {}
  static calculateAlgorithm(which) {
    switch (which) {
      case "astar":
        return new Astar();
      case "dijkstra":
        return new Dijkstra();
      case "bfs":
        return new BreadthFirstSearch();
      case "dfs":
        return new DepthFirstSearch();
      default:
        return null;
    }
  }

  static determine_maze(maze) {
    switch (maze) {
      case "Tree Maze":
        return new TreeMaze();
      case "Side Winder":
        return new SideWinder();
      default:
        return null;
    }
  }
}
