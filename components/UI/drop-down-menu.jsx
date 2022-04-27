import React, { useState, useMemo } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import classes from "./drop-down-menu.module.css";
import { start_col, start_row, finish_col, finish_row } from "../Grid/grid";
import "@progress/kendo-theme-default/dist/all.css";
import { DisplayHandler } from "../Helpers/display-handler";
import { AlgorithmHandler } from "../Helpers/algorithm-handler";
import ControlState from "../Controller/ControlState";
import Instances from "../Instances/Instances";
import WeightController from "../Controller/WeightController";

const algorithms_display_names = [
  Instances.getLanguageText().getText("dijkstra"),
  Instances.getLanguageText().getText("astar"),
  Instances.getLanguageText().getText("bfs"),
  Instances.getLanguageText().getText("dfs"),
];

const maze_builds = [
  Instances.getLanguageText().getText("tree-maze"),
  Instances.getLanguageText().getText("side-winder-maze"),
];

const weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const UINavbar = (props) => {
  const [category, setCategory] = useState("");
  const [mazeBuild, setMazeBuild] = useState("");

  const [weight, setWeight] = useState(
    Instances.getLanguageText().getText("select-weight")
  );
  const [values, setValues] = useState(1);

  const [step_position, setStepPosition] = useState("");

  const step = (stepType) => {
    if (ControlState.getInstance().isOperational()) return;

    if (ControlState.getInstance().isPositionChanged()) {
      ControlState.getInstance().resetPositionTracking();
      setStepPosition(0);
    }

    if (step_position == 0) {
      DisplayHandler.clearAlgorithm();
    }

    const val = parseInt(values);
    if (parseInt(values) % 1 === 0) {
      setStepPosition(
        DisplayHandler.displayAlgorithmStepByStep(stepType, step_position, val)
      );
    }
  };

  const changeCategory = useMemo(() => {
    if (category === Instances.getLanguageText().getText("select-algo"))
      DisplayHandler.clearAlgorithm();
  }, [category]);

  const changeMazeBuild = useMemo(() => {
    if (mazeBuild === Instances.getLanguageText().getText("select-algo"))
      DisplayHandler.reset();
  }, [mazeBuild]);

  useMemo(() => {
    WeightController.getInstance().setWeight(weight);
  }, [weight]);

  const updateInputValue = (evt) => {
    const val = evt.target.value;
    setValues(val);
  };

  const runAlgorithm = () => {
    if (ControlState.getInstance().isOperational()) return;

    AlgorithmHandler.calculateAlgorithm(category);
    DisplayHandler.displayAlgorithm();
    setStepPosition(0);
  };

  const createMaze = () => {
    if (ControlState.getInstance().isOperational()) return;

    AlgorithmHandler.determine_maze(mazeBuild);
    DisplayHandler.create_maze();
  };

  return (
    <section className={classes.navbar}>
      <ul className={classes.navList}>
        <div className={classes.block}>
          <li className={classes.listItem}>
            <DropDownList
              style={{
                width: "200px",
              }}
              className={classes.dropDown}
              size={"medium"}
              fillMode={"solid"}
              data={algorithms_display_names}
              onChange={(e) => setCategory(e.value)}
              defaultItem={Instances.getLanguageText().getText("select-algo")}
            />
          </li>
          <button onClick={runAlgorithm} className={classes.navButton}>
            Run Algorithm
          </button>
        </div>

        <div className={classes.block}>
          <li className={classes.listItem}>
            <DropDownList
              style={{
                width: "150px",
              }}
              data={maze_builds}
              onChange={(e) => setMazeBuild(e.value)}
              defaultItem={Instances.getLanguageText().getText("select-maze")}
            />
          </li>
          <button onClick={createMaze} className={classes.navButton}>
            Create Maze
          </button>
        </div>

        <li>
          <button onClick={() => step("back")} className={classes.navButton}>
            Do Prev-Step
          </button>
          <input
            value={values}
            onChange={(evt) => updateInputValue(evt)}
            className={classes.navInput}
          />
          <button onClick={() => step("next")} className={classes.navButton}>
            Do Next-Step
          </button>
        </li>
        <li>
          <DropDownList
            style={{
              width: "150px",
            }}
            data={weights}
            onChange={(e) => setWeight(e.value)}
            defaultItem={Instances.getLanguageText().getText("select-weight")}
          />
        </li>
      </ul>
    </section>
  );
};
