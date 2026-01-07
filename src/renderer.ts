import { canvas } from "./main";
import { renderSquares } from "./scenes/square";
import { getTopBorder, renderBugs } from "./scenes/bugs";
import { renderGrid } from "./scenes/sun";
import { renderFractals } from "./scenes/fractal";
import { getCurrentScene } from "./sceneManager";
import { settings } from "./main";

export const render = (ctx: CanvasRenderingContext2D, time: number): void => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.save();

  renderBlackout(ctx);

  const scene = getCurrentScene();
  if (scene.id === "oneSquare") {
    renderIntro(ctx);
  }

  if (scene?.context?.renderBg) {
    renderBg(ctx);
  }

  renderGrid(ctx);
  renderBugs(ctx);
  renderSquares(ctx, time, scene.id === "oneSquare");

  if (scene?.context?.renderFractals) {
    renderFractals(ctx, time);
  }
};

const renderBg = (ctx: CanvasRenderingContext2D) => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.save();
  ctx.globalAlpha = 0.1;
  if (!settings.highPerformance) {
    ctx.globalAlpha = 1;
  }
  const grad = ctx.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width
  );
  grad.addColorStop(0, "#22f4");
  grad.addColorStop(0.2, "#66f4");
  grad.addColorStop(0.25, "#6cf4");
  grad.addColorStop(0.25, "#2f24");
  grad.addColorStop(1, "#2f21");
  ctx.fillStyle = grad;
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
  const gradNight = ctx.createRadialGradient(
    canvas.width / 2,
    getTopBorder(),
    0,
    canvas.width / 2,
    getTopBorder(),
    canvas.width
  );
  gradNight.addColorStop(0, "#ff35");
  gradNight.addColorStop(0.15, "#ff35");
  gradNight.addColorStop(0.15, "#ff34");
  gradNight.addColorStop(0.25, "#ff34");
  gradNight.addColorStop(0.25, "#ff33");
  gradNight.addColorStop(0.35, "#ff33");
  gradNight.addColorStop(0.35, "#ff32");
  gradNight.addColorStop(1, "#ff30");
  ctx.fillStyle = gradNight;
  ctx.fillRect(0, 0, canvas.width, canvas.height / 2);
  ctx.restore();
};

const renderIntro = (ctx: CanvasRenderingContext2D): void => {
  ctx.font = "bold 50px sans-serif";
  ctx.fillStyle = "#fff9";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillText("Canvas", canvas.width / 2, canvas.height / 3);
  ctx.fillText("Glitches", canvas.width / 2, canvas.height / 1.5);
  ctx.restore();
};

const renderBlackout = (ctx: CanvasRenderingContext2D): void => {
  ctx.globalAlpha = 0.1;
  if (!settings.highPerformance) {
    ctx.globalAlpha = 1;
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "black";
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fill();
  ctx.globalAlpha = 1;
};

export const renderSquare = (
  ctx: CanvasRenderingContext2D,
  linesCount: number,
  width: number,
  height: number,
  maxLineLength: number = 20,
  lowPerformanceColor: string = "#fff6"
): void => {
  if (!settings.highPerformance) {
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.shadowBlur = 0;
    ctx.fillStyle = lowPerformanceColor;
    ctx.fillRect(-(width / 2), -(height / 2), width, height);
    return;
  }
  ctx.globalAlpha = 0.7;
  ctx.globalCompositeOperation = "lighten";
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
  ctx.globalCompositeOperation = "source-over";
  ctx.globalAlpha = 1;
};
