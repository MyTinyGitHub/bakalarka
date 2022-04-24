import { Component } from "react";
import CurrentOperationInstance from "../Instances/CurrentOperationInstance";
import Instances from "../Instances/Instances";
import style from "./current-operation.module.css";

export default class CurrentOperation extends Component {
  constructor() {
    super();

    this.state = {
      text: Instances.getLanguageText().getText("welcome"),
    };

    CurrentOperationInstance.getInstance().setView(this);
  }

  setText(text) {
    this.setState(() => ({
      text: text,
    }));
  }

  setTextFromLocale(text) {
    this.setText(Instances.getLanguageText().getText(text));
  }

  render() {
    return (
      <section className={style.navbar}>
        <div className={style.text}>{this.state.text}</div>
      </section>
    );
  }
}
