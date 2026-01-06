import { canvas } from "./main";
import { addWater } from "./scenes/water";
import { createGrid } from "./scenes/sun";
import { addSquares, resetSquares } from "./scenes/square";
import { reset } from "./update";

interface SceneConfig {
  id: string;
  start?: () => void;
  context?: Record<string, any>;
}

const scenes: SceneConfig[] = [
  {
    id: "oneSquare",
    start: () => {
      reset();
      addSquares(1, 2000);
    },
  },
  {
    id: "gridSqaures",
    start: () => {
      resetSquares();
      addSquares(3, 500);
    },
  },
  {
    id: "fractalTrees",
    start: () => {
      resetSquares();
    },
    context: {
      renderFractals: true,
      renderBg: true,
    },
  },
  {
    id: "treesAndWater",
    start: () => {
      Array.from({ length: canvas.width / 3 }, addWater);
    },
    context: {
      renderFractals: true,
      renderBg: true,
    },
  },
  {
    id: "treesWaterAndSun",
    start: () => {
      createGrid();
    },
    context: {
      renderFractals: true,
      renderBg: true,
    },
  },
];
let sceneIndex = 0;

export const getCurrentScene = (): SceneConfig => scenes[sceneIndex];

document.querySelector("#next-scene")!.addEventListener("click", () => {
  sceneIndex++;
  if (sceneIndex > scenes.length - 1) sceneIndex = 0;
  const scene = scenes[sceneIndex];
  if (typeof scene === "object" && scene.start) {
    scene.start();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const scene = scenes[sceneIndex];
  if (typeof scene === "object" && scene.start) {
    scene.start();
  }
});
