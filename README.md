# 🌌 APOCALYPSE ENGINE
### Simulador Cosmológico y Motor de Defensa Planetaria 3D

> **Autor y Creador Original:** José Manuel Moreno Cano  
> **Alias:** cyberenigma-lgtm  
> **Copyright © 2026 José Manuel Moreno Cano. Todos los derechos reservados.**  
> **Licencia:** Propiedad Intelectual Privada — Uso Prohibido Sin Autorización

---

## 🔭 ¿Qué es el Apocalypse Engine?

**Apocalypse Engine** es un simulador cosmológico interactivo en tiempo real construido sobre **WebGL + Three.js**, que integra datos astronómicos reales, motores de físicas orbitales y un sistema de defensa planetaria basado en la misión NASA/DART.

Permite explorar el Sistema Solar, la Vía Láctea, agujeros negros supermasivos y miles de millones de años de historia cósmica, todo desde un navegador web.

---

## 🧩 Arquitectura del Sistema

```
/ApocalypseEngine
  /public
    index.html        ← Interfaz principal del laboratorio
    space_engine.js   ← Motor de renderizado 3D y físicas (226KB)
    style.css         ← Sistema visual glassmorphism/cyberpunk
    /textures         ← Mapas de textura planetaria (NASA)
    /data             ← Catálogos astronómicos (Hipparcos, Nebulosas)
  /core               ← Núcleo backend DVTRGAS [PROPIETARIO - No publicado]
  server.py           ← Servidor API de datos astronómicos
  fetch_nebulae.py    ← Generador catálogo nebulosas 3D
  generate_cosmic_web.py ← Generador filamentos galácticos
  reconstruct_galaxy.py  ← Reconstructor volumétrico de galaxias
  nebula_photo_to_3d.py  ← Extractor 3D desde fotos NASA/Hubble/JWST
  LICENSE             ← Licencia de uso restringido
  CHANGELOG.md        ← Historial de versiones
```

---

## ⚙️ Características Principales

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
| 🛰️ **Chase Cam 3D** | Cámara perseguidora que sigue bólidos en tránsito orbital |

---

## 🛡️ Derechos de Autor y Propiedad Intelectual

> **⚠️ ADVERTENCIA LEGAL:**  
> Este proyecto es **propiedad intelectual exclusiva** de **José Manuel Moreno Cano**.

**Queda PROHIBIDO:**
- Copiar o reproducir el código, total o parcialmente
- Redistribuir en cualquier forma o medio
- Modificar o crear obras derivadas
- Usar con fines comerciales
- Integrar en otros motores o frameworks
- Reclamar autoría o propiedad sobre el código

Todos los archivos contienen **marcas de agua digitales** de autoría.  
Las infracciones serán perseguidas bajo la legislación española de propiedad intelectual y el **Convenio de Berna**.

Consulta el archivo [LICENSE](./LICENSE) para los términos completos.

---

## 🧬 Módulos Propietarios (No Publicados)

Los siguientes componentes son de nivel crítico y **no están incluidos** en este repositorio:

- Motor DVTRGAS completo (métricas topológicas avanzadas)
- Predictor NEO de impacto planetario
- Módulo de topología multiversal
- Consola interna TITAN
- Base de datos de conocimiento astronómico privado

---

## 🚀 Ejecución Local

```bash
# Clonar el repositorio
git clone https://github.com/cyberenigma-lgtm/ApocalypseEngine.git

# Iniciar el servidor de datos
python server.py

# Abrir en el navegador
http://localhost:8080
```

---

## 📋 Historial de Versiones

Ver [CHANGELOG.md](./CHANGELOG.md) para el historial completo de cambios.

---

*Creado con precisión científica y visión cosmológica por **José Manuel Moreno Cano** — 2026*
