import { updateWater } from './water';
import { addSquare, resetSquares } from './square';
import { updateSun } from './sun';
import { getCurrentScene } from './sceneManager';

export const update = (time: number): void => {
  const scene = getCurrentScene();
  if (scene.includes('one') || scene.includes('grid')) {
    const count = scene.includes('one') ? 1 : 3;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        addSquare(x / count, y / count, scene.includes('grid') ? 500 : 2000);
      }
    }
  }
  if (scene.includes('water')) {
    updateWater(time);
  }
  if (scene.includes('sun')) {
    updateSun();
  }
};

export const reset = (): void => {
  resetSquares();
};
