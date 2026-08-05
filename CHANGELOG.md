# CHANGELOG — APOCALYPSE ENGINE
> Autor y Creador Original: José Manuel  
> Copyright © 2026 José Manuel. Todos los derechos reservados.

---

## [v74] — 2026-08-06
### ✅ Añadido
- Firma digital de autoría en todos los archivos del proyecto (space_engine.js, index.html, style.css, server.py, fetch_nebulae.py, generate_cosmic_web.py, reconstruct_galaxy.py, nebula_photo_to_3d.py)
- Licencia propietaria con protección legal explícita (LICENSE)
- README.md con declaración de propiedad intelectual y advertencias legales
- Meta tag `author` en HTML apuntando al creador

### 🛠️ Corregido
- Motor temporal `updateTimelineUI()` blindado contra `RangeError` en fechas cósmicas extremas (Big Bang)
- Todos los event listeners del cronógrafo protegidos con guards `if (element)` para evitar null pointer

---

## [v73] — 2026-08-06
### ✅ Añadido
- Panel de Control Temporal Cósmico reemplaza el antiguo timeline
- Botones de dirección temporal: ◀◀ Retroceder, ⏸ Pausar, ▶▶ Avanzar
- Selector `📅 SALTAR A` con input datetime-local para saltar a cualquier fecha exacta
- Presets de Eras Cósmicas (Big Bang, Primeras Estrellas, Vía Láctea, Sistema Solar, Dinosaurios, Homo Sapiens, Presente, Año 7000 d.C.)
- Etiqueta dinámica de ERA CÓSMICA con color indicativo de la época activa
- Feedback visual en botones activos de dirección

### 🛠️ Corregido
- Bug crítico: el tiempo SIEMPRE avanzaba positivamente aunque se arrastrara el slider a la izquierda. Ahora el motor usa `timeDirection` (-1/0/1) multiplicado en el bucle animate

---

## [v72] — 2026-08-05
### ✅ Añadido
- Primera versión del panel de control temporal cósmico (sustituye el slider simple)
- Variables `timeDirection`, `cosmicOffset`, `applyEngineTime()`

---

## [v71] — 2026-08-05
### 🛠️ Corregido
- Error crítico TypeError en emissive: grupos Three.js (bólidos lobulados como Eros, Toutatis) no tienen `.material.emissive` directamente
- Implementada función global `setNEOColorAndEmissive()` que recorre recursivamente sub-mallas de objetos complejos
- Reemplazados todos los accesos directos a `.emissive.setHex()` por el helper seguro en: btn-focus-neo, launchDARTMission, animate loop de alertas de colisión

---

## [v70] — 2026-08-05
### ✅ Añadido
- Etiquetas de planetas, agujeros negros y exoplanetas clickables con Hyper-Warp integrado
- Al hacer clic en el nombre flotante de cualquier cuerpo celeste se inicia el vuelo en modo Hyper-Warp hacia él

---

## [v69] — 2026-08-04
### ✅ Añadido
- Modo Chase Cam 3D en vivo (Cámara Perseguidora de Bólidos)
- El toggle 👁 SEGUIR TRAYECTORIA ancla la cámara dinámicamente al bólido seleccionado
- Vector neón de trayectoria visible durante la persecución

---

## [v68] — 2026-08-04
### ✅ Añadido
- Geometrías NEO científicas dedicadas con modelos específicos:
  - 'Oumuamua (cigarro alargado 10:1 con tholinas rojizas)
  - Ryugu y Bennu (peonza/diamante ecuatorial)
  - Eros y Toutatis (cacahuate binario lobulado)
  - Halley, NEOWISE, Borisov (cometas con coma de gas cyan)
- Panel de Radar de Bólidos con filtros por clase (Apolo/Atón, Cometario, Interestelar)
- Rotación tumbling realista 3D para todos los NEOs

---

## [v67] — 2026-08-03
### ✅ Añadido
- Sistema de Defensa Planetaria DART:
  - Lanzamiento de sonda interceptora cinética desde la Tierra
  - Explosión con 250 partículas de escombros (modelo Dimorphos Ejecta Plume)
  - Desvío orbital con vector neón verde de seguridad
  - Simulación hipotética de colisión K-Pg con la Tierra

---

## [v66] — 2026-08-02
### ✅ Añadido
- Agujeros Negros Relativistas 3D (modelo Kip Thorne):
  - Sagitario A* (Centro galáctico, 4.3M masas solares)
  - M87* (Galaxia Virgo A)
  - Cygnus X-1 (Binaria de Rayos X)
  - TON 618 (Cuásar hipermasivo, 18.2B años luz)
  - Stephenson 2-18 (Hipergigante roja más grande conocida)
- Disco de acreción térmicamente activo en plano ecuatorial
- Anillo de fotones y horizonte de sucesos con lente gravitacional

---

## [v65] — 2026-08-01
### ✅ Añadido
- Catálogo Hipparcos integrado (estrellas reales con coordenadas y colores espectrales)
- Galaxia Volumétrica generativa (1 millón de estrellas)
- Extrapolación ZOA (Zone of Avoidance — masa faltante oculta por polvo galáctico)
- Modo Stellarium con bóveda celeste data-driven

---

## [v60-v64] — 2026-07
### ✅ Añadido
- Sistema Solar completo con texturas NASA (Mercurio a Plutón + Cinturón de Kuiper)
- Sistema Integral de Lunas (11 lunas orbitando planetas madre)
- Laboratorio DVTRGAS con topología métrica $L_2$ vs $L_\infty$ conmutable en tiempo real
- Shader Titan Relativista (post-procesado GPU de lente gravitacional)
- Hyper-Warp con interpolación Hermite
- Sistema de órbitas elípticas keplerianas

---

*Todos los derechos reservados — José Manuel — 2026*
