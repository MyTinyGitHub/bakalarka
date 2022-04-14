import { DatePickerPropsContext } from "@progress/kendo-react-dateinputs";
import Grid from "../Grid/grid";
import { UINavbar } from "./drop-down-menu";

export default (props) => {
  return (
    <div>
      <UINavbar
        displayStepByStep={(direction, position, stepSize) =>
          props.displayStepByStep(direction, position, stepSize)
        }
        display={() => props.display()}
        calculate={(e) => props.calculate(e)}
        calculate_maze={(e) => props.calculate_maze(e)}
        display_maze={() => props.display_maze()}
        clearAlgorithm={() => props.clearAlgorithm()}
        clearMaze={() => props.reset()}
      ></UINavbar>
    </div>
  );
};
