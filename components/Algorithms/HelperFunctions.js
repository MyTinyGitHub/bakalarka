import { number_of_cols, number_of_rows } from "../Grid/grid";
import { walls } from "../Grid/grid";
import { start_col, start_row, finish_col, finish_row } from "../Grid/grid";

export function getNeigbours(indx) {
  const neigbours = [];

  const indexTop = indx - number_of_cols;
  const indexBottom = indx + number_of_cols;

  const indexRight = indx + 1;
  const indexLeft = indx - 1;

  if ((indx % number_of_cols) + 1 < number_of_cols && !walls.has(indexRight))
    neigbours.push(indexRight);

  if (indx % number_of_cols > 0 && !walls.has(indexLeft))
    neigbours.push(indexLeft);

  if (indexTop >= 0 && !walls.has(indexTop)) neigbours.push(indexTop);

  if (indexBottom < number_of_cols * number_of_rows && !walls.has(indexBottom))
    neigbours.push(indexBottom);

  return neigbours;
}

function getPath(prev, start, finish) {
  let path = [];
  let node = finish;

  if (!prev[finish]) {
    return [];
  }

  while (node !== start) {
    path.push(node);
    node = prev[node];
  }

  path.push(start);
  return path;
}

export function buildResult(visited, prev, start, finish) {
  return {
    visited: visited,
    prev: getPath(prev, start, finish),
    start: start,
    finish: finish,
  };
}
