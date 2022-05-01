let instance = null;

export default class WeightController {
  constructor() {
    this.weight = 1;
    this.weights = [];
  }

  setWeight(int) {
    this.weight = int;
  }

  getWeight() {
    return this.weight;
  }

  setWeightOnIndex(index) {
    this.weights[index] = this.weight;
  }

  getWeightOnIndex(index) {
    return this.weights[index];
  }

  setConcreteWeightOnIndex(index, int) {
    this.weights[index] = int;
  }

  static getInstance() {
    if (!instance) {
      instance = new WeightController();
    }
    return instance;
  }
}
