# 🇫🇷 TITAN-LAB — Wiki en Français

## Qu'est-ce que TITAN-LAB ?
TITAN-Interactive-Cosmos-Lab est un laboratoire d'astrophysique computationnelle et de simulation cosmologique en temps réel, construit sur WebGL + Three.js.

Il intègre de vrais catalogues astronomiques (Hipparcos, NASA, SIMBAD, Gaia), des moteurs de physique orbitale et un système de défense planétaire basé sur la mission NASA/DART.

---

## Démarrage Rapide

### Prérequis
- Python 3.9+
- Navigateur moderne (Chrome/Firefox recommandé)
- Connexion internet (pour Three.js CDN)

### Installation
```bash
git clone https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab.git
cd TITAN-Interactive-Cosmos-Lab
python server.py
# Ouvrir http://localhost:8080
```

---

## Modules Principaux

| Module | Description |
|:---|:---|
| 🪐 **Système Solaire** | Orbites keplériennes avec planètes texturées NASA et vraies lunes |
| ☄️ **Radar NEO** | Suivi en temps réel d'Apophis, Bennu, 'Oumuamua, Halley, Eros |
| 🛡️ **Mission DART** | Simulation d'intercepteur cinétique avec panache de débris de Dimorphos |
| 🕳️ **Trous Noirs** | Sgr A*, M87*, TON 618 relativistes avec disque d'accrétion |
| 🌌 **Stellarium** | Galaxie volumétrique 1M étoiles + catalogue Hipparcos + extrapolation ZOA |
| ⏱️ **Chronographe** | Voyage temporel bidirectionnel : Big Bang → an 7000 après J.-C. |
| 🔬 **DVTRGAS** | Moteur de topologie spatiale L₂/L∞ (cœur propriétaire) |
| 🚀 **Hyper-Warp** | Voyage à la vitesse de la lumière avec interpolation Hermite |

---

## Architecture du Système

```
/public
  index.html       ← Interface du Laboratoire (Glassmorphism/Cyberpunk)
  space_engine.js  ← Moteur 3D principal (Three.js WebGL)
  style.css        ← Système de design
  /textures        ← Textures NASA planétaires
  /data            ← Catalogues astronomiques (JSON)
/core              ← Moteur DVTRGAS [PROPRIÉTAIRE]
server.py          ← Serveur API Python
```

---

## Contribuer au Projet
Voir le [Guide de Contribution](wiki-en-contributing) pour les détails.

---

## Éligibilité aux Subventions
TITAN-LAB est éligible aux financements de :
- Programmes européens : Horizon Europe, Creative Europe
- Aides à l'innovation technologique et à la vulgarisation scientifique
- Conventions universitaires de recherche
- Projets de logiciels scientifiques ouverts

---

## Licence
Voir le fichier [LICENSE](../LICENSE) pour les conditions légales complètes.

> **Auteur :** José Manuel (`cyberenigma-lgtm`) — 2026
