# 🇪🇸 TITAN-LAB — Wiki en Español

## ¿Qué es TITAN-LAB?
TITAN-Interactive-Cosmos-Lab es un laboratorio de astrofísica computacional y simulación cosmológica en tiempo real, construido sobre WebGL + Three.js.

Integra catálogos astronómicos reales (Hipparcos, NASA, SIMBAD, Gaia), motores de física orbital y un sistema de defensa planetaria basado en la misión NASA/DART.

---

## Primeros Pasos

### Requisitos
- Python 3.9+
- Navegador moderno (Chrome/Firefox recomendado)
- Conexión a internet (para Three.js CDN)

### Instalación
```bash
git clone https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab.git
cd TITAN-Interactive-Cosmos-Lab
python server.py
# Abrir http://localhost:8080
```

---

## Módulos Principales

| Módulo | Descripción |
|:---|:---|
| 🪐 **Sistema Solar** | Órbitas keplerianas con planetas texturizados NASA y lunas reales |
| ☄️ **Radar NEO** | Seguimiento en tiempo real de Apofis, Bennu, 'Oumuamua, Halley, Eros |
| 🛡️ **Misión DART** | Simulación de interceptor cinético con pluma de escombros de Dimorphos |
| 🕳️ **Agujeros Negros** | Sgr A*, M87*, TON 618 relativistas con disco de acreción |
| 🌌 **Stellarium** | Galaxia volumétrica 1M estrellas + catálogo Hipparcos + extrapolación ZOA |
| ⏱️ **Cronógrafo** | Viaje temporal bidireccional: Big Bang → año 7000 d.C. |
| 🔬 **DVTRGAS** | Motor de topología espacial L₂/L∞ (núcleo propietario) |
| 🚀 **Hyper-Warp** | Viaje a velocidad de la luz con interpolación Hermite entre objetivos |

---

## Arquitectura del Sistema

```
/public
  index.html       ← Interfaz del Laboratorio (Glassmorphism/Cyberpunk)
  space_engine.js  ← Motor 3D principal (Three.js WebGL)
  style.css        ← Sistema de diseño
  /textures        ← Texturas NASA planetarias
  /data            ← Catálogos astronómicos (JSON)
/core              ← Motor DVTRGAS [PROPIETARIO]
server.py          ← Servidor API Python
```

---

## Contribuir al Proyecto
Ver la [Guía de Contribución](wiki-en-contributing) para detalles completos.

---

## Licencia
Ver [LICENSE](../LICENSE) para los términos legales.

---

## Elegibilidad para Subvenciones
TITAN-LAB es elegible para financiación de:
- Programas europeos: Horizon Europe, Creative Europe
- Ayudas de innovación tecnológica y divulgación científica
- Convenios universitarios de investigación
- Proyectos de software científico abierto

> **Autor:** José Manuel (`cyberenigma-lgtm`) — 2026
