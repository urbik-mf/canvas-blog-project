import { canvas } from "../main";
import { renderSquare } from "../renderer";
import { throttle, mapRange, calculateDistance, Vector } from "../utils";
import { getTopBorder } from "./water";

const GAP = 30;

export interface GridPoint {
  position: Vector;
  side: number;
  linesCount: number;
}

export interface Shine {
  position: Vector;
  radius: number;
  speed: number;
}

export const grid: GridPoint[] = [];
export const shines: Shine[] = [];

export const createGrid = (): void => {
  for (let x = GAP; x < canvas.width; x += GAP) {
    for (let y = GAP; y < canvas.height / 2; y += GAP) {
      addPoint(x, y);
    }
  }
  shines.push({
    position: { x: canvas.width / 2, y: getTopBorder() },
    radius: 50,
    speed: 0,
  });
};

export const addPoint = (x: number, y: number): void => {
  grid.push({
    position: {
      x,
      y,
    },
    side: 0,
    linesCount: 0,
  });
};

export const addShine = throttle((): void => {
  shines.push({
    position: { x: canvas.width / 2, y: getTopBorder() },
    radius: 0,
    speed: Math.random() * 3 + 2,
  });
}, 2000);

export const updateSun = (): void => {
  const shinesToDelete: number[] = [];
  shines.forEach((s, i) => {
    s.radius += s.speed;
    if (s.radius > canvas.width * 1.5) shinesToDelete.push(i);
  });
  shinesToDelete.toReversed().forEach((i) => shines.splice(i, 1));
  addShine();
  grid.forEach((p) => {
    p.side = p.linesCount = 0;
  });
  shines.forEach((shine) => {
    grid.forEach((p) => {
      p.linesCount = p.side = Math.max(
        p.linesCount,
        mapRange(
          Math.abs(
            calculateDistance(shine.position, p.position) - shine.radius
          ),
          0,
          40,
          60,
          0,
          true,
          (x) => x ** 4
        )
      );
    });
  });
};

export const renderGrid = (ctx: CanvasRenderingContext2D): void => {
  grid.forEach((point) => {
    ctx.save();
    ctx.translate(point.position.x, point.position.y);
    renderSquare(ctx, point.linesCount, point.side, point.side, 4, "#ff36");
    ctx.restore();
  });
};
