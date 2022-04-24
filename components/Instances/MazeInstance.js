let instance = null;
export default class MazeInstance {
  constructor() {
    this.grid = null;
    this.algorithm = null;
  }

  getAlgorithm() {
    return this.algorithm;
  }

  setAlgorithm(algorithm) {
    this.algorithm = algorithm;
  }

  isEmpty() {
    return this.algorithm === null;
  }

  static getInstance() {
    if (!instance) {
      instance = new MazeInstance();
    }
    return instance;
  }
}
