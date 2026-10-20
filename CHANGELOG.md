# CHANGELOG — APOCALYPSE ENGINE
> Autor y Creador Original: José Manuel  
> Copyright © 2026 José Manuel. Todos los derechos reservados.

---

## [v75] — 2026-10-21 — Core C99 Native Overhaul, Planetarium 2.0 & Astrophotographic Master Update
### 🎛️ Nuevos Menús y Navegación Universal
- **Menú Global `🕳️ AGUJEROS NEGROS ▾`**: Menú desplegable flotante con acceso instantáneo mediante Hyper-Warp relativista a cualquier agujero negro o singularidad del universo conocido (Sagitario A*, M87*, Cygnus X-1, Gaia BH1, Gargantúa, TON 618, Stephenson 2-18, y Nebulosa del Cangrejo M1) sin reiniciar el foco de la cámara en el origen `(0, 0, 0)`.
- **Modo Stellarium en `🌍 STREET VIEW DEL CIELO`**: Nuevo control `[ ATMÓSFERA ]` y atajo de teclado tecla `A` que alterna entre la cúpula diurna de dispersión Rayleigh y la visualización de la bóveda estelar diurna a plena luz del sol con telemetría de elevación solar y horizonte astronómico en tiempo real.
- **Selector de Renderizado `🔭 OBSERVATORIO / CINEMATOGRÁFICO`**: Conmutación inmediata entre Modo Observatorio (lineal, 0 Bloom, métrica plana de datos) y Modo Cinemático (ACES Filmic HDR, Bloom físico 1.75, grano analógico de 70mm, viñeteado anamórfico).
- **Control Unificado de Capas**: Toggles blindados para Catálogo Estelar (Hipparcos + SIMBAD), Agujeros Negros, Sistema Solar, Líneas Orbitales y Radar de Anomalías NEO.

### 🛠️ Correcciones y Calibración Física de Precisión
- **El Sol Fotorrealista**:
  - Eliminadas las texturas planas de miniaturas y los tubos toscos de protuberancias que generaban artefactos geométricos y apariencia de pelota de tenis.
  - Generador de Fotosfera 360° esférica con 5,000 células de granulación convectiva, manchas solares con umbra helio-fría, penumbra y fáculas brillantes magnéticas.
  - Corona solar esférica 3D omnidireccional con Fresnel (`THREE.BackSide` + `AdditiveBlending`) sin planos 2D que corten el disco.
  - Velocidad de rotación solar calibrada al período sidéreo ecuatorial real de **25.38 días** en tiempo real (modo LIVE).
- **Bug del Quad Blanco en Agujeros Negros**:
  - Resuelto el fallo de renderizado en Cygnus X-1 donde `THREE.Sprite` con `ShaderMaterial` se dibujaba como un rectángulo blanco opaco. Sustituido por `THREE.SpriteMaterial` nativo con gradiente radial de Anillo de Einstein fotométrico.
- **Constelaciones Oficiales UAI**:
  - Sustitución de las líneas aleatorias ("espaguetis") por los **66 segmentos de las 14 constelaciones clásicas de la UAI** (Osa Mayor / El Carro, Orión con su Cinturón, Casiopea 'W', Cisne / Cruz del Norte, Cruz del Sur, Tauro, Can Mayor con Sirio, Leo, Escorpio, Géminis, Pegaso completo con cabeza y patas, Lira con Vega, Boyero con Arturo).
- **Atmósfera Terrestre Realista**:
  - Calibración de la escala atmosférica a la física del limbo orbital de la ISS y misiones Apolo (espesor del 2.5% respecto al radio planetario), eliminando la burbuja azul sobredimensionada en el hemisferio nocturno.
- **Bólidos y Asteroides NEO**:
  - Sustituido el brillo amarillo fluorescente por material basáltico oscuro y condrítico realista (`roughness: 0.95`, `metalness: 0.05`, `emissive: 0x000000`). La emisión roja se reserva exclusivamente para rutas de impacto inminente (< 45 u).
- **Velocidad Orbital de Satélites**:
  - Calibrados satélites LEO y telescopio Hubble a mecánica orbital Kepleriana (~92 minutos de período sideral).
- **Eliminación de Píxeles Cuadrados**:
  - Reemplazadas partículas cuadradas en nubes de gas, pilares de nebulosa y polvo cósmico por texturas gaussianas circulares puras.

### 🌌 Inyección de Objetos de Cielo Profundo y Misiones
- **Nebulosa del Cangrejo (M1)**: Remanente de la supernova histórica SN 1054 a 6,500 ly, con filamentos ionizados volumétricos y el púlsar relativista central girando a 30.2 Hz.
- **Galaxia Espiral NGC 4380**: Galaxia espiral en Virgo a 52M ly con bulbo esférico de estrellas viejas K/M y brazos con líneas de polvo.
- **Saturno y Cassini-Huygens**: Sonda espacial en órbita kepleriana con enjambre de bólidos de hielo en los anillos de Saturno.

### ⚙️ Arquitectura de Cómputo ANSI C99 (Zero-Python)
- Eliminación de scripts heredados en Python; todo el backend de datos, cálculo orbital y servidor HTTP/WebSocket reside en C99 nativo (`titan_server.c`, `build_astronomy_catalogs.c`, `generate_iau_constellations.c`, `generate_cosmic_web.c`).

### 🗺️ Hoja de Ruta para Próximas Actualizaciones
- [ ] Conexión del núcleo nativo Ring-0 de DVTRGAS-30 a framebuffer directo (Vulkan / DirectX 12) para bypass de navegador web.
- [ ] Despacho de turbulencia magnetohidrodinámica en NPU local (45-163 TOPS).
- [ ] Simulación gravitacional N-Cuerpos para más de 100,000 asteroides en AVX2/AVX-512.
- [ ] Integración de audio binaural relativista (ondas gravitacionales / radiofrecuencias de púlsares en WebAudio).

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
