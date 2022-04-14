import React, { useState, useMemo } from "react";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import classes from "./drop-down-menu.module.css";
import "@progress/kendo-theme-default/dist/all.css";
import TextField from "@mui/material/TextField";
import { start_col, start_row, finish_col, finish_row } from "../Grid/grid";

// export let step_position = 0;

const algorithms_display_names = [
  "Dijkstra",
  "Astar",
  "Breadth First Search",
  "Depth First Search",
];

const algorithm_todo = {
  Dijkstra: "dijkstra",
  Astar: "astar",
  "Breadth First Search": "bfs",
  "Depth First Search": "dfs",
};

const maze_builds = ["Tree Maze", "Side Winder"];

export const UINavbar = (props) => {
  const [category, setCategory] = useState("");
  const [mazeBuild, setMazeBuild] = useState("");
  const [values, setValues] = useState(0);
  const [step_position, setStepPosition] = useState("");
  const [startRow, setStartRow] = useState(start_row);
  const [startCol, setStartCol] = useState(start_col);
  const [endRow, setEndRow] = useState(finish_row);
  const [endCol, setEndCol] = useState(finish_col);

  const verifyChange = () => {
    if (start_col !== startCol || start_row !== startRow) {
      setStartCol(start_col);
      setStartRow(start_row);
      step_position = 0;
    }

    if (endCol !== finish_col || endRow !== finish_row) {
      setEndCol(finish_col);
      setEndRow(finish_row);
      step_position = 0;
    }

    if (step_position == 0) {
      props.clearAlgorithm();
    }
  };

  let nextStep = () => {
    verifyChange();

    const val = parseInt(values);
    if (val % 1 === 0) {
      setStepPosition(props.displayStepByStep("next", step_position, val));
    }
  };

  const prevStep = () => {
    verifyChange();

    const val = parseInt(values);
    if (val % 1 === 0) {
      setStepPosition(props.displayStepByStep("back", step_position, val));
    }
  };

  const disp = () => {
    props.calculate(algorithm_todo[category]);
    props.display(algorithm_todo[category]);
  };

  const changeCategory = useMemo(() => {
    if (category === "Select Algorithm...") props.clearAlgorithm();
    setStepPosition(0);
    disp();
  }, [category]);

  const changeMazeBuild = useMemo(() => {
    if (mazeBuild === "Select Maze...") props.clearMaze();
    props.calculate_maze(mazeBuild);
    props.display_maze();
  }, [mazeBuild]);

  const updateInputValue = (evt) => {
    const val = evt.target.value;
    setValues(val);
  };
  return (
    <section className={classes.navbar}>
      <ul className={classes.navList}>
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
            defaultItem="Select Algorithm..."
          />
        </li>
        <li className={classes.listItem}>
          <DropDownList
            style={{
              width: "150px",
            }}
            data={maze_builds}
            onChange={(e) => setMazeBuild(e.value)}
            defaultItem="Select Maze..."
          />
        </li>
      </ul>

      <button onClick={nextStep}>Do Next-Step</button>
      <input value={values} onChange={(evt) => updateInputValue(evt)} />
      <button onClick={prevStep}>Do Prev-Step</button>
    </section>
  );
};
