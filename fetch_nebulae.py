"""
============================================================================
APOCALYPSE ENGINE — GENERADOR DE CATÁLOGO DE NEBULOSAS 3D
Autor y Creador Original: José Manuel Moreno Cano
Copyright (c) 2026 José Manuel Moreno Cano. Todos los derechos reservados.
Licencia: CC BY-NC-ND 4.0 | Uso prohibido sin autorización expresa.
============================================================================
"""
import json
import os
import random
import math

OUTPUT_FILE = os.path.join('public', 'data', 'nebulae.json')

GC_X = 52000.0
GC_Z = -100000.0
delta_angle = -3.7092 # Calculado en reconstruct_galaxy.py para alinear Orion

nebulae_data = [
    # Nebulosas base (ahora están "en" la espiral, no las ponemos a mano, pero mantendremos la de Orion muy cerca de la Tierra)
    # Orion Nebula at Earth's distance! Earth is at r = 112694. 
    # Let's put Orion right next to Earth.
    {"name": "Nebulosa de Orión (M42)", "dist": 112000, "angle": 2.05, "radius": 2400, "r": 1.0, "g": 0.2, "b": 0.5},
    {"name": "Nebulosa de Carina (NGC 3372)", "dist": 105000, "angle": 2.15, "radius": 4600, "r": 1.0, "g": 0.4, "b": 0.3},
    {"name": "Pilares de la Creación", "dist": 108000, "angle": 2.10, "radius": 1800, "r": 0.3, "g": 0.7, "b": 0.5},
    {"name": "Sagitario B2", "dist": 2000, "angle": 0.0, "radius": 5000, "r": 1.0, "g": 0.8, "b": 0.2}
]

# Añadimos nebulosas procedimentales EXACTAMENTE sobre los brazos espirales alineados
arms = 4
a = 2000.0
b = 0.22

for arm in range(arms):
    arm_offset = (arm * math.pi * 2) / arms
    for _ in range(35): # 35 nebulosas gigantes por brazo para llenar el espacio extra
        theta = random.random() * math.pi * 7.0
        r = a * math.exp(b * theta)
        
        # Mismo ángulo que las estrellas
        current_angle = theta + arm_offset + delta_angle
        
        ctype = random.randint(0, 2)
        if ctype == 0:
            c_r, c_g, c_b = 1.0, random.uniform(0.1, 0.4), random.uniform(0.1, 0.4) 
        elif ctype == 1:
            c_r, c_g, c_b = random.uniform(0.1, 0.4), 1.0, random.uniform(0.6, 1.0) 
        else:
            c_r, c_g, c_b = 0.9, random.uniform(0.1, 0.3), 1.0 
            
        nebulae_data.append({
            "name": f"Nube Molecular NGC-{random.randint(1000, 9999)}",
            "dist": r,
            "angle": current_angle,
            "radius": random.uniform(1000, 4000), # Nubes masivas
            "r": c_r, "g": c_g, "b": c_b
        })

final_data = []
for neb in nebulae_data:
    dist = neb['dist']
    angle = neb['angle']
    
    nx = dist * math.cos(angle) + GC_X
    nz = dist * math.sin(angle) + GC_Z
    ny = random.gauss(0, 500)
    
    final_data.append({
        "name": neb['name'],
        "x": nx,
        "y": ny,
        "z": nz,
        "radius": neb['radius'],
        "color": [neb['r'], neb['g'], neb['b']]
    })

with open(OUTPUT_FILE, 'w') as f:
    json.dump(final_data, f, indent=4)
