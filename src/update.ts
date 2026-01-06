import { updateWater, water } from "./scenes/water";
import { grid, shines, updateSun } from "./scenes/sun";
import { squares } from "./scenes/square";

export const update = (time: number): void => {
  updateWater(time);
  updateSun();
};

export const reset = () => {
  water.splice(0, water.length);
  grid.splice(0, grid.length);
  shines.splice(0, shines.length);
  squares.splice(0, squares.length);
};
