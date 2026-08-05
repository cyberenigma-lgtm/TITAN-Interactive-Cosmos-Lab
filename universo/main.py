from grid import crear_grid
from meteoritos import Meteorito
from simulacion import simular, predecir_eventos
from visual import inicializar_figura, dibujar_estado
from datos import poblar_grid_con_datos
import matplotlib.pyplot as plt
import matplotlib.animation as animation
import random

def main():
    print("Iniciando Validador del Universo Cubico-Hexagonal...")
    tamano = 15 # Aumentamos resolución para los datos astronómicos
    grid = crear_grid(tamano)
    
    print("Poblando el panal cósmico con datos astronómicos (Fase 1: Sintéticos)...")
    poblar_grid_con_datos(grid, tamano, num_galaxias=1500)
    
    # Añadimos unos meteoritos
    meteoritos = []
    for _ in range(5):
        m = Meteorito(
            random.uniform(0, tamano-1), random.uniform(0, tamano-1), random.uniform(0, tamano-1),
            random.uniform(-0.5, 0.5), random.uniform(-0.5, 0.5), random.uniform(-0.5, 0.5)
        )
        meteoritos.append(m)

    fig, ax = inicializar_figura()
    
    def update(frame):
        paso = frame
        eventos = predecir_eventos(grid)
        if eventos and paso % 10 == 0:
            print(f"\n--- PASO {paso} ---")
            for evt in eventos[:3]:
                tipo, x, y, z, eq = evt
                print(f"[PREDICCIÓN] Celda ({x},{y},{z}) -> {tipo} | Validador: {eq}")
                
        simular(grid, meteoritos, tamano)
        
        # Reinyección de meteoritos que se salen
        for m in meteoritos:
            if not (0 <= m.x < tamano and 0 <= m.y < tamano and 0 <= m.z < tamano):
                m.x = random.uniform(0, tamano-1)
                m.y = random.uniform(0, tamano-1)
                m.z = random.uniform(0, tamano-1)
                m.dx = random.uniform(-0.5, 0.5)
                m.dy = random.uniform(-0.5, 0.5)
                m.dz = random.uniform(-0.5, 0.5)
                
        dibujar_estado(ax, grid, meteoritos, eventos, paso)
        return fig,

    # FuncAnimation genera el bucle fluido
    ani = animation.FuncAnimation(fig, update, frames=500, interval=200, blit=False)
    
    plt.show()

if __name__ == "__main__":
    main()
