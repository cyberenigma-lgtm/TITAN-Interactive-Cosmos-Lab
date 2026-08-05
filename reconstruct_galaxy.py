"""
============================================================================
APOCALYPSE ENGINE — RECONSTRUCTOR VOLUMÉTRICO DE GALAXIAS
Autor y Creador Original: José Manuel Moreno Cano
Copyright (c) 2026 José Manuel Moreno Cano. Todos los derechos reservados.
Licencia: CC BY-NC-ND 4.0 | Uso prohibido sin autorización expresa.
============================================================================
"""
import json
import math
import struct
import random
import os

INPUT_FILE = os.path.join('public', 'data', 'hipparcos.json')
OUTPUT_FILE = os.path.join('public', 'data', 'milky_way.bin')

# Posición del Centro Galáctico (Sgr A*)
GC_X = 52000.0
GC_Z = -100000.0
GC_Y = 0.0

def load_hipparcos():
    if not os.path.exists(INPUT_FILE):
        return []
    with open(INPUT_FILE, 'r') as f:
        data = json.load(f)
    stars = []
    for i in range(0, len(data), 6):
        if i+5 < len(data):
            stars.append({
                'x': data[i],
                'y': data[i+1],
                'z': data[i+2],
                'r': data[i+3],
                'g': data[i+4],
                'b': data[i+5]
            })
    return stars

def reconstruct_galaxy():
    print("Cargando datos semilla de Hipparcos...")
    seed_stars = load_hipparcos()
    if not seed_stars:
        return
        
    reconstructed = []
    
    # --- ALINEACIÓN ORION ARM ---
    earth_x = -GC_X
    earth_z = -GC_Z
    r_earth = math.sqrt(earth_x**2 + earth_z**2)
    theta_earth = math.atan2(earth_z, earth_x) 
    
    arms = 4
    a = 2000.0
    b = 0.22
    
    theta_eff = math.log(r_earth / a) / b
    angle_pure = theta_eff % (2 * math.pi)
    delta_angle = theta_earth - angle_pure
    
    print(f"Distancia SgrA* -> Tierra: {r_earth}")
    print(f"Max Theta necesario para alcanzar la Tierra: {theta_eff} ({theta_eff/math.pi} PI)")
    
    # 1. El Bulbo Galáctico
    bulge_stars = 60000
    for _ in range(bulge_stars):
        u = 1.0 - random.random()
        v = random.random()
        r_gauss = math.sqrt(-2.0 * math.log(u)) * math.cos(2.0 * math.pi * v)
        r = abs(r_gauss * 8000.0)
        theta = random.uniform(0, math.pi * 2)
        phi = math.acos(2.0 * random.random() - 1.0)
        bx = r * math.sin(phi) * math.cos(theta)
        by = r * math.sin(phi) * math.sin(theta) * 0.4
        bz = r * math.cos(phi)
        reconstructed.append((bx, by, bz, 1.0, 0.9, 0.7))
        
    # 2. Brazos Espirales (Deben crecer hasta 7 PI para superar la Tierra)
    stars_per_arm = 250000 
    
    for arm in range(arms):
        arm_offset = (arm * math.pi * 2) / arms
        for _ in range(stars_per_arm):
            # Crecemos hasta 7 PI para que sobrepasen la Tierra (que está en ~5.8 PI)
            theta = random.random() * math.pi * 7.0 
            r = a * math.exp(b * theta)
            current_angle = theta + arm_offset + delta_angle
            
            thickness = r * 0.08
            dx = random.gauss(0, thickness)
            dz = random.gauss(0, thickness)
            dy = random.gauss(0, 1500.0)
            
            nx = (r * math.cos(current_angle)) + dx
            nz = (r * math.sin(current_angle)) + dz
            
            s = random.choice(seed_stars)
            color_r, color_g, color_b = s['r'], s['g'], s['b']
            
            if random.random() > 0.6:
                color_r, color_g, color_b = 0.5, 0.7, 1.0 
                
            reconstructed.append((nx, dy, nz, color_r, color_g, color_b))

    with open(OUTPUT_FILE, 'wb') as f:
        for star in reconstructed:
            f.write(struct.pack('ffffff', star[0] + GC_X, star[1] + GC_Y, star[2] + GC_Z, star[3], star[4], star[5]))

if __name__ == '__main__':
    reconstruct_galaxy()
