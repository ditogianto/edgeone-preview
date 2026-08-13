# EdgeOne Content Negotiator (Frontend / UI)

Welcome to the frontend of the **Tri-State Content Negotiator**, a Live Demo built to showcase the power of **Tencent EdgeOne Makers**.

This repository contains a static HTML/JS web application designed with a Neo-Brutalist aesthetic. It serves as the interactive dashboard for demonstrating edge-level content routing, cryptographic validation, and live analytics.

## Features

1.  **Interactive Tri-State Simulator:**
    *   **Citizen Button:** Simulates a legitimate user flow by fetching a signed HMAC-SHA256 token from the EdgeOne backend, then requesting the protected asset.
    *   **Merchant Button:** Simulates a verified search engine crawler or AI answer engine (GEO Mode).
    *   **Bandit Button:** Simulates an unauthenticated AI scraper attempting to steal content.
2.  **Live Server Proof Log:**
    *   To prove that the logic is happening at the Edge (and not just via a JavaScript trick), the UI dynamically intercepts the HTTP headers returned by the EdgeOne network (`X-Content-Negotiator-State` and `Cache-Control`) and displays them in a terminal-style log window.
3.  **Real-time Analytics Dashboard:**
    *   Fetches and displays live KV Storage statistics from the backend, showing exactly how many requests were routed to each state.

## Setup & Deployment on EdgeOne Pages

1.  **Configure API Endpoint:**
    *   Open `app.js`.
    *   Locate `const API_BASE = "https://edgeone-worker.edgeone.dev";`.
    *   Change this URL to the domain of your deployed EdgeOne Worker backend.
2.  **Deploy:**
    *   Connect this repository to an EdgeOne Pages project.
    *   Since this is a static site (HTML/CSS/JS), no build step is required (Framework: `None`).
    *   Set the output directory to the root directory `/`.

## EdgeOne's "God-Tier" Caching & The Live Demo Workaround

One of Tencent EdgeOne's most powerful features is its aggressive, globally distributed CDN caching. By default, the `edgeone-worker` backend responds to Citizen (State 1) and Merchant (State 2) requests with `Cache-Control: public, max-age=86400`.

**The Problem for Live Demos:**
Because of this god-tier caching, after you click "Citizen" or "Merchant" for the first time, your browser and EdgeOne's edge nodes lock that SVG into memory. Subsequent clicks *never* reach the backend Serverless function. They are served instantly from the cache. Because the request never reaches the backend, the KV Analytics counter does *not* increment!

**The Solution (Cache Busting):**
To ensure the live stats increment on *every single click* during a presentation or demo, the `app.js` file intentionally intercepts every `fetch()` request and appends a unique timestamp parameter (e.g., `?t=1734509...`). This technique, known as **Cache Busting**, forces the browser and EdgeOne to treat every click as a brand-new, unique request, bypassing the cache entirely.

*(Note: In a real production deployment, you would remove this `?t=` parameter to save costs and fully utilize EdgeOne's blazingly fast CDN cache).*

## License

Built for Tencent EdgeOne.
