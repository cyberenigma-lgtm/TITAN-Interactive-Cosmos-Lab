"""
============================================================================
APOCALYPSE ENGINE — SERVIDOR DE DATOS Y API ASTRONÓMICA
Autor y Creador Original: José Manuel
Copyright (c) 2026 José Manuel. Todos los derechos reservados.
Licencia: CC BY-NC-ND 4.0 | Uso prohibido sin autorización expresa.
============================================================================
"""
import sys
import os
import json
import math
import importlib
from http.server import HTTPServer, BaseHTTPRequestHandler
import random

# Añadimos el núcleo DVTRGAS al path de forma dinámica
_CORE_PATH = os.path.join(os.path.dirname(__file__), 'core')
if _CORE_PATH not in sys.path:
    sys.path.insert(0, _CORE_PATH)

# Carga dinámica de módulos del núcleo (compatible con IDE y runtime)
try:
    _grid_mod       = importlib.import_module('grid')
    _sim_mod        = importlib.import_module('simulacion')
    _datos_mod      = importlib.import_module('datos')
    _meteoritos_mod = importlib.import_module('meteoritos')

    crear_grid         = _grid_mod.crear_grid
    simular            = _sim_mod.simular
    predecir_eventos   = _sim_mod.predecir_eventos
    poblar_grid_con_datos = _datos_mod.poblar_grid_con_datos
    Meteorito          = _meteoritos_mod.Meteorito
except ImportError as _e:
    print(f"[DVTRGAS] Error cargando núcleo: {_e}")
    # Stubs mínimos para que el servidor sirva archivos estáticos aunque el core no esté disponible
    def crear_grid(n): return [[[type('C', (), {'estado':'inactiva','x':x,'y':y,'z':z,'masa':0})() for z in range(n)] for y in range(n)] for x in range(n)]
    def simular(*a): pass
    def predecir_eventos(*a): return []
    def poblar_grid_con_datos(*a, **kw): return []
    class Meteorito:
        def __init__(self, x, y, z, vx, vy, vz): self.x=x; self.y=y; self.z=z; self.masa=1

# === EL CEREBRO MATEMÁTICO ===
class UniversoDVTRGAS:
    def __init__(self):
        self.tamano = 15
        self.grid = crear_grid(self.tamano)
        self.meteoritos = []
        self.paso = 0
        self.eventos = []
        
        print("[DVTRGAS] Inicializando motor matemático y conectando catálogo...")
        self.catalogo = poblar_grid_con_datos(self.grid, self.tamano, num_galaxias=1500)
        
        # Cargar Asteroides Reales (NASA NeoWs)
        try:
            ruta_neos = os.path.join(os.path.dirname(__file__), '../DVTRGAS/nasa_neos.json')
            if not os.path.exists(ruta_neos):
                _dvtrgas_path = os.path.join(os.path.dirname(__file__), '../../DVTRGAS')
                if _dvtrgas_path not in sys.path:
                    sys.path.insert(0, _dvtrgas_path)
                _fn = importlib.import_module('fetch_neos')
                _fn.fetch_nasa_neos()
                
            with open(ruta_neos, 'r', encoding='utf-8') as f:
                neos = json.load(f)
                for neo in neos:
                    # Usamos la distancia lunar como multiplicador para colocarlo alrededor del panal (centro 7.5)
                    # Distancia lunar = 384,400 km. Escalamos a las unidades del simulador.
                    dist = neo["distancia_lunar"] * 0.1 
                    vel = neo["velocidad_kms"] * 0.01
                    
                    # Lo colocamos en una órbita aleatoria pero a la distancia correcta del centro de la Tierra simulada
                    angulo = random.uniform(0, math.pi * 2)
                    angulo_z = random.uniform(0, math.pi * 2)
                    
                    # Suponiendo que la Tierra está en el centro del panal DVTRGAS (7.5, 7.5, 7.5)
                    x = 7.5 + math.cos(angulo) * dist
                    y = 7.5 + math.sin(angulo) * math.cos(angulo_z) * dist
                    z = 7.5 + math.sin(angulo) * math.sin(angulo_z) * dist
                    
                    vx = -math.cos(angulo) * vel  # Que se acerquen al centro
                    vy = -math.sin(angulo) * math.cos(angulo_z) * vel
                    vz = -math.sin(angulo) * math.sin(angulo_z) * vel
                    
                    m = Meteorito(x, y, z, vx, vy, vz)
                    m.nombre = neo["nombre"]
                    m.masa = neo["diametro_metros"] * 0.001 # Masa aproximada por diámetro
                    m.peligroso = neo["peligroso"]
                    self.meteoritos.append(m)
        except Exception as e:
            print(f"[DVTRGAS] Error cargando NEOs: {e}")

            
    def iterar(self):
        """Avanza el modelo de ecuaciones un paso en el tiempo"""
        self.paso += 1
        self.eventos = predecir_eventos(self.grid)
        simular(self.grid, self.meteoritos, self.tamano)
        
        # Reinyección de meteoritos salientes (Persistencia Orbital)
        for m in self.meteoritos:
            if m.x < 0: m.x += self.tamano
            if m.x >= self.tamano: m.x -= self.tamano
            if m.y < 0: m.y += self.tamano
            if m.y >= self.tamano: m.y -= self.tamano
            if m.z < 0: m.z += self.tamano
            if m.z >= self.tamano: m.z -= self.tamano

    def obtener_estado_json(self):
        """Empaqueta la simulación en formato entendible por Three.js (Los Ojos)"""
        estado = {
            "paso": self.paso,
            "celdas": [],
            "meteoritos": [],
            "eventos": self.eventos
        }
        
        # Filtramos las inactivas para optimizar la carga del HUD 3D
        for x in range(self.tamano):
            for y in range(self.tamano):
                for z in range(self.tamano):
                    celda = self.grid[x][y][z]
                    if celda.estado != "inactiva":
                        estado["celdas"].append({
                            "x": celda.x, "y": celda.y, "z": celda.z,
                            "masa": celda.masa,
                            "estado": celda.estado
                        })
                        
        for m in self.meteoritos:
            estado["meteoritos"].append({
                "x": m.x, "y": m.y, "z": m.z, "masa": m.masa,
                "nombre": getattr(m, 'nombre', 'NEO-Desconocido')
            })
            
        return json.dumps(estado)

universo = UniversoDVTRGAS()

# === EL PUENTE (API) ===
class CosmosAPIHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        # 1. Rutas de la API (JSON)
        if self.path == '/api/galaxias':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            # Extraemos las coordenadas inmensas reales para visualización profunda y datos astronómicos
            galaxias = [{
                "x": g.raw_x, 
                "y": g.raw_y, 
                "z": g.raw_z,
                "nombre": getattr(g, 'nombre', 'Desconocido'),
                "sp_type": getattr(g, 'sp_type', 'G'),
                "es_extrapolada": getattr(g, 'es_extrapolada', False),
                "masa": getattr(g, 'masa', 1.0)
            } for g in universo.catalogo]
            self.wfile.write(json.dumps(galaxias).encode('utf-8'))
            return
            
        if self.path == '/api/knowledge':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            try:
                with open(os.path.join(os.path.dirname(__file__), '../DVTRGAS/astro_knowledge.json'), 'r', encoding='utf-8') as f:
                    self.wfile.write(f.read().encode('utf-8'))
            except:
                self.wfile.write(b"{}")
            return
            
        if self.path == '/api/simulacion':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # Avanzamos y calculamos solo cuando los ojos lo piden (render loop tick)
            # universo.iterar() # DESACTIVADO: Bloquea el servidor y causa 'Failed to fetch'
            try:
                self.wfile.write(universo.obtener_estado_json().encode('utf-8'))
            except Exception:
                pass
            return
            
        # 2. Rutas del Visor (HTML/JS/CSS)
        clean_path = self.path.split('?')[0]
        if clean_path == '/':
            clean_path = '/index.html'
            
        ruta_base = os.path.abspath(os.path.join(os.path.dirname(__file__), 'public'))
        ruta_archivo = os.path.abspath(os.path.join(ruta_base, clean_path.lstrip('/')))
        
        if not ruta_archivo.startswith(ruta_base):
            self.send_error(403)
            return
            
        if os.path.exists(ruta_archivo) and not os.path.isdir(ruta_archivo):
            self.send_response(200)
            if ruta_archivo.endswith('.html'): self.send_header('Content-type', 'text/html')
            elif ruta_archivo.endswith('.css'): self.send_header('Content-type', 'text/css')
            elif ruta_archivo.endswith('.js'): self.send_header('Content-type', 'application/javascript')
            elif ruta_archivo.endswith('.jpg') or ruta_archivo.endswith('.jpeg'): self.send_header('Content-type', 'image/jpeg')
            elif ruta_archivo.endswith('.png'): self.send_header('Content-type', 'image/png')
            self.end_headers()
            
            with open(ruta_archivo, 'rb') as f:
                try:
                    self.wfile.write(f.read())
                except Exception as e:
                    pass # Evita que un navegador cerrando la conexión aborte el servidor entero
        else:
            self.send_error(404)
            
    def log_message(self, format, *args):
        # Silenciar los logs del HTTP server para no spamear la consola
        pass

def iniciar_servidor(puerto=8080):
    server = HTTPServer(('0.0.0.0', puerto), CosmosAPIHandler)
    print(f"[Cerebro DVTRGAS y Puente API] conectados en http://127.0.0.1:{puerto}")
    print("El visor WebGL ahora renderizará visualmente tus ecuaciones puras.")
    server.serve_forever()

if __name__ == '__main__':
    iniciar_servidor()
