import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D

def inicializar_figura():
    fig = plt.figure(figsize=(10, 8))
    fig.patch.set_facecolor('#050510')
    ax = fig.add_subplot(111, projection='3d')
    ax.set_facecolor('#050510')
    return fig, ax

def dibujar_estado(ax, grid, meteoritos, eventos, paso):
    ax.clear()
    ax.set_facecolor('#050510')

    xs, ys, zs, colores, tamanos = [], [], [], [], []

    for fila in grid:
        for columna in fila:
            for celda in columna:
                if celda.estado == "inactiva":
                    continue
                xs.append(celda.x)
                ys.append(celda.y)
                zs.append(celda.z)

                if celda.estado == "activa":
                    colores.append("#4cc9f0") # cyan
                    tamanos.append(15)
                elif celda.estado == "colapsada":
                    colores.append("#1a1a2e") # oscuro
                    tamanos.append(5)
                elif celda.estado == "regenerando":
                    colores.append("#f72585") # rosa brillante
                    tamanos.append(30)
                else:
                    colores.append("gray")
                    tamanos.append(10)

    if xs:
        ax.scatter(xs, ys, zs, c=colores, s=tamanos, alpha=0.8, edgecolors='none')
    
    # Dibujar meteoritos
    if meteoritos:
        mx, my, mz = [], [], []
        for m in meteoritos:
            mx.append(m.x)
            my.append(m.y)
            mz.append(m.z)
        ax.scatter(mx, my, mz, c='yellow', s=60, marker='*')
        
    ax.set_title(f"Panal Cósmico - T: {paso} | {len(eventos)} Predicciones", color='white')
    ax.set_axis_off()
    ax.view_init(elev=20, azim=paso * 2 % 360)
