# 🇬🇧 TITAN-LAB — English Wiki

## What is TITAN-LAB?
TITAN-Interactive-Cosmos-Lab is a real-time 3D cosmological simulation and astrophysics research laboratory built on WebGL + Three.js.

It integrates real astronomical catalogs (Hipparcos, NASA JPL, SIMBAD, Gaia), interactive orbital physics engines, asynchronous asteroid telemetry, and a **TITAN LabOS** operational environment for in-situ physical experimentation.

---

## Getting Started

### Requirements
- Python 3.9+
- Modern web browser (Chrome/Firefox recommended)
- Internet connection (for CDN Three.js)

### Installation
```bash
git clone https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab.git
cd TITAN-Interactive-Cosmos-Lab
python server.py
# Open http://localhost:8080
```

---

## Key Modules

| Module | Description |
|:---|:---|
| 🪐 **Solar System** | Keplerian orbits with NASA-textured planets and real moons |
| 🛰️ **NEO Radar (NASA JPL)** | Real-time CNEOS telemetry: Distance and $v\_rel$ of actual asteroids |
| 🛡️ **DART Mission** | Kinetic impactor simulation with Dimorphos debris plume |
| 🕳️ **TITAN LabOS** | Experimental environment (Data Science UI) with draggable App Dock |
| 🌌 **Stellarium** | 1M star galactic volume + Hipparcos catalog + ZOA interpolation |
| ⏱️ **Chronograph** | Bidirectional time travel: Big Bang → year 7000 AD |
| 🔬 **N-Body Physics** | Black hole injection, orbital spaghettification, and planetary thermal friction |
| 🚀 **Hyper-Warp** | Hermite-interpolated light-speed travel between targets |

---

## Architecture

```
/public
  index.html       ← Laboratory UI (Glassmorphism/Cyberpunk)
  space_engine.js  ← Core 3D engine (Three.js WebGL)
  style.css        ← Design system
  /textures        ← NASA planetary maps
  /data            ← Astronomical catalogs (JSON)
/core              ← DVTRGAS engine [PROPRIETARY]
server.py          ← Python API server
```

---

## Contributing
See the [Contributing Guide](wiki-en-contributing) for full details.

---

## License
See [LICENSE](../LICENSE) for legal terms.

> **Author:** José Manuel (`cyberenigma-lgtm`) — 2026
