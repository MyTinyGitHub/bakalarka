let instance = null;
export default class CurrentOperationInstance {
  constructor() {
    this.view = null;
  }

  setView(view) {
    this.view = view;
  }

  getView() {
    return this.view;
  }

  static getInstance() {
    if (!instance) {
      instance = new CurrentOperationInstance();
    }
    return instance;
  }
}
