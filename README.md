<div align="center">
  <h1>Cortana Living Audio</h1>
  <p>Real-time voice chat with AI + immersive 3D audio-reactive visuals</p>
</div>

## Quick Start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` and add your Gemini API key:
   ```bash
   GEMINI_API_KEY=your_api_key_here
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open the app at `http://localhost:3000` and allow microphone access.

## Controls

- Start: begin sending your mic audio to the AI in real time
- Stop: stop capturing and streaming microphone audio
- Reset: reconnect the live AI session and clear state

## What You Get

- Live conversation with Google Gemini (audio-in, audio-out)
- 3D visualization that reacts to both your voice and the AI’s voice
- Smooth WebGL rendering with bloom and environment lighting

## Tech Stack

- Lit (Web Components)
- Web Audio API, MediaDevices
- Three.js (WebGL), custom GLSL shaders
- Vite + TypeScript
- Google GenAI live audio API

## Environment

- `GEMINI_API_KEY` is injected at build time via Vite. Keep this key safe.
- Works best on modern Chromium-based browsers. Requires mic permissions and a secure context (localhost is OK).

## Scripts

- `npm run dev` – start the development server
- `npm run build` – build for production
- `npm run preview` – preview the production build

## Architecture

See the full system overview and Mermaid diagram in `system-architecture.md`.

## Troubleshooting

- Mic not working: ensure you granted permissions and the page is served from localhost or HTTPS.
- No AI audio: verify `GEMINI_API_KEY` is set and valid.
- Performance issues: close heavy tabs; ensure hardware acceleration is enabled in your browser.

---

Made with ❤️ for real-time AI + graphics experiments.
