from ecuaciones import eq_transporte

class Meteorito:
    def __init__(self, x, y, z, dx, dy, dz):
        self.x = x
        self.y = y
        self.z = z
        self.dx = dx
        self.dy = dy
        self.dz = dz
        self.masa = 0.1

def mover_meteorito(m, grid, tamano):
    m.x += m.dx
    m.y += m.dy
    m.z += m.dz

    # Si está dentro de la malla, transfiere materia mediante ecuación
    if 0 <= int(m.x) < tamano and 0 <= int(m.y) < tamano and 0 <= int(m.z) < tamano:
        celda = grid[int(m.x)][int(m.y)][int(m.z)]
        celda.masa = eq_transporte(celda.masa, m.masa)
