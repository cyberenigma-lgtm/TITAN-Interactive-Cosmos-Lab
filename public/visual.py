import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import numpy as np

class Visualizador:
    """
    Renderiza la malla cúbica del universo usando Matplotlib 3D.
    Mapea los estados de las celdas a colores y tamaños.
    """
    def __init__(self, malla):
        self.malla = malla
        
        # Colores según tu modelo
        self.colores_estado = {
            "inactiva": "#1a1a2e",     # Casi negro (materia oscura / vacío)
            "activa": "#4cc9f0",       # Azul brillante (filamentos)
            "colapsada": "#f72585",    # Rosa magenta intenso (supercúmulos / alta masa)
            "regeneracion": "#e36414"  # Naranja (expandiendo/recuperando)
        }

    def dibujar(self, paso):
        fig = plt.figure(figsize=(10, 8))
        fig.patch.set_facecolor('#050510') # Fondo del universo
        ax = fig.add_subplot(111, projection='3d')
        ax.set_facecolor('#050510')

        xs, ys, zs = [], [], []
        colors = []
        sizes = []

        for celda in self.malla.obtener_todas_las_celdas():
            if celda.estado == "inactiva":
                # Para rendimiento y claridad visual, podemos no dibujar la inactiva
                # o dibujarla muy pequeña
                continue
                
            xs.append(celda.x)
            ys.append(celda.y)
            zs.append(celda.z)
            colors.append(self.colores_estado[celda.estado])
            
            # Tamaño basado en la masa o un valor base según el estado
            base_size = 50 if celda.estado == "colapsada" else (20 if celda.estado == "activa" else 10)
            sizes.append(base_size + celda.masa * 5)

        ax.scatter(xs, ys, zs, c=colors, s=sizes, alpha=0.8, edgecolors='w', linewidths=0.2)

        # Ocultar los ejes numéricos para una vista pura del "panal"
        ax.set_axis_off()
        
        plt.title(f"Panal Cósmico - Paso de tiempo: {paso}\nModelo Cúbico-Hexagonal", color='white')
        
        # Ajustamos el ángulo de visión inicial
        ax.view_init(elev=20, azim=paso * 5 % 360) # Rotación lenta
        
        plt.show()
