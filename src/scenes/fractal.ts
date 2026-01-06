import { canvas } from "../main";
import { mapRange } from "../utils";
import { renderSquare } from "../renderer";

export const renderFractal = (
  ctx: CanvasRenderingContext2D,
  time: number,
  squareDistance: number = 100,
  squareWeight: number = 10,
  rotationCoef: number = Math.PI / 16
): void => {
  const renderBranch = (level: number): void => {
    if (level > 5) return;
    renderSquare(ctx, 50, squareDistance, squareWeight, 6, "#f6f");
    ctx.scale(0.75, 0.75);
    ctx.translate(squareDistance, 0);
    ctx.save();
    ctx.rotate(
      ((Math.PI * 2) / 8) * level * 0.2 * Math.sin(time / 1) + rotationCoef
    );
    renderBranch(level + 1);
    ctx.restore();
    ctx.rotate(
      ((Math.PI * 2) / 8) * level * 0.2 * Math.sin(time / 1.5) - rotationCoef
    );
    renderBranch(level + 1);
  };
  renderBranch(0);
};

export const renderFractals = (
  ctx: CanvasRenderingContext2D,
  time: number
): void => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(canvas.width / 1.5, canvas.height / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.scale(1, 1);
  renderFractal(
    ctx,
    time,
    100,
    10,
    mapRange(Math.sin(time / 10), -1, 1, Math.PI / 16, Math.PI / 4)
  );
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.translate(canvas.width / 5, canvas.height / 1.5);
  ctx.rotate(-Math.PI / 2);
  ctx.scale(1.5, 1.5);
  renderFractal(
    ctx,
    time,
    100,
    10,
    mapRange(Math.sin(time / 10), -1, 1, Math.PI / 16, Math.PI / 4)
  );
  ctx.setTransform(1, 0, 0, 1, 0, 0);
};
