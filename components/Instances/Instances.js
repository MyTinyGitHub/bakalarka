import AlgorithmInstance from "./AlgorithmInstance";
import CurrentOperationInstance from "./CurrentOperationInstance";
import GridInstance from "./GridInstance";
import LanguageInstance from "./LanguageInstance";
import MazeInstance from "./MazeInstance";
import StartAndFinishInstance from "./StartAndFinishInstance";

export default class Instances {
  static getMaze() {
    return MazeInstance.getInstance();
  }

  static getStart() {
    return StartAndFinishInstance.getStart();
  }

  static getFinish() {
    return StartAndFinishInstance.getFinish();
  }

  static getGrid() {
    return GridInstance.getInstance();
  }

  static getAlgorithm() {
    return AlgorithmInstance.getInstance();
  }
  static getCurrentOperationText() {
    return CurrentOperationInstance.getInstance().getView();
  }

  static getLanguageText() {
    return LanguageInstance.getInstance();
  }
}
