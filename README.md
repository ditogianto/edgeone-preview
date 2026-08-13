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

## Development Notes

*   **Cache Busting:** For demonstration purposes, the fetch requests in `app.js` automatically append a timestamp (`?t=...`). This intentionally bypasses EdgeOne's aggressive Edge caching so that the live analytics increment on every single click during a presentation. In a real production scenario, you would remove this to take advantage of EdgeOne's global CDN caching.

## License

Built for Tencent EdgeOne.
