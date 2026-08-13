# Tri-State Content Negotiator — Live Demo

This directory contains a lightweight, Zero-Framework vanilla HTML/CSS/JS frontend to demonstrate the **Edge-Level AI Content Negotiator** built on Tencent EdgeOne Makers.

## Purpose

The Live Demo serves two functions:
1. **Shooting Tool**: Allows the video creator to trigger all three states visually during recording with single clicks.
2. **Public Demo**: A permanent, shareable endpoint allowing anyone to test the Edge-DRM logic directly.

## Stack & Style
- **Tech Stack**: Vanilla HTML5, CSS3, JavaScript. No external frameworks (No Tailwind, React, or Bootstrap).
- **Design System**: Neo-Brutalism (Solid high-contrast colors, sharp borders, deep drop shadows). Mobile-First.

## Integration with Edge Function
The demo relies on the backend `worker.js` (deployed to EdgeOne Makers) and interacts with the following endpoints:
- `GET /api/og?title=...&signature=...` (Renders the SVG assets based on state).
- `GET /api/og/demo-auth` (Fetches a pre-signed payload to bypass client-side signature generation for State 1).
- `GET /api/og/demo?simulate=crawler` (Simulates a server-side verified crawler request for State 2, as browsers cannot spoof User-Agent).
- `GET /api/og/stats` (Fetches EdgeOne KV counts).

## Usage
Simply serve this directory using any static web server (e.g., `python -m http.server`, Live Server extension) or deploy it statically on Tencent EdgeOne.
Make sure the `API_BASE` in `app.js` points to your deployed `worker.js` endpoint (or `http://localhost:8787` if running Wrangler locally).
