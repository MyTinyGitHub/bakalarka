let instance = null;
export default class MouseMode {
  constructor() {
    this.mouseMode = "";
  }

  setMode(mode) {
    this.mouseMode = mode;
  }

  getMode() {
    return this.mouseMode;
  }

  isEqual(mode) {
    return this.mouseMode === mode;
  }
  static getInstance() {
    if (!instance) {
      instance = new MouseMode();
    }
    return instance;
  }
}
