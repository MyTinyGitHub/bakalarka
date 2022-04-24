let instance = null;
export default class MouseMode {
  constructor() {
    this.mouseMode = "";
  }

  setMode(mode) {
    this.mouseMode = mode;
  }

  getMode() {
    console.log(this.mouseMode);
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
