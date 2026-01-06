import { updateBugs, bugs } from "./scenes/bugs";
import { grid, shines, updateSun } from "./scenes/sun";
import { squares } from "./scenes/square";

export const update = (time: number): void => {
  updateBugs(time);
  updateSun();
};

export const reset = () => {
  bugs.splice(0, bugs.length);
  grid.splice(0, grid.length);
  shines.splice(0, shines.length);
  squares.splice(0, squares.length);
};
