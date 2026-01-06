import { canvas } from "../main";
import { renderSquare } from "../renderer";
import {
  Vector,
  mapRange,
  calculateDistance,
  getNormalisedVector,
  getVector,
} from "../utils";

export interface Water {
  position: Vector;
  velocity: Vector;
  drag: number;
  mass: number;
  radius: number;
}

export const water: Water[] = [];

export const getTopBorder = (): number => canvas.height / 2;

export const addWater = (): void => {
  water.push({
    position: {
      x: canvas.width * Math.random(),
      y: getTopBorder() + (canvas.height - getTopBorder()) * Math.random(),
    },
    velocity: { x: 0, y: 0 },
    drag: 0.001,
    mass: 25,
    radius: 5,
  });
};

export const updateWater = (time: number): void => {
  if (Math.abs(Math.sin(time)) > 0.9) {
    addWater();
    water.splice(0, 1);
  }
  water.forEach((w) => {
    const currentMass = mapRange(
      w.position.y,
      getTopBorder(),
      canvas.height,
      w.mass / 100,
      w.mass,
      true
    );
    const otherWater = water.filter(
      (ow) =>
        ow !== w &&
        calculateDistance(ow.position, w.position) < currentMass + ow.mass
    );
    otherWater.forEach((ow) => {
      const translateVector = getNormalisedVector(
        getVector(w.position, ow.position),
        mapRange(
          calculateDistance(w.position, ow.position),
          0,
          currentMass + ow.mass,
          currentMass / 100,
          0,
          true
        )
      );
      w.velocity.x += translateVector.x;
      w.velocity.y += translateVector.y;
    });

    if (w.position.x < 0) {
      w.velocity.x = Math.abs(w.velocity.x);
    }
    if (w.position.x > canvas.width) {
      w.velocity.x = -Math.abs(w.velocity.x);
    }
    if (w.position.y > canvas.height) {
      w.velocity.y = -Math.abs(w.velocity.y);
    }
    if (w.position.y < getTopBorder()) {
      w.velocity.y = Math.abs(w.velocity.y);
    }

    w.position.x += w.velocity.x;
    w.position.y += w.velocity.y;

    w.velocity.x *= 1 - w.drag;
    w.velocity.y *= 1 - w.drag;
  });
};

export const renderWater = (ctx: CanvasRenderingContext2D): void => {
  water.forEach((w) => {
    ctx.save();
    const scale = mapRange(
      w.position.y,
      canvas.height,
      getTopBorder(),
      1,
      0.25,
      true
    );
    ctx.translate(w.position.x, w.position.y);
    ctx.scale(scale, scale);
    renderSquare(ctx, 4, w.radius, w.radius, 5);
    ctx.restore();
  });
};
