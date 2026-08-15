// web-launch/app.js

const API_BASE = "https://edgeone-worker.edgeone.dev"; // Reverted to default worker domain for Pages CNAME compatibility

// UI Elements
const btnCitizen = document.getElementById("btn-citizen");
const btnMerchant = document.getElementById("btn-merchant");
const btnBandit = document.getElementById("btn-bandit");
const svgOutput = document.getElementById("svg-output");
const loadingIndicator = document.getElementById("loading-indicator");
const serverProof = document.getElementById("server-proof");
const proofBody = document.getElementById("proof-body");

const statState1 = document.getElementById("stat-state1");
const statState2 = document.getElementById("stat-state2");
const statState3 = document.getElementById("stat-state3");

const memeBadge = document.getElementById("meme-badge");
const verdictText = document.getElementById("verdict-text");
const shareX = document.getElementById("share-x");
const shareWa = document.getElementById("share-wa");

// Fetch Live Stats
async function updateStats() {
    try {
        const res = await fetch(`${API_BASE}/api/og/stats?t=${Date.now()}`);
        if (res.ok) {
            const data = await res.json();
            statState1.innerText = data.state1 || "0";
            statState2.innerText = data.state2 || "0";
            statState3.innerText = data.state3 || "0";
        }
    } catch (e) {
        console.error("Failed to fetch stats", e);
    }
}

// Initial Stats Load
updateStats();

// Helpers for UI state
function showLoading() {
    svgOutput.innerHTML = "";
    memeBadge.classList.remove("show");
    serverProof.style.display = "none";
    loadingIndicator.style.display = "block";
}

function escapeHTML(str) {
    return String(str).replace(/[&<>'"]/g, tag => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
    }[tag] || tag));
}

function showResult(svgContent, verdictStr, colorHex, response, requestUrl) {
    loadingIndicator.style.display = "none";
    // Basic SVG sanitization: remove script tags to prevent stored XSS if backend is compromised
    const sanitizedSVG = svgContent.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    svgOutput.innerHTML = sanitizedSVG;

    // Show Server Proof with strict escaping
    const stateHeader = escapeHTML(response.headers.get("X-Content-Negotiator-State") || "N/A");
    const cacheHeader = escapeHTML(response.headers.get("Cache-Control") || "N/A");
    const execHeader = response.headers.get("X-Edge-Execution-Time");
    const safeUrl = escapeHTML(requestUrl);
    
    let headersLog = `X-Content-Negotiator-State: <strong>${stateHeader}</strong>\n` +
                     `Cache-Control: ${cacheHeader}`;
    if (execHeader) headersLog += `\nX-Edge-Execution-Time: <strong style="color:var(--color-citizen)">${escapeHTML(execHeader)}</strong>`;

    proofBody.innerHTML = `<strong>GET</strong> <a href="${safeUrl}" target="_blank">${safeUrl}</a>\n\n` +
                          `<strong>HTTP/1.1 ${response.status} OK</strong>\n` + headersLog;
    serverProof.style.display = "block";

    // Trigger Meme Badge
    verdictText.innerText = `Verdict: ${verdictStr}`;
    verdictText.style.boxShadow = `4px 4px 0px ${colorHex}`;

    // Setup Share on X URL
    const shareText = encodeURIComponent(`I was judged by the AI Content Negotiator! Result: ${verdictStr}. Try the Tri-State routing demo built on Tencent EdgeOne Makers:`);
    const shareUrl = encodeURIComponent("https://www.ditogianto.web.id/?v=3");
    shareX.href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}&hashtags=TencentEdgeOne,EdgeOneMakers,CODEPOLITAN,EdgeOne`;

    // Setup Share on WA URL
    const waText = encodeURIComponent(`I was judged by the AI Content Negotiator! Result: ${verdictStr}. Try the Tri-State routing demo built on Tencent EdgeOne Makers:\nhttps://www.ditogianto.web.id/?v=3`);
    shareWa.href = `https://wa.me/?text=${waText}`;

    // Re-trigger animation
    memeBadge.classList.remove("show");
    void memeBadge.offsetWidth; // trigger reflow
    memeBadge.classList.add("show");

    // Update stats silently
    setTimeout(updateStats, 1000);
}

// ----------------------------------------------------
// Action: I'm Legit (State 1 - Citizen)
// ----------------------------------------------------
btnCitizen.addEventListener("click", async () => {
    showLoading();
    try {
        // First get a valid demo signature from the backend (demo helper)
        const authRes = await fetch(`${API_BASE}/api/og/demo-auth?t=${Date.now()}`);
        if (!authRes.ok) throw new Error("Demo Auth failed");

        const authData = await authRes.json();

        const requestUrl = `${API_BASE}/api/og?title=${encodeURIComponent(authData.title)}&signature=${encodeURIComponent(authData.signature)}&t=${Date.now()}`;
        const svgRes = await fetch(requestUrl);
        const svgText = await svgRes.text();

        showResult(svgText, "CITIZEN 🟢", "var(--color-citizen)", svgRes, requestUrl);
    } catch (e) {
        console.error(e);
        loadingIndicator.innerText = "Error loading SVG";
    }
});

// ----------------------------------------------------
// Action: I'm a search bot (State 2 - Merchant)
// ----------------------------------------------------
btnMerchant.addEventListener("click", async () => {
    showLoading();
    try {
        const requestUrl = `${API_BASE}/api/og/demo?simulate=crawler&title=${encodeURIComponent("Demo Merchant")}&t=${Date.now()}`;
        const svgRes = await fetch(requestUrl);
        const svgText = await svgRes.text();

        showResult(svgText, "MERCHANT 🟡", "var(--color-merchant)", svgRes, requestUrl);
    } catch (e) {
        console.error(e);
        loadingIndicator.innerText = "Error loading SVG";
    }
});

// ----------------------------------------------------
// Action: I'm a scraper (State 3 - Bandit)
// ----------------------------------------------------
btnBandit.addEventListener("click", async () => {
    showLoading();
    try {
        const requestUrl = `${API_BASE}/api/og?title=${encodeURIComponent("Stolen Asset")}&t=${Date.now()}`;
        const svgRes = await fetch(requestUrl);
        const svgText = await svgRes.text();

        showResult(svgText, "BANDIT 🏴", "var(--color-bandit)", svgRes, requestUrl);
    } catch (e) {
        console.error(e);
        loadingIndicator.innerText = "Error loading SVG";
    }
});
