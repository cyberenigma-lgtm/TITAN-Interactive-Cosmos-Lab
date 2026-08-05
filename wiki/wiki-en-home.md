# 🇬🇧 TITAN-LAB — English Wiki

## What is TITAN-LAB?
TITAN-Interactive-Cosmos-Lab is a real-time 3D cosmological simulation and astrophysics research laboratory built on WebGL + Three.js.

It integrates real astronomical catalogs (Hipparcos, NASA, SIMBAD, Gaia), orbital physics engines, and a planetary defense system based on the NASA/DART mission.

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
| ☄️ **NEO Radar** | Real-time tracking of Apophis, Bennu, 'Oumuamua, Halley, Eros |
| 🛡️ **DART Mission** | Kinetic impactor simulation with Dimorphos debris plume |
| 🕳️ **Black Holes** | Relativistic Sgr A*, M87*, TON 618 with accretion disk |
| 🌌 **Stellarium** | 1M star galactic volume + Hipparcos catalog + ZOA interpolation |
| ⏱️ **Chronograph** | Bidirectional time travel: Big Bang → year 7000 AD |
| 🔬 **DVTRGAS** | L₂/L∞ spatial topology physics engine (proprietary core) |
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
