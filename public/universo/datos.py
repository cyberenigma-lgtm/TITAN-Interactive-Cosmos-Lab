import random
import math
import csv
import os

class Galaxia:
    def __init__(self, ra, dec, z, masa):
        self.ra = float(ra)
        self.dec = float(dec)
        self.z = float(z)
        self.masa = float(masa)

def cargar_catalogo_real(ruta_csv="catalogo_sample.csv"):
    """
    Fase 2: Carga un catálogo astronómico real desde un archivo CSV.
    Si no existe, cae grácilmente a generar datos sintéticos.
    """
    catalogo = []
    if os.path.exists(ruta_csv):
        print(f"Cargando catálogo astronómico desde: {ruta_csv}")
        with open(ruta_csv, 'r') as f:
            reader = csv.DictReader(f)
            for row in reader:
                catalogo.append(Galaxia(row['RA'], row['Dec'], row['z'], row['Masa']))
    else:
        print("CSV no encontrado. Generando catálogo sintético...")
        for _ in range(1500):
            if random.random() < 0.2:
                catalogo.append(Galaxia(random.gauss(120, 15), random.gauss(30, 10), random.gauss(0.2, 0.05), random.uniform(2.0, 8.0)))
            else:
                catalogo.append(Galaxia(random.uniform(0, 360), random.uniform(-90, 90), random.uniform(0.01, 0.8), random.uniform(0.1, 1.5)))
    return catalogo

def convertir_coordenadas(galaxia, tamano_grid):
    """
    Convierte RA/Dec/z (esféricas) a X, Y, Z (cúbicas) normalizadas 
    al tamaño del grid. Reinterpreta el universo radial a ortogonal.
    """
    d = galaxia.z * 1000 
    
    ra_rad = math.radians(galaxia.ra)
    dec_rad = math.radians(galaxia.dec)
    
    x = d * math.cos(dec_rad) * math.cos(ra_rad)
    y = d * math.cos(dec_rad) * math.sin(ra_rad)
    z = d * math.sin(dec_rad)
    
    # Normalizar al tamaño del grid
    max_d = 800 
    nx = int(((x + max_d) / (2 * max_d)) * tamano_grid)
    ny = int(((y + max_d) / (2 * max_d)) * tamano_grid)
    nz = int(((z + max_d) / (2 * max_d)) * tamano_grid)
    
    # Asegurar límites dentro del cubo
    nx = max(0, min(tamano_grid - 1, nx))
    ny = max(0, min(tamano_grid - 1, ny))
    nz = max(0, min(tamano_grid - 1, nz))
    
    return nx, ny, nz

def poblar_grid_con_datos(grid, tamano, num_galaxias=1500):
    """
    Carga el catálogo, convierte coordenadas y asigna masa a las celdas.
    """
    catalogo = cargar_catalogo_real("catalogo_sample.csv")
    
    # Limpiamos la masa base de las celdas
    for fila in grid:
        for columna in fila:
            for celda in columna:
                celda.masa = 0.0
                celda.estado = "inactiva"
                
    # Proyectamos las galaxias al panal cúbico
    for galaxia in catalogo:
        x, y, z = convertir_coordenadas(galaxia, tamano)
        # Sumamos la masa a la celda correspondiente
        grid[x][y][z].masa += (galaxia.masa * 0.05) 
        
    # Inicializamos estado inicial basándonos en la distribución
    from dinamica import actualizar_celda
    for fila in grid:
        for columna in fila:
            for celda in columna:
                actualizar_celda(celda)
