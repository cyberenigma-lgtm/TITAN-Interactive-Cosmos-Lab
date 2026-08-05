from celdas import Celda

class MallaCubica:
    """
    Gestiona el conjunto de celdas formando el "panal cósmico" tridimensional.
    """
    def __init__(self, size_x, size_y, size_z):
        self.size_x = size_x
        self.size_y = size_y
        self.size_z = size_z
        self.celdas = {}
        self._inicializar_malla()

    def _inicializar_malla(self):
        for x in range(self.size_x):
            for y in range(self.size_y):
                for z in range(self.size_z):
                    # Inicializamos todas inactivas por defecto
                    self.celdas[(x, y, z)] = Celda(x, y, z)

    def obtener_celda(self, x, y, z):
        return self.celdas.get((x, y, z), None)

    def obtener_vecinos_ortogonales(self, x, y, z):
        """
        Devuelve los vecinos en los 3 ejes fundamentales X, Y, Z (6 direcciones puras).
        """
        direcciones = [
            (1, 0, 0), (-1, 0, 0),
            (0, 1, 0), (0, -1, 0),
            (0, 0, 1), (0, 0, -1)
        ]
        vecinos = []
        for dx, dy, dz in direcciones:
            nx, ny, nz = x + dx, y + dy, z + dz
            celda = self.obtener_celda(nx, ny, nz)
            if celda:
                vecinos.append(celda)
        return vecinos

    def obtener_todas_las_celdas(self):
        return list(self.celdas.values())
