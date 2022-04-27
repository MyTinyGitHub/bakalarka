let instance = null;
export default class ControlState {
  constructor() {
    this.operational = false;
    this.positionChanged = false;
  }

  setOperational(boolean) {
    this.operational = boolean;
  }

  isOperational() {
    return this.operational;
  }

  isPositionChanged() {
    return this.positionChanged;
  }

  resetPositionTracking() {
    this.positionChanged = false;
  }

  static getInstance() {
    if (!instance) {
      instance = new ControlState();
    }
    return instance;
  }
}
