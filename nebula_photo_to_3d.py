"""
============================================================================
APOCALYPSE ENGINE — EXTRACTOR DE NUBE DE PUNTOS 3D DESDE FOTOS DE NEBULOSAS
Autor y Creador Original: José Manuel
Copyright (c) 2026 José Manuel. Todos los derechos reservados.
Licencia: CC BY-NC-ND 4.0 | Uso prohibido sin autorización expresa.
============================================================================
Convierte una foto real de nebulosa (NASA/Hubble/JWST) en datos 3D para el Apocalypse Engine.

Uso:
    python nebula_photo_to_3d.py <imagen.jpg> --nebula-name "Pilares de la Creacion" --width-ly 5 --height-ly 5 --depth-ly 2

Salida:
    nebula_stars_<name>.json  - Estrellas detectadas como puntos 3D
    nebula_gas_<name>.json    - Nubes de gas basadas en las zonas de color
"""

import sys, json, math, random, argparse
from pathlib import Path

try:
    from PIL import Image
    import numpy as np
except ImportError:
    import subprocess
    subprocess.run([sys.executable, "-m", "pip", "install", "Pillow", "numpy"], check=True)
    from PIL import Image
    import numpy as np


def detect_stars(img_array, threshold=200):
    luminosity = 0.299*img_array[:,:,0] + 0.587*img_array[:,:,1] + 0.114*img_array[:,:,2]
    star_mask = luminosity > threshold
    h, w = luminosity.shape
    visited = np.zeros_like(star_mask, dtype=bool)
    stars = []
    for y in range(0, h, 3):
        for x in range(0, w, 3):
            if star_mask[y,x] and not visited[y,x]:
                y0,y1 = max(0,y-8),min(h,y+8)
                x0,x1 = max(0,x-8),min(w,x+8)
                window = luminosity[y0:y1,x0:x1]
                li = np.unravel_index(window.argmax(), window.shape)
                cy,cx = y0+li[0], x0+li[1]
                if not visited[cy,cx]:
                    visited[max(0,cy-6):min(h,cy+6), max(0,cx-6):min(w,cx+6)] = True
                    color = img_array[cy,cx]
                    stars.append({
                        'px': cx/w, 'py': 1.0-cy/h,
                        'brightness': float(luminosity[cy,cx])/255.0,
                        'r': int(color[0]), 'g': int(color[1]), 'b': int(color[2])
                    })
    print(f"  Detectadas {len(stars)} estrellas")
    return stars


def extract_gas_regions(img_array, num_samples=600):
    h, w, _ = img_array.shape
    luminosity = 0.299*img_array[:,:,0] + 0.587*img_array[:,:,1] + 0.114*img_array[:,:,2]
    gas_mask = (luminosity > 15) & (luminosity < 180)
    gas_coords = np.argwhere(gas_mask)
    gas = []
    if len(gas_coords) > 0:
        idxs = np.random.choice(len(gas_coords), min(num_samples, len(gas_coords)), replace=False)
        for coord in gas_coords[idxs]:
            cy, cx = coord
            color = img_array[cy,cx]
            lum = float(luminosity[cy,cx])
            gas.append({
                'px': cx/w, 'py': 1.0-cy/h,
                'density': lum/180.0,
                'r': int(color[0]), 'g': int(color[1]), 'b': int(color[2])
            })
    print(f"  Extraidas {len(gas)} regiones de gas")
    return gas


def map_to_3d(points, width_ly, height_ly, depth_ly, cx_ly, cy_ly, cz_ly):
    result = []
    for p in points:
        x = (p['px']-0.5)*width_ly + cx_ly
        y = (p['py']-0.5)*height_ly + cy_ly
        z_off = max(-depth_ly/2, min(depth_ly/2, random.gauss(0, depth_ly*0.3)))
        z = cz_ly + z_off
        entry = dict(p); entry['x_ly']=x; entry['y_ly']=y; entry['z_ly']=z
        result.append(entry)
    return result


def generate_engine_json(nebula_name, stars_3d, gas_3d, output_dir="."):
    star_out = [{"x": s['x_ly']*100, "y": s['y_ly']*100, "z": s['z_ly']*100,
                 "size": 2+s['brightness']*8, "r": s['r']/255, "g": s['g']/255, "b": s['b']/255} for s in stars_3d]
    gas_out  = [{"x": g['x_ly']*100, "y": g['y_ly']*100, "z": g['z_ly']*100,
                 "radius": 50+g['density']*200, "density": g['density'],
                 "r": g['r']/255, "g": g['g']/255, "b": g['b']/255} for g in gas_3d]
    
    safe = nebula_name.lower().replace(" ","_")
    sf = Path(output_dir) / f"nebula_stars_{safe}.json"
    gf = Path(output_dir) / f"nebula_gas_{safe}.json"
    sf.write_text(json.dumps(star_out, indent=2), encoding='utf-8')
    gf.write_text(json.dumps(gas_out,  indent=2), encoding='utf-8')
    print(f"\nARCHIVOS GENERADOS:")
    print(f"  {sf}  ({len(star_out)} estrellas)")
    print(f"  {gf}   ({len(gas_out)} nubes)")
    return str(sf), str(gf)


def main():
    p = argparse.ArgumentParser()
    p.add_argument('image')
    p.add_argument('--nebula-name',  default='nebula')
    p.add_argument('--width-ly',     type=float, default=5.0)
    p.add_argument('--height-ly',    type=float, default=5.0)
    p.add_argument('--depth-ly',     type=float, default=2.0)
    p.add_argument('--center-x',     type=float, default=0.0)
    p.add_argument('--center-y',     type=float, default=0.0)
    p.add_argument('--center-z',     type=float, default=0.0)
    p.add_argument('--star-thresh',  type=int,   default=190)
    p.add_argument('--gas-samples',  type=int,   default=600)
    p.add_argument('--output-dir',   default='public/data')
    args = p.parse_args()

    print(f"\n NEBULA PHOTO -> 3D EXTRACTOR")
    print(f"   Imagen:   {args.image}")
    print(f"   Nebulosa: {args.nebula_name}")
    
    img = Image.open(args.image).convert('RGB')
    if max(img.size) > 1024:
        ratio = 1024/max(img.size)
        img = img.resize((int(img.width*ratio), int(img.height*ratio)), Image.LANCZOS)
    img_array = np.array(img)
    print(f"   Resolucion: {img.width}x{img.height}")

    print("\n Detectando estrellas...")
    stars = detect_stars(img_array, threshold=args.star_thresh)
    print("\n Extrayendo gas...")
    gas   = extract_gas_regions(img_array, num_samples=args.gas_samples)
    print("\n Mapeando a 3D...")
    stars_3d = map_to_3d(stars, args.width_ly, args.height_ly, args.depth_ly, args.center_x, args.center_y, args.center_z)
    gas_3d   = map_to_3d(gas,   args.width_ly, args.height_ly, args.depth_ly, args.center_x, args.center_y, args.center_z)

    print("\n Generando JSONs...")
    Path(args.output_dir).mkdir(parents=True, exist_ok=True)
    generate_engine_json(args.nebula_name, stars_3d, gas_3d, output_dir=args.output_dir)

if __name__ == '__main__':
    main()
