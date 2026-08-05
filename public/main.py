import os
import sys

if __name__ == "__main__":
    print("⚠️ Estás ejecutando la versión antigua (V1).")
    print("🚀 Redirigiendo a la versión modular avanzada en 'universo/main.py'...")
    os.chdir(os.path.join(os.path.dirname(__file__), "universo"))
    os.system(f"{sys.executable} main.py")
