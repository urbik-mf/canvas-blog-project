import { canvas } from './main';
import { renderSquares } from './square';
import { renderWater } from './water';
import { renderGrid } from './sun';
import { renderFractals } from './fractal';
import { getCurrentScene } from './sceneManager';

export const render = (ctx: CanvasRenderingContext2D, time: number): void => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.save();

  renderBlackout(ctx);

  const scene = getCurrentScene();
  if (scene.includes('one')) {
    renderIntro(ctx);
  }

  renderGrid(ctx);
  renderWater(ctx);

  if (scene.includes('fractal')) {
    renderFractals(ctx, time);
  } else if (scene.includes('one') || scene.includes('grid')) {
    renderSquares(ctx, time, scene.includes('one'));
  }
};

const renderIntro = (ctx: CanvasRenderingContext2D): void => {
  ctx.font = 'bold 50px sans-serif';
  ctx.fillStyle = '#fff9';
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.fillText('Canvas', canvas.width / 2, canvas.height / 3);
  ctx.fillText('Glitches', canvas.width / 2, canvas.height / 1.5);
  ctx.restore();
};

const renderBlackout = (ctx: CanvasRenderingContext2D): void => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 0.25;
  ctx.fillStyle = 'black';
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
};

export const renderSquare = (
  ctx: CanvasRenderingContext2D,
  linesCount: number,
  width: number,
  height: number,
  maxLineLength: number = 20
): void => {
  ctx.globalAlpha = 0.7;
  ctx.globalCompositeOperation = 'lighten';
  ctx.shadowBlur = 0;

  for (let i = 0; i < linesCount; i++) {
    const x = Math.random() * width - width / 2;
    const y = Math.random() * height - height / 2;
    ctx.strokeStyle = `hsl(${Math.random() * 360},80%,60%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(
      x + Math.random() * maxLineLength - maxLineLength / 2,
      y + Math.random() * maxLineLength - maxLineLength / 2
    );
    ctx.stroke();
  }
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
};