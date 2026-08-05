from celdas import Celda

def crear_grid(tamano):
    # Genera una lista tridimensional
    return [[[Celda(x, y, z) for z in range(tamano)]
                               for y in range(tamano)]
                               for x in range(tamano)]
