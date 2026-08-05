"""
============================================================================
APOCALYPSE ENGINE — GENERADOR DE RED CÓSMICA (FILAMENTOS GALÁCTICOS 3D)
Autor y Creador Original: José Manuel Moreno Cano
Copyright (c) 2026 José Manuel Moreno Cano. Todos los derechos reservados.
Licencia: CC BY-NC-ND 4.0 | Uso prohibido sin autorización expresa.
============================================================================
"""
import struct
import math
import random
import os

# Configuraciones del Macro-Universo
NUM_GALAXIES_PER_QUADRANT = 62500 # 62,500 * 8 cuadrantes = 500,000 galaxias
MACRO_RADIUS = 8000000.0
LOCAL_VOID_RADIUS = 200000.0 # Bóveda vacía para nuestra galaxia (evita clipping masivo en la cámara)
FILE_PATH = os.path.join('public', 'data', 'cosmic_web.bin')

print("Reconstruyendo Red Cósmica con Modo Reflexión (Simetría Cuántica)...")
print(f"Evitando el Vacio Local (Radio: {LOCAL_VOID_RADIUS}) para proteger la cámara...")

os.makedirs(os.path.dirname(FILE_PATH), exist_ok=True)
buffer = bytearray()
galaxies_generated = 0
FREQ = 0.000005

# Generar solo en el primer cuadrante (+X, +Y, +Z)
base_galaxies = []

while len(base_galaxies) < NUM_GALAXIES_PER_QUADRANT:
    # Punto aleatorio en el octante positivo
    theta = random.uniform(0, math.pi / 2)
    phi = math.acos(random.uniform(0, 1))
    
    # Distribución radial, respetando el vacío local
    r = LOCAL_VOID_RADIUS + (MACRO_RADIUS - LOCAL_VOID_RADIUS) * math.pow(random.random(), 1.5)
    
    x = r * math.sin(phi) * math.cos(theta)
    y = r * math.sin(phi) * math.sin(theta)
    z = r * math.cos(phi)
    
    # Ecuación de onda
    qx, qy, qz = x * FREQ, y * FREQ, z * FREQ
    density = (math.sin(qx) * math.cos(qy) + 
               math.sin(qy) * math.cos(qz) + 
               math.sin(qz) * math.cos(qx))
    
    if density > 0.6:
        # Añadir ruido y guardar
        bx = x + random.uniform(-10000, 10000)
        by = y + random.uniform(-10000, 10000)
        bz = z + random.uniform(-10000, 10000)
        base_galaxies.append((bx, by, bz))

print("Aplicando espejos cuánticos a los 8 cuadrantes...")

# Replicación por Simetría (Reflexión a todos los cuadrantes del universo)
signs = [
    (1,1,1), (-1,1,1), (1,-1,1), (-1,-1,1),
    (1,1,-1), (-1,1,-1), (1,-1,-1), (-1,-1,-1)
]

for sx, sy, sz in signs:
    for gx, gy, gz in base_galaxies:
        buffer.extend(struct.pack('<fff', gx * sx, gy * sy, gz * sz))
        galaxies_generated += 1

# Añadir Galaxias Ancla Documentadas (Grupo Local)
anclas = [
    (2500000.0, 100000.0, -500000.0), # Andrómeda
    (-160000.0, -50000.0, -100000.0), # Gran Nube de Magallanes
    (-200000.0, -80000.0, -50000.0),  # Pequeña Nube de Magallanes
    (3000000.0, -200000.0, 800000.0)  # Galaxia del Triángulo
]

for ax, ay, az in anclas:
    # Asegurar que las anclas no se generen en el vacío local si no deben,
    # pero estas distancias ya están fuera del radio problemático (150k+).
    buffer.extend(struct.pack('<fff', ax, ay, az))
    galaxies_generated += 1

with open(FILE_PATH, 'wb') as f:
    f.write(buffer)

print(f"¡Reconstrucción completada! {galaxies_generated} galaxias materializadas.")
print(f"Archivo guardado en: {FILE_PATH}")
