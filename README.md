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

<p align=`center`>
  <img src=`./public/screenshots/labos_dock.png` width=`85%` alt=`TITAN LabOS Environment` />
  <br><em>TITAN LabOS — entorno Data Science con apps arrastrables, integración NASA CNEOS y simulador N-Cuerpos.</em>
</p>
<hr>
<p align=`center`>
  <img src=`./public/screenshots/astrometry_mode.png` width=`85%` alt=`TITAN Astrometry Module` />
  <br><em>Analizador Espectral — detecta estrellas reales del Catálogo Gaia (83.467 astros) por clic con raycasting GPU.</em>
</p>
<hr>
<p align=`center`>
  <img src=`./public/screenshots/labos_nbody.png` width=`85%` alt=`TITAN N-Body Simulator` />
  <br><em>Simulador N-Cuerpos — espaguetización, chorros de plasma y destrucción de horizonte de sucesos en tiempo real.</em>
</p>
<hr>
<p align=`center`>
  <img src=`./public/screenshots/full_activation.png` width=`85%` alt=`TITAN Full Activation` />
  <br><em>Activación completa — 83.467 estrellas reales HYG/Gaia, Vía Láctea volumétrica, Telaraña Cósmica y sistema solar keplerian.</em>
</p>
<hr>
<p align=`center`>
  <img src=`./public/screenshots/blackhole.png` width=`85%` alt=`Sagittarius A*` />
  <br><em>Simulación relativista de Sagitario A* con horizonte de sucesos, disco de acreción y chorros de plasma.</em>
</p>

---

## 🇪🇸 Español

### 🎯 1. Objetivo del Proyecto
TITAN es un laboratorio de astrofísica computacional y simulación cosmológica orientado a investigación y divulgación científica. Conecta con bases de datos astronómicas reales (ESA Gaia, NASA JPL, SIMBAD) para ofrecer una experiencia científica de precisión.

---

### 🔬 2. Impacto Científico y Social
TITAN permite visualizar fenómenos astronómicos complejos, estudiar estructuras galácticas a escala real, analizar trayectorias NEO reales de la NASA y simular la termodinámica de agujeros negros. Su uso potencial incluye educación, investigación universitaria y divulgación científica.

---

### 🤝 3. Colaboración Abierta

- 💡 [Crear Propuesta de Función](https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab/issues/new)

---

### 🗺️ 4. Roadmap Público (2026–2027)

> **🚀 ACTUALIZACIÓN MAYOR (Agosto 2026) — Catálogo Gaia, TITAN Studio & Físicas Termodinámicas**
>
> **Catálogo Estelar Real (HYG / Gaia ESA):**
> El fondo del motor ya no es un skybox estático. Son **83.467 estrellas reales** del catálogo HYG (Hipparcos + Yale + Gliese), renderizadas como **Nube de Puntos GPU** con shader GLSL personalizado y color termodinámico real por clase espectral (O, B, A, F, G, K, M). Cada estrella es clicable devolviendo su ID HIP real, distancia en años luz, magnitud visual y clase espectral.
>
> **Física de Agujeros Negros Completa:**
> El motor N-Cuerpos aplica ahora consecuencias físicas a TODO objeto dentro del campo gravitatorio:
> - **Espaguetización geométrica** proporcional a la distancia al horizonte
> - **Fricción Térmica** — material emissive rojo/naranja candente
> - **Chorros de Plasma** — haz cian brillante (blending aditivo) conectando objeto con agujero negro
> - **Telemetría de Consola** — cada evento registrado con nombre, coordenadas y tipo de destrucción
> - **Horizonte de Sucesos** — los objetos son eliminados al cruzarlo con log de destrucción
>
> **TITAN Studio (Suite Científica Completa):**
> - 📏 **Telemetría Láser**: Mide distancias reales en Unidades Astronómicas (UA) entre cualquier par de cuerpos
> - ✨ **Fábrica de Materia**: Inyecta planetas, gigantes gaseosos y estrellas directamente en la simulación
> - 📸 **Estudio de Captura**: Exporta el framebuffer WebGL en PNG de alta resolución

- ✅ **[COMPLETADO]** Topología N-dimensional (cúbica, Manhattan, esférica) en tiempo real
- ✅ **[COMPLETADO]** Conexión API NASA JPL CNEOS — asteroides NEO reales con nombre y velocidad
- ✅ **[COMPLETADO]** **Catálogo HYG/Gaia: 83.467 estrellas reales — Point Cloud GPU con shader termodinámico**
- ✅ **[COMPLETADO]** **Física termodinámica completa (Espaguetización + Plasma Jets + Horizonte de Sucesos)**
- ✅ **[COMPLETADO]** **TITAN Studio: Telemetría Láser + Fábrica de Materia + Captura de Imágenes**
- ✅ **[COMPLETADO]** **Astrometría avanzada: identifica estrellas reales Gaia por clic en Point Cloud**
- ✅ **[COMPLETADO]** **Corrección de coordenadas mundiales WebGL (getWorldPosition) para físicas precisas**
- 🚀 **[EN DESARROLLO]** TITAN-CRAFT: Nave pilotable 6DOF con inercia y económia espacial
- 🎮 **[EN DESARROLLO]** Motor RPG: Descubrimientos, XP y desbloqueo de naves
- 🌌 Módulo galáctica: Andrómeda M31 y Grupo Local completo
- 🪐 Simulador de atmósferas exoplanetarias y espectrometría 3D

---

### 🎓 5. Licencia de Uso Institucional
Las instituciones educativas y científicas pueden solicitar acceso extendido. Para acuerdos institucionales, contactar al autor mediante los canales del repositorio.

---

### 🏆 6. Elegibilidad para Subvenciones
TITAN cumple los requisitos para ayudas de innovación tecnológica, divulgación científica, investigación universitaria y programas europeos (Creative Europe, Horizon).

---

### 🧩 7. Arquitectura del Sistema
```
/ApocalypseEngine
  /public
    index.html              ← Interfaz principal del laboratorio
    space_engine.js         ← Motor de renderizado 3D WebGL y físicas (320KB)
    lab_apps.js             ← TITAN Studio (Astrometría, N-Cuerpos, Telemetría, Captura)
    titan_game_layer.js     ← Módulo de vuelo espacial y RPG
    style.css               ← Sistema de diseño glassmorphism / cyberpunk
    /textures               ← Texturas planetarias NASA
    /data
      gaia_stars.json       ← 83.467 estrellas reales (HYG: Hipparcos + Yale + Gliese)
      hipparcos.json        ← Catálogo fotométrico Hipparcos (~120k puntos)
      milky_way.bin         ← Reconstrucción volumétrica Vía Láctea (1M puntos)
      cosmic_web.bin        ← Filamentos del Universo Observable
  /scripts
    fetch_gaia_data.py      ← Descargador automático catálogo HYG (ESA/Gaia)
  /core                     ← Núcleo DVTRGAS [PROPIETARIO — No publicado]
  server.py                 ← Servidor API datos astronómicos (Python)
```

---

### 🛡️ 8. Derechos de Autor
> **⚠️ ADVERTENCIA LEGAL:** Este proyecto es **propiedad intelectual exclusiva** de **José Manuel**.

Queda PROHIBIDO copiar, redistribuir, modificar, usar comercialmente o reclamar autoría del código. Consulta [LICENSE](./LICENSE) para los términos completos.

---

### 🚀 9. Ejecución Local
```bash
# 1. Clonar
git clone https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab.git

# 2. Iniciar servidor (descarga catálogo Gaia automáticamente la primera vez)
python server.py

# 3. Abrir en el navegador
http://localhost:8080
```

---

## 🇬🇧 English

### 🎯 1. Project Goal
TITAN is a computational astrophysics and cosmological simulation laboratory connected to real astronomical databases (ESA Gaia, NASA JPL, SIMBAD) for scientifically accurate, interactive exploration of the universe.

---

### 🔬 2. Scientific & Social Impact
TITAN visualizes complex astronomical phenomena, real galactic structures, real NASA NEO trajectories, and black hole thermodynamics. Applications include education, university research, and scientific outreach.

---

### 🗺️ 3. Public Roadmap (2026–2027)

> **🚀 MAJOR UPDATE (August 2026) — Gaia Catalog, TITAN Studio & Thermodynamic Physics**
>
> **Real Star Catalog (HYG / Gaia ESA):**
> The engine background is no longer a static skybox. It now renders **83,467 real stars** from the HYG catalog (Hipparcos + Yale + Gliese) as a **GPU Point Cloud** with a custom GLSL shader and real thermodynamic color per spectral class (O, B, A, F, G, K, M). Every star is clickable, returning its real HIP ID, distance in light-years, visual magnitude, and spectral class.
>
> **Complete Black Hole Physics:**
> The N-Body engine now applies full thermodynamic consequences to ALL objects inside the gravitational field:
> - **Geometric Spaghettification** proportional to event horizon proximity
> - **Thermal Friction** — red/orange emissive glow
> - **Plasma Jets** — bright cyan additive-blended beam connecting object to black hole
> - **Console Telemetry** — every event logged with name, coordinates, and destruction type
> - **Event Horizon** — objects are removed upon crossing with destruction log
>
> **TITAN Studio (Scientific Suite):**
> - 📏 **Laser Telemetry**: Measures real Astronomical Unit (AU) distances between any two bodies
> - ✨ **Matter Factory**: Injects planets, gas giants, and stars directly into the simulation
> - 📸 **Capture Studio**: Exports the WebGL GPU framebuffer as a full-resolution PNG

- ✅ **[COMPLETED]** Real-time N-dimensional topology panel (cubic, Manhattan, spherical)
- ✅ **[COMPLETED]** NASA JPL CNEOS async API — real NEO asteroids with name and velocity
- ✅ **[COMPLETED]** **HYG/Gaia catalog: 83,467 real stars — GPU Point Cloud with thermodynamic shader**
- ✅ **[COMPLETED]** **Complete thermodynamic physics (Spaghettification + Plasma Jets + Event Horizon)**
- ✅ **[COMPLETED]** **TITAN Studio: Laser Telemetry + Matter Factory + Image Capture**
- ✅ **[COMPLETED]** **Advanced Astrometry: identifies real Gaia stars by click on GPU Point Cloud**
- ✅ **[COMPLETED]** **WebGL world coordinate fix (getWorldPosition) for precise gravitational physics**
- 🚀 **[IN DEVELOPMENT]** TITAN-CRAFT: 6DOF pilotable ship with inertia and space economy
- 🎮 **[IN DEVELOPMENT]** RPG Engine: Discoveries, XP, and ship unlocking
- 🌌 Galactic expansion: Andromeda M31 and full Local Group
- 🪐 Exoplanetary atmosphere simulator and 3D spectrometry

---

### 🏆 4. Grant & Funding Eligibility
TITAN meets criteria for technological innovation, scientific outreach, university research, and European programs (Creative Europe, Horizon Europe).

---

### 🧩 5. System Architecture
```
/ApocalypseEngine
  /public
    index.html              ← Main laboratory interface
    space_engine.js         ← 3D WebGL rendering & physics engine (320KB)
    lab_apps.js             ← TITAN Studio (Astrometry, N-Body, Telemetry, Capture)
    titan_game_layer.js     ← Space flight & RPG progression module
    style.css               ← Glassmorphism & cyberpunk UI design system
    /textures               ← NASA planetary textures
    /data
      gaia_stars.json       ← 83,467 real stars (HYG: Hipparcos + Yale + Gliese)
      hipparcos.json        ← Hipparcos photometric catalog (~120k points)
      milky_way.bin         ← Volumetric Milky Way reconstruction (1M points)
      cosmic_web.bin        ← Observable Universe galactic filaments
  /scripts
    fetch_gaia_data.py      ← Auto-downloader for HYG/Gaia catalog
  /core                     ← DVTRGAS backend core [PROPRIETARY — Not Published]
  server.py                 ← Astronomical data API server (Python)
```

---

### 🛡️ 6. Copyright & Intellectual Property
> **⚠️ LEGAL NOTICE:** This project is the **exclusive intellectual property** of **José Manuel**.

It is strictly **PROHIBITED** to copy, redistribute, modify, use commercially, or claim authorship of the code. See [LICENSE](./LICENSE) for complete legal terms.

---

### 🚀 7. Local Setup
```bash
# 1. Clone repository
git clone https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab.git

# 2. Start data server (auto-downloads Gaia catalog on first run)
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
