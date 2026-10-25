# Itzfizz – Scroll-Driven Hero Section

A scroll-driven hero section animation built with **React**, **Tailwind CSS** and **GSAP (ScrollTrigger)**. A top-view car "drives" down the road as you scroll, while the headline, road markings and statistics react to scroll progress.


## Tech Stack

| Tech | Purpose |
| --- | --- |
| HTML / CSS / JavaScript | Core web technologies |
| React 19 (Vite) | Component structure |
| Tailwind CSS v4 | Styling and responsive layout |
| GSAP + ScrollTrigger | Intro animation and scroll-linked motion |

## Features

### 1. Hero layout
- Fills the first screen (`h-screen`).
- Letter-spaced headline: **W E L C O M E  I T Z F I Z Z**.
- Four impact statistics placed on either side of the road (2x2 grid on mobile).

### 2. Initial load animation (time-based)
- Headline letters reveal with a staggered slide-up and fade.
- The car drives in from the bottom of the screen.
- Statistics fade in one by one with a delay, and the numbers count up.

### 3. Scroll animation (progress-based)
- The hero is pinned for 3 screen heights while the user scrolls.
- Motion is tied to scroll progress, not autoplay, using `scrub: 1.2` for smooth interpolation.
- **Car:** weaves left and right, banks (rotates) into each turn, and scales up as if approaching the viewer.
- **Road:** lane dashes loop seamlessly downward.
- **Headline:** letters spread apart as you scroll.
- **Stats:** parallax drift at different speeds (desktop).

### 4. Performance
- Only `transform` and `opacity` are animated, so there is no layout reflow.
- Road dashes loop using a modulo `y` transform instead of animating `background-position`.
- `gsap.quickSetter` is used for the per-frame road update.
- Intro and scroll animations target separate elements, so GSAP properties never conflict.
- `prefers-reduced-motion` is respected (animations are skipped, final content is shown).

## Project Structure

```
itzfizz-scroll-hero/
├── .github/workflows/deploy.yml   # GitHub Pages auto-deploy
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css                  # Tailwind theme + road dash pattern
    ├── data/
    │   └── stats.js               # Statistics content
    └── components/
        ├── Hero.jsx               # Layout + all GSAP animations
        ├── Car.jsx                # Inline SVG car (original artwork)
        └── Stat.jsx               # Single statistic block
```

## Getting Started

**Prerequisites:** Node.js 18 or higher.

```bash
# install dependencies
npm install

# start the dev server
npm run dev

# production build
npm run build

# preview the production build
npm run preview
```

## Deployment (GitHub Pages)

1. Push the project to a GitHub repository on the `main` branch.
2. Go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push.
4. The site is published at `https://<username>.github.io/<repo>/`.

`vite.config.js` uses `base: './'`, so it works with any repository name.

## Customization

In `src/components/Hero.jsx`:

| Setting | What it does |
| --- | --- |
| `SCROLL_LENGTH` | How long the hero stays pinned (default `+=300%`) |
| `scrub` | Smoothing of scroll-linked motion (higher = more lag/inertia) |
| `keyframes` on the car | Left/right sway and bank angle |
| `scale` / `y` on the car | How much the car grows and moves down |

Statistics content and parallax speed are in `src/data/stats.js`.

## Reference

Inspired by: https://paraschaturvedi.github.io/car-scroll-animation