import random
from dinamica import actualizar_celda
from meteoritos import mover_meteorito
from ecuaciones import eq_interaccion, M_CRIT, M_REGEN

def predecir_eventos(grid):
    eventos = []
    for fila in grid:
        for columna in fila:
            for celda in columna:
                if celda.masa < M_CRIT and celda.estado != "colapsada":
                    justificacion = f"Eq. Colapso: {celda.masa:.2f} < {M_CRIT}"
                    eventos.append(("Alerta Colapso", celda.x, celda.y, celda.z, justificacion))
                if celda.masa > M_REGEN and celda.estado != "regenerando":
                    justificacion = f"Eq. Regeneración: {celda.masa:.2f} > {M_REGEN}"
                    eventos.append(("Alerta Regeneracion", celda.x, celda.y, celda.z, justificacion))
    return eventos

def simular(grid, meteoritos, tamano):
    # Todo evento es consecuencia de una ecuación
    for m in meteoritos:
        mover_meteorito(m, grid, tamano)

    # Calcular influencias (Ecuación 6)
    cambios_masa = {}
    for x in range(tamano):
        for y in range(tamano):
            for z in range(tamano):
                celda = grid[x][y][z]
                
                # Encontrar vecinos en las 6 vías ortogonales
                vecinos = []
                direcciones = [(1,0,0), (-1,0,0), (0,1,0), (0,-1,0), (0,0,1), (0,0,-1)]
                for dx, dy, dz in direcciones:
                    nx, ny, nz = x + dx, y + dy, z + dz
                    if 0 <= nx < tamano and 0 <= ny < tamano and 0 <= nz < tamano:
                        vecinos.append(grid[nx][ny][nz])
                
                masa_vecinos = [v.masa for v in vecinos]
                energia_vecinos = [v.energia for v in vecinos]
                
                # Ecuación de Interacción
                nueva_masa = eq_interaccion(celda.masa, masa_vecinos, energia_vecinos)
                cambios_masa[(x,y,z)] = max(0, min(1, nueva_masa)) # Normalizado
                
    # Aplicar cambios y validar ecuaciones de estado
    for x in range(tamano):
        for y in range(tamano):
            for z in range(tamano):
                celda = grid[x][y][z]
                celda.masa = cambios_masa[(x,y,z)]
                actualizar_celda(celda)
