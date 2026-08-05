class Celda:
    def __init__(self, x, y, z):
        self.x = x
        self.y = y
        self.z = z

        self.masa = 0.5
        self.energia = 0.5

        self.estado = "activa"  
        # activa, colapsada, regenerando, inactiva
