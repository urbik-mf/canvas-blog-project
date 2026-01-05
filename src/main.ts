import { render } from './renderer';
import { update, reset } from './update';
import { throttle } from './utils';

export const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;

const resize = (): void => {
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width;
  canvas.height = rect.height;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
};

window.addEventListener('resize', resize);
resize();

const main = throttle((time: number = 0): void => {
  time = time / 500;
  update(time);
  render(ctx, time);
  reset();
  requestAnimationFrame(main);
}, 1000 / 60);

ctx.reset();
main();
