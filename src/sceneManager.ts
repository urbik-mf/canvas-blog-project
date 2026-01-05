import { canvas } from './main';
import { water, addWater } from './water';
import { grid, createGrid, shines } from './sun';

interface SceneConfig {
  start?: () => void;
}

type Scene = (SceneConfig | string)[];

const scenes: Scene[] = [
  [
    {
      start: () => {
        water.splice(0, water.length);
        grid.splice(0, grid.length);
        shines.splice(0, shines.length);
      },
    },
    'one',
  ],
  ['grid'],
  ['fractal'],
  [
    {
      start: () => {
        Array.from({ length: canvas.width / 3 }, addWater);
      },
    },
    'fractal',
    'water',
  ],
  [
    {
      start: () => {
        createGrid();
      },
    },
    'fractal',
    'water',
    'sun',
  ],
];
let sceneIndex = 0;

export const getCurrentScene = (): Scene => scenes[sceneIndex];

document.querySelector('#toggle-mode')!.addEventListener('click', () => {
  sceneIndex++;
  if (sceneIndex > scenes.length - 1) sceneIndex = 0;
  const firstItem = scenes[sceneIndex][0];
  if (typeof firstItem === 'object' && firstItem.start) {
    firstItem.start();
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const firstItem = scenes[sceneIndex][0];
  if (typeof firstItem === 'object' && firstItem.start) {
    firstItem.start();
  }
});
