Canvas Blog: Building Compact Fullscreen Scenes with Canvas 2D

This short technical article explains the ideas and patterns used in this repository. It's written for a developer audience who will read the blog post and download the accompanying project to experiment. The goal is to explain what this project is, what core canvas concepts it uses, and how you can rapidly create new visuals by adding entries to the `scenes` list in `src/sceneManager.ts`.

Why this project exists

- Small, focused scene modules are ideal for teaching: each file demonstrates a single visual idea (transform chains, simple particle systems, grid-driven effects, recursive drawing).
- The code is intentionally lightweight and dependency-free so readers can copy patterns into their own projects.

A quick primer on Canvas 2D

- The 2D canvas API provides an immediate-mode drawing surface (a bitmap you paint into every frame). Typical workflow: clear or partially paint the canvas, apply transforms, draw paths/images/text, and optionally restore transforms/graphics state.
- Transforms are cheap and composable: translate, rotate, scale. Wrap drawing with `ctx.save()` / `ctx.restore()` to localize transforms and styles.
- The canvas context is stateful: styles (fillStyle, strokeStyle), composition modes (globalCompositeOperation), shadow, line width, and transforms persist until changed.

Core concepts used in the project

- Single shared canvas: the app centers a single fullscreen `<canvas>` and all scenes draw to it. This keeps composition simple and reduces DOM churn.
- Simple render pipeline: a top-level `render` function composes multiple scene draws per frame. Each draw begins with `ctx.setTransform(1,0,0,1,0,0)` or `ctx.save()`/`ctx.restore()` to keep transforms contained.
- Deterministic update + render flow: `src/update.ts` decides which systems evolve each frame (squares, water, sun, fractal). The render function then draws the current state.
- In-place mutable state: scenes keep arrays (e.g., `water`, `grid`, `squares`) that are mutated across frames instead of allocating new arrays every frame; this reduces garbage collection pressure.
- Minimal timing normalization: modules sometimes scale or normalize the raw time value before using it in trigonometric functions to achieve different motion speeds.

How scenes are organized (use `scenes` to generate new graphics)

- Open `src/sceneManager.ts`. The `scenes` variable is an array of scene definitions. Each entry is an array whose members are either a small initializer object (usually the first member) and strings that identify which scene features to enable. Example entries look like:

  - `[{ start: () => { ... } }, 'fractal', 'water', 'sun']`
  - `['grid']`

- Behavior implemented in the project:
  1. When the page loads (`DOMContentLoaded`) or when the `#toggle-mode` button is clicked, the `sceneManager` advances the index and, if present, calls the `start` initializer found in the first entry. Initializers are a convenient place to clear arrays, seed particles, or create grid points.
  2. `src/update.ts` reads the current scene via `getCurrentScene()` and selectively runs updates for squares, water, and sun systems based on whether the current scene array includes corresponding strings.
  3. `src/renderer.ts` composes draws for the active systems and uses helpers like `renderSquare` to produce many of the simple line-based visuals.

Guided recipe: create a new visual via `scenes`

1. Create a small scene module under `src/scenes` (for example `src/scenes/myVisual.ts`) that exports update and render helpers and keeps any per-frame arrays privately.
2. Add an initializer object to `scenes` that seeds or resets the module's arrays. The initializer should be a plain object with an optional `start()` function; `sceneManager` will call it when switching to that scene.
3. Add the identifiers used by your module to the scene entry (e.g., `'myVisual'`) and update `src/update.ts` and `src/renderer.ts` to call your module's update and render functions when that identifier is present in the current scene.
4. Toggle modes in the running app to verify the initializer runs and your visuals appear.

Design notes and patterns worth highlighting to readers

- Keep scene state in module scope: define arrays like `const particles: Particle[] = []` and expose `add`, `update`, and `render` functions. This makes initializers trivial (just clear or seed the array).
- Favor short-lived configuration in `sceneManager` initializers: do not put heavy logic there — use them to seed or reset and leave per-frame work to `update`.
- Use `ctx.save()`/`ctx.restore()` liberally. It's cheaper than reasoning about transform inversion and keeps code localized and readable.
- Use small utility functions (`mapRange`, `getVector`, `getNormalisedVector`) for motion math — this keeps scene code declarative rather than full of repeated math.

Performance considerations (practical, not theoretical)

- Reuse objects and arrays to reduce pressure on the garbage collector.
- Avoid creating new DOM nodes or images inside the frame loop.
- Keep complex math in `update()` but keep drawing fast: don't call context setters (fillStyle, strokeStyle) more often than needed in tight loops.

What else you can do with Canvas 2D and beyond

- Advanced 2D techniques: offscreen buffering (use an offscreen canvas to pre-render static geometry), draw-image compositing (create visual layers and blend them with `globalCompositeOperation`), and use Path2D for complex reusable shapes.
- Mixing 2D and DOM: render static UI in HTML/CSS and use canvas for visuals. The two models can complement each other: DOM for interactivity, canvas for visuals.
- WebGL & hybrid approaches: for particle systems with thousands of elements or 3D-like effects, move to WebGL (raw WebGL or libraries like regl/three.js). Another option is to render static geometry in WebGL and draw UI overlays in 2D.
- Worker-based rendering: OffscreenCanvas in a Web Worker can move CPU-heavy drawing off the main thread (note: browser support and project complexity increase).

Pointers for the blog narrative

- Start with the user-visible behavior: a handful of small fullscreen animated scenes. Show a screenshot or two and explain the visual idea.
- Explain the small composition pattern (`render` function + scene toggles) and highlight the `scenes` variable as the low-friction entry point for adding new visuals — this is the piece readers will copy.
- Emphasize the maintainability tradeoffs: simple code is slow to scale but extremely teachable and easy to adapt for readers' experiments.

Closing notes

- This repository is a companion to the post: it contains compact, teachable examples and a tiny composition layer. Use the `scenes` array and the `start` initializers as your main extension points: they let you seed, reset, and combine small visual systems with minimal wiring.
