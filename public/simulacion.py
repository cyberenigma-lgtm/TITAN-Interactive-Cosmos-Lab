import random

class Simulacion:
    """
    Aplica las reglas dinámicas del universo sobre la malla.
    """
    def __init__(self, malla):
        self.malla = malla
        self.paso_actual = 0
        self.umbral_colapso = 10.0
        self.umbral_energia = 5.0
        self._sembrar_universo_inicial()

    def _sembrar_universo_inicial(self):
        """
        Crea focos de masa y energía (el inicio del universo)
        """
        celdas = self.malla.obtener_todas_las_celdas()
        # Activamos algunas celdas aleatorias con alta masa/energía
        for _ in range(int(len(celdas) * 0.1)):
            c = random.choice(celdas)
            c.masa = random.uniform(1.0, 15.0)
            c.energia = random.uniform(1.0, 10.0)
            c.actualizar_estado(self.umbral_colapso, self.umbral_energia)

    def step(self):
        """
        Avanza la simulación un paso en el tiempo.
        Aplica gravedad (colapso), energía oscura (expansión) y electromagnetismo.
        """
        self.paso_actual += 1
        cambios = {}

        # 1. Calcular influencias (sin aplicar todavía para que sea síncrono)
        for celda in self.malla.obtener_todas_las_celdas():
            vecinos = self.malla.obtener_vecinos_ortogonales(celda.x, celda.y, celda.z)
            nueva_masa = celda.masa
            nueva_energia = celda.energia

            # Gravedad: Las celdas con más masa atraen masa de los vecinos (Colapso)
            for v in vecinos:
                if v.masa > celda.masa and celda.masa > 0:
                    transferencia_masa = celda.masa * 0.1
                    nueva_masa -= transferencia_masa
                    # Guardamos el incremento para el vecino
                    if (v.x, v.y, v.z) not in cambios: cambios[(v.x, v.y, v.z)] = [0,0]
                    cambios[(v.x, v.y, v.z)][0] += transferencia_masa

                # Energía Oscura / Expansión: Energía fluye a celdas menos energéticas
                if celda.energia > v.energia:
                    transferencia_energia = celda.energia * 0.2
                    nueva_energia -= transferencia_energia
                    if (v.x, v.y, v.z) not in cambios: cambios[(v.x, v.y, v.z)] = [0,0]
                    cambios[(v.x, v.y, v.z)][1] += transferencia_energia

            # Meter los decrementos propios
            if (celda.x, celda.y, celda.z) not in cambios:
                cambios[(celda.x, celda.y, celda.z)] = [0,0]
            cambios[(celda.x, celda.y, celda.z)][0] += (nueva_masa - celda.masa)
            cambios[(celda.x, celda.y, celda.z)][1] += (nueva_energia - celda.energia)

        # 2. Meteoritos: Eventos aleatorios (vectores de transporte entre celdas)
        celdas = self.malla.obtener_todas_las_celdas()
        for _ in range(5): # 5 meteoritos por step
            origen = random.choice(celdas)
            destino = random.choice(celdas)
            if origen.masa > 1.0:
                origen.masa -= 1.0
                destino.masa += 1.0

        # 3. Aplicar los cambios
        for (x, y, z), (dm, de) in cambios.items():
            c = self.malla.obtener_celda(x, y, z)
            c.masa = max(0.0, c.masa + dm)
            c.energia = max(0.0, c.energia + de)
            c.actualizar_estado(self.umbral_colapso, self.umbral_energia)
