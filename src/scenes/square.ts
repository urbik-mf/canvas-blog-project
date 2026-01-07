import { canvas } from "../main";
import { renderSquare } from "../renderer";
import { mapRange } from "../utils";

export interface Square {
  posX: number;
  posY: number;
  linesCount: number;
  width: number;
  height: number;
}

export const squares: Square[] = [];

export const resetSquares = () => squares.splice(0, squares.length);

export const addSquares = (count = 1, lineCount = 2000) => {
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      addSquare(x / count, y / count, lineCount);
    }
  }
};

export const addSquare = (
  posX: number,
  posY: number,
  linesCount: number,
  width: number = 250,
  height: number = 250
): void => {
  squares.push({
    posX,
    posY,
    linesCount,
    width,
    height,
  });
};

export const renderSquares = (
  ctx: CanvasRenderingContext2D,
  time: number,
  isOneScene: boolean
): void => {
  squares.forEach((s) => {
    ctx.save();
    ctx.translate(
      isOneScene ? canvas.width / 2 : canvas.width / 6 + canvas.width * s.posX,
      isOneScene
        ? canvas.height / 2
        : canvas.height / 6 + canvas.height * s.posY
    );
    ctx.rotate(Math.sin(time / 5) * 2);
    ctx.scale(
      mapRange(Math.sin(time / 2), -1, 1, 0.25, 1),
      mapRange(Math.sin(time / 2), -1, 1, 0.25, 1)
    );
    renderSquare(ctx, s.linesCount, s.width, s.height);
    ctx.restore();
  });
};
