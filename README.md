# 🌌 APOCALYPSE ENGINE
> **Author & Creator:** José Manuel (`cyberenigma-lgtm`)  
> **Copyright © 2026 José Manuel. All Rights Reserved.**  
> **License:** Private Intellectual Property (Usage Prohibited Without Express Authorization)

---

## 🌐 Language Selector / Selección de Idioma
- 🇪🇸 [Leer en Español](#-español)
- 🇬🇧 [Read in English](#-english)

---

## 📸 Showcase & Screenshots

<p align="center">
  <img src="./public/screenshots/system_overview.png" width="85%" alt="System Overview" />
  <br><em>General view of the 3D simulation with Keplerian orbits & live Titan Console / Vista general de la simulación 3D con órbitas keplerianas y consola Titan en vivo.</em>
</p>

<hr>

<p align="center">
  <img src="./public/screenshots/earth_moon.png" width="85%" alt="Earth & Moon Telemetry" />
  <br><em>Earth and Moon with dynamic camera telemetry & metric vectorization / Tierra y Luna con telemetría dinámica de distancia y vectorización métrica.</em>
</p>

<hr>

<p align="center">
  <img src="./public/screenshots/neo_radar.png" width="85%" alt="NEO Radar & Defense" />
  <br><em>Real-time radar & kinetic defense panel against NEO anomalies (DART Mission) / Radar en tiempo real y panel de defensa cinemática contra anomalías NEO (Misión DART).</em>
</p>

<hr>

<p align="center">
  <img src="./public/screenshots/blackhole.png" width="85%" alt="Sagittarius A* Event Horizon" />
  <br><em>Relativistic simulation of the supermassive black hole Sagittarius A* / Simulación relativista del agujero negro supermasivo Sagitario A*.</em>
</p>

<hr>

<p align="center">
  <img src="./public/screenshots/jupiter.png" width="85%" alt="Jupiter System" />
  <br><em>Orbital visualization of the gas giant Jupiter and Galilean moons / Visualización orbital del gigante gaseoso Júpiter y sus satélites galileanos.</em>
</p>

---

## 🇪🇸 Español

### 🔭 ¿Qué es el Apocalypse Engine?
**Apocalypse Engine** es un simulador cosmológico interactivo en tiempo real construido sobre **WebGL + Three.js**, que integra datos astronómicos reales, motores de físicas orbitales y un sistema de defensa planetaria basado en la misión NASA/DART.

Permite explorar el Sistema Solar, la Vía Láctea, agujeros negros supermasivos y miles de millones de años de historia cósmica, todo directamente desde el navegador web.

### 🧩 Arquitectura del Sistema
```
/ApocalypseEngine
  /public
    index.html        ← Interfaz principal del laboratorio
    space_engine.js   ← Motor de renderizado 3D y físicas (226KB)
    style.css         ← Sistema de diseño visual glassmorphism / cyberpunk
    /textures         ← Mapas de textura planetaria (NASA)
    /data             ← Catálogos astronómicos reales (Hipparcos, Nebulosas)
  /core               ← Núcleo backend DVTRGAS [PROPIETARIO - No publicado]
  server.py           ← Servidor API de datos astronómicos
  fetch_nebulae.py    ← Generador de catálogo de nebulosas 3D
  generate_cosmic_web.py ← Generador de filamentos galácticos
  reconstruct_galaxy.py  ← Reconstructor galáctico volumétrico
  nebula_photo_to_3d.py  ← Extractor de nubes 3D desde fotos NASA/Hubble/JWST
  LICENSE             ← Licencia legal de uso restringido
  CHANGELOG.md        ← Historial de versiones y commits
```

### ⚙️ Características Principales
| Módulo | Descripción |
|:---|:---|
| 🪐 **Sistema Solar Dinámico** | Planetas texturizados con sus lunas reales en órbita kepleriana |
| ☄️ **Radar de Bólidos NEO** | Modelos 3D científicos de Apofis, 'Oumuamua, Ryugu, Eros, Halley, etc. |
| 🛡️ **Misión DART** | Interceptor cinético 3D, pluma de escombros Dimorphos y desvío orbital |
| 🕳️ **Agujeros Negros** | Sagitario A*, M87*, TON 618 con disco de acreción y anillo de fotones |
| 🌌 **Stellarium Mode** | Catálogo Hipparcos real + Galaxia Volumétrica 1M estrellas + ZOA |
| ⏱️ **Cronógrafo Cósmico** | Viaje temporal bidireccional desde el Big Bang hasta el año 7000 d.C. |
| 🔬 **Laboratorio DVTRGAS** | Motor de topología espacial con métricas $L_2$ y $L_\infty$ en tiempo real |
| 🚀 **Hyper-Warp** | Viaje entre objetivos a velocidad lumínica con interpolación Hermite |
| 🛰️ **Chase Cam 3D** | Cámara perseguidora que sigue bólidos en tránsito orbital activo |

### 🛡️ Derechos de Autor y Propiedad Intelectual
> **⚠️ ADVERTENCIA LEGAL:**  
> Este proyecto es **propiedad intelectual exclusiva** de **José Manuel**.

**Queda PROHIBIDO:**
- Copiar o reproducir el código, total o parcialmente.
- Redistribuir en cualquier forma o medio.
- Modificar o crear obras derivadas.
- Usar con fines comerciales o lucrativos.
- Integrar en otros motores o frameworks.
- Reclamar autoría o propiedad sobre el código.

Todos los archivos contienen **marcas de agua digitales** de autoría. Las infracciones serán perseguidas bajo la legislación española de propiedad intelectual y el **Convenio de Berna**. Consulta el archivo [LICENSE](./LICENSE) para los términos completos.

### 🚀 Ejecución Local
```bash
# 1. Clonar el repositorio
git clone https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab.git

# 2. Iniciar el servidor de datos
python server.py

# 3. Abrir en el navegador
http://localhost:8080
```

---

## 🇬🇧 English

### 🔭 What is the Apocalypse Engine?
**Apocalypse Engine** is an interactive real-time cosmological simulator built on **WebGL + Three.js**, integrating real astronomical data, orbital physics engines, and a planetary defense system based on the NASA/DART mission.

It allows you to explore the Solar System, the Milky Way, supermassive black holes, and billions of years of cosmic history, all straight from your web browser.

### 🧩 System Architecture
```
/ApocalypseEngine
  /public
    index.html        ← Main laboratory interface
    space_engine.js   ← 3D Rendering & physics engine (226KB)
    style.css         ← Glassmorphism & cyberpunk UI styling
    /textures         ← NASA planetary textures
    /data             ← Real astronomical catalogs (Hipparcos, Nebulae)
  /core               ← DVTRGAS backend core [PROPRIETARY - Not Published]
  server.py           ← Astronomical data API server
  fetch_nebulae.py    ← 3D Nebulae catalog generator
  generate_cosmic_web.py ← Cosmic web filament generator
  reconstruct_galaxy.py  ← Volumetric galaxy reconstructor
  nebula_photo_to_3d.py  ← 3D point cloud extractor from NASA/Hubble/JWST photos
  LICENSE             ← Restricted legal license
  CHANGELOG.md        ← Version history
```

### ⚙️ Key Features
| Module | Description |
|:---|:---|
| 🪐 **Dynamic Solar System** | Textured planets with real moons in Keplerian orbits |
| ☄️ **NEO Asteroid Radar** | Scientific 3D models of Apophis, 'Oumuamua, Ryugu, Eros, Halley, etc. |
| 🛡️ **DART Mission** | 3D kinetic interceptor, Dimorphos debris plume, and orbital deflection |
| 🕳️ **Relativistic Black Holes** | Sagittarius A*, M87*, TON 618 with accretion disk and photon ring |
| 🌌 **Stellarium Mode** | Real Hipparcos catalog + 1M Star Volumetric Galaxy + ZOA |
| ⏱️ **Cosmic Chronograph** | Bidirectional time travel from the Big Bang to the year 7000 AD |
| 🔬 **DVTRGAS Lab** | Spatial topology engine with real-time $L_2$ and $L_\infty$ metrics |
| 🚀 **Hyper-Warp** | Point-to-point light-speed travel with Hermite interpolation |
| 🛰️ **Chase Cam 3D** | Dynamic chase camera tracking bolides in active orbital transit |

### 🛡️ Copyright and Intellectual Property
> **⚠️ LEGAL NOTICE:**  
> This project is the **exclusive intellectual property** of **José Manuel**.

**It is strictly PROHIBITED to:**
- Copy or reproduce the code, in whole or in part.
- Redistribute in any form or medium.
- Modify, transform, or create derivative works.
- Use for commercial or lucrative purposes.
- Integrate into other engines or frameworks.
- Claim authorship or ownership of the code.

All files contain **digital watermarks** for authorship tracking. Violations will be prosecuted under Spanish Intellectual Property Law and the **Berne Convention**. See the [LICENSE](./LICENSE) file for full terms.

### 🚀 Local Setup
```bash
# 1. Clone the repository
git clone https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab.git

# 2. Start the data server
python server.py

# 3. Open in browser
http://localhost:8080
```

---

*Created with scientific precision and cosmological vision by **José Manuel** — 2026*
