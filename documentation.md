# Canvas Blog Project — Documentation

This repository is a compact collection of fullscreen canvas scenes built with the HTML Canvas 2D API. It's intended as a small demo set for a blog post: short, focused scene files and a simple composition layer.

## Quick start

Install dependencies and start the Vite dev server from the project root:

```bash
npm install
npm run dev
```

Open `http://localhost:5173` (Vite default) in your browser.

## What this project actually does

- Uses a single fullscreen `<canvas>` element and the 2D context.
- Resizes the canvas backing store to the element's bounding rect on window resize.
- Drives updates with `requestAnimationFrame` (the main loop uses a small throttle utility to keep consistent timing).
- Scenes are small modules (squares, water, sun, fractal) that update and draw using simple transforms and the shared renderer helpers.

## Files at a glance

- `index.html`, `style.css` — minimal page and styles with a `#canvas` element.
- `src/main.ts` — finds the canvas, sets up resize handling, and starts the animation loop.
- `src/renderer.ts` — centralized drawing helpers and the top-level `render` function that composes scene draws.
- `src/sceneManager.ts` — lightweight scene list and a toggle control to switch modes; some scenes run small initializers when activated.
- `src/update.ts` — coordinates which systems update each frame (squares, water, sun, fractals).
- `src/utils.ts` — small math and timing helpers (mapRange, debounce, throttle, vector helpers).
- `src/*.(square|sun|water|fractal).ts` — scene implementations. Each keeps local arrays of particles/points and provides update + render logic.

## Important implementation notes (accurate to the code)

- The canvas backing is set to the element's CSS size via `getBoundingClientRect()` and assigned to `canvas.width/height`.
- The render pipeline resets transforms often (`ctx.setTransform(1,0,0,1,0,0)`) and uses `ctx.save()` / `ctx.restore()` around scene draws.
- Scenes keep small, reusable arrays (e.g., `water`, `grid`, `squares`) that are mutated in place to reduce allocations.
- Timing is used directly in scene updates; some modules normalize the raw time value before using it for animation math.

## Short best practices (kept brief and relevant)

- Use `requestAnimationFrame` for animation and compute a deterministic delta if you need frame-independent motion.
- Update canvas size on `resize`; avoid expensive recalculation inside every frame if you can debounce it.
- Reuse arrays/objects for frequently updated state to reduce GC pressure.
- Keep each scene file small and focused so it can be explained easily in a blog post.

## How to add a scene

1. Update `scenes` in `src/sceneManager.ts` variable to include definition of another scene.
2. Update `src/update.ts` and `src/renderer.ts` to call your scene's update and render (or register it via `sceneManager`).
3. Optionally add a small initializer in `sceneManager.ts` that runs when the scene is activated.
