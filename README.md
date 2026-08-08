# 🌌 APOCALYPSE ENGINE / TITAN-LAB
> **Author & Creator / Autor:** José Manuel (`cyberenigma-lgtm`)  
> **Copyright © 2026 José Manuel. All Rights Reserved / Todos los Derechos Reservados.**  
> **License:** Private Intellectual Property (Open Educational & Institutional Access).
> **https://cyberenigma-lgtm.github.io/TITAN-Interactive-Cosmos-Lab/**

---

## 🌐 Language Selector / Selección de Idioma
- 🇪🇸 [Leer en Español](#-español)
- 🇬🇧 [Read in English](#-english)

---

## 📸 Showcase & Screenshots / Galería del Laboratorio

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

---

## 🇪🇸 Español

### 🎯 1. Objetivo del Proyecto
TITAN-Interactive-Cosmos-Lab es un laboratorio de astrofísica computacional y simulación cosmológica orientado a investigación, divulgación científica y desarrollo tecnológico. Su propósito es facilitar el estudio del universo mediante herramientas interactivas, modelos físicos avanzados y módulos de análisis espacial.

---

### 🔬 2. Impacto Científico y Social
TITAN permite visualizar fenómenos astronómicos complejos, estudiar estructuras galácticas, analizar trayectorias NEO y simular eventos de impacto. Su uso potencial incluye educación, investigación universitaria, divulgación científica y desarrollo de herramientas de defensa planetaria.

---

### 🤝 3. Colaboración Abierta
El laboratorio TITAN acepta contribuciones de desarrolladores, físicos, matemáticos, artistas digitales y divulgadores. Las propuestas de mejora, módulos adicionales y nuevas funciones son bienvenidas mediante issues y pull requests.

- 💡 [Crear Propuesta de Función u Optimización](https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab/issues/new)
- 📜 [Normas de Contribución y Código de Conducta](#-normas-de-contribución)

---

### 🗺️ 4. Roadmap Público (2026–2027)
- ✅ **[COMPLETADO]** Panel de topología cúbica ($L_\infty$), Manhattan y esférica ($L_2$) en tiempo real (aplicable a agujeros negros, exoplanetas y discos de acreción).
- 🚀 **[EN DESARROLLO]** Módulo de Vuelo Espacial TITAN-CRAFT (Nave pilotable 6DOF con inercia y físicas).
- 🎮 **[EN DESARROLLO]** Módulo de Progresión RPG (Motor de descubrimientos, XP y desbloqueo de naves).
- 🌌 Módulo de expansión galáctica y cúmulo del Grupo Local (Andrómeda M31).
- 🪐 Simulador de atmósferas exoplanetarias y espectrometría 3D.
- ☄️ Radar NEO avanzado con cálculo de masa y probabilidad de colisión K-Pg.
- 🪐 Generador de exosistemas persistentes.
- 🔭 Integración con bases de datos astronómicas internacionales (SIMBAD, Gaia, IAU).

---

### 🎓 5. Licencia de Uso Institucional
Las instituciones educativas y científicas pueden solicitar acceso extendido al laboratorio TITAN para proyectos de investigación, divulgación o docencia. Para acuerdos institucionales, contactar al autor mediante los canales del repositorio.

---

### 📩 6. Cómo Proponer Colaboración
Las propuestas de uso, investigación o desarrollo pueden enviarse mediante:
- Issues del repositorio
- Pull requests
- Contacto directo con el autor
- Documentos de propuesta formal

---

### 🏆 7. Elegibilidad para Subvenciones
TITAN cumple los requisitos para ayudas de:
- Innovación tecnológica
- Divulgación científica
- Proyectos culturales digitales
- Investigación universitaria
- Desarrollo de software científico
- Programas europeos (Creative Europe, Horizon)

---

### 🧩 8. Arquitectura del Sistema
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

---

### 🛡️ 9. Derechos de Autor y Propiedad Intelectual
> **⚠️ ADVERTENCIA LEGAL:** Este proyecto es **propiedad intelectual exclusiva** de **José Manuel**.

**Queda PROHIBIDO:**
- Copiar o reproducir el código, total o parcialmente.
- Redistribuir en cualquier forma o medio.
- Modificar o crear obras derivadas.
- Usar con fines comerciales o lucrativos.
- Integrar en otros motores o frameworks.
- Reclamar autoría o propiedad sobre el código.

Todos los archivos contienen **marcas de agua digitales** de autoría. Consulta el archivo [LICENSE](./LICENSE) para los términos completos.

---

### 🚀 10. Ejecución Local
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

### 🎯 1. Project Goal
TITAN-Interactive-Cosmos-Lab is a computational astrophysics and cosmological simulation laboratory aimed at research, scientific outreach, and technological development. Its purpose is to facilitate the study of the universe through interactive tools, advanced physical models, and spatial analysis modules.

---

### 🔬 2. Scientific & Social Impact
TITAN allows visualization of complex astronomical phenomena, study of galactic structures, analysis of NEO trajectories, and simulation of impact events. Potential applications include education, university research, scientific communication, and planetary defense tool development.

---

### 🤝 3. Open Collaboration
The TITAN laboratory welcomes contributions from developers, physicists, mathematicians, digital artists, and science communicators. Improvement proposals, additional modules, and new features are welcome via issues and pull requests.

- 💡 [Submit Feature Request or Proposal](https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab/issues/new)
- 📜 [Contribution Guidelines](#-open-collaboration)

---

### 🗺️ 4. Public Roadmap (2026–2027)
- ✅ **[COMPLETED]** Real-time cubic ($L_\infty$), Manhattan, and spherical ($L_2$) topology panel (applied to black holes, exoplanets, and accretion disks).
- 🚀 **[IN DEVELOPMENT]** TITAN-CRAFT Spacecraft Module (6DOF pilotable ship with inertia & physics).
- 🎮 **[IN DEVELOPMENT]** RPG Progression Module (Discovery engine, XP system, and ship unlocking).
- **Multiversal Topology**: Expansion of the local macro-universe.
- **🎮 NEW: TITAN-CRAFT (GameLayer)**: A procedural space game engine injected onto the physics simulator. Features free flight (IXS Enterprise), cockpit view (1st/3rd person), Fog of War, Discovery Radar (XP), Scrap Economy (OGame Style), Golden Mines (Multipliers), and an **Infinite Procedural Universe** powered by Chunks that generates galaxies in real-time as you travel into deep space. Group cluster (Andromeda M31).
- 🪐 Exoplanetary atmosphere simulator and 3D spectrometry.
- ☄️ Advanced NEO radar with mass calculation and impact probability.
- 🪐 Persistent exosystem generator.
- 🔭 Integration with international astronomical databases (SIMBAD, Gaia, IAU).

---

### 🎓 5. Institutional License & Usage
Educational and scientific institutions can request extended access to the TITAN laboratory for research, outreach, or teaching projects. For institutional agreements, contact the author through the repository channels.

---

### 📩 6. How to Propose Collaboration
Proposals for usage, research, or development can be submitted via:
- Repository Issues
- Pull Requests
- Direct contact with the author
- Formal proposal documents

---

### 🏆 7. Grant & Funding Eligibility
TITAN meets the eligibility criteria for funding in:
- Technological innovation
- Scientific dissemination & outreach
- Digital cultural projects
- University & academic research
- Scientific software development
- European programs (Creative Europe, Horizon Europe)

---

### 🧩 8. System Architecture
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

---

### 🛡️ 9. Copyright & Intellectual Property
> **⚠️ LEGAL NOTICE:** This project is the **exclusive intellectual property** of **José Manuel**.

**It is strictly PROHIBITED to:**
- Copy or reproduce the code, in whole or in part.
- Redistribute in any form or medium.
- Modify, transform, or create derivative works.
- Use for commercial or lucrative purposes.
- Integrate into other engines or frameworks.
- Claim authorship or ownership of the code.

See the [LICENSE](./LICENSE) file for complete legal terms.

---

### 🚀 10. Local Setup
```bash
# 1. Clone repository
git clone https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab.git

# 2. Start data server
python server.py

# 3. Open in browser
http://localhost:8080
```

---

*Created with scientific precision and cosmological vision by / Creado por **José Manuel** — 2026*


## 🏆 Ránking Global de Pilotos (En Vivo)
<!-- RANKING_START -->
| Rango | Callsign (Piloto) | Nivel | Experiencia (XP) |
| :---: | :--- | :---: | :---: |
| 🥇 | **Piloto_2823** | 2 | 1742 |
| 🥈 | **cyberenigma-lgt** | 1 | 450 |

<!-- RANKING_END -->
