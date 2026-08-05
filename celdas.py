class Celda:
    """
    Representa una unidad mínima de espacio-tiempo en el Universo Cúbico-Hexagonal.
    """
    def __init__(self, x, y, z, masa=0.0, energia=0.0, estado="inactiva"):
        self.x = x
        self.y = y
        self.z = z
        self.masa = masa
        self.energia = energia
        # Estados posibles: "activa", "colapsada", "regeneracion", "inactiva"
        self.estado = estado

    def actualizar_estado(self, umbral_colapso, umbral_energia):
        """
        Actualiza el estado de la celda basado en su masa y energía actuales.
        """
        if self.masa > umbral_colapso:
            self.estado = "colapsada" # Nodo denso
        elif self.energia > umbral_energia:
            self.estado = "activa" # Filamentos transmitiendo energía
        elif self.estado == "colapsada" and self.energia > 0:
            self.estado = "regeneracion"
        elif self.masa == 0 and self.energia == 0:
            self.estado = "inactiva" # Materia oscura/Vacío

    def __repr__(self):
        return f"Celda({self.x}, {self.y}, {self.z}, estado='{self.estado}')"
