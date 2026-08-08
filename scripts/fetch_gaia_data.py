import urllib.request
import json
import math
import os
import ssl
import csv

def fetch_hyg_database():
    print("[TITAN] Conectando con bases de datos reales (HYG Database: Hipparcos + Yale + Gliese)...")
    
    # HYG Database is a merged catalog of Hipparcos, Yale Bright Star, and Gliese catalogs
    url = "https://raw.githubusercontent.com/astronexus/HYG-Database/3964fa862d1f08f05919a35306889fa4a0afa7d6/hyg/v3/hyg_v36_1.csv"
    
    # Path for caching the CSV
    csv_path = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'hygdata_v3.csv')
    os.makedirs(os.path.dirname(csv_path), exist_ok=True)
    
    try:
        if not os.path.exists(csv_path):
            print(f"[TITAN] Descargando catálogo masivo (aprox 35MB) de {url}...")
            ctx = ssl.create_default_context()
            ctx.check_hostname = False
            ctx.verify_mode = ssl.CERT_NONE
            
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
            with urllib.request.urlopen(req, context=ctx) as response, open(csv_path, 'wb') as out_file:
                while True:
                    chunk = response.read(8192 * 4)
                    if not chunk:
                        break
                    out_file.write(chunk)
            print("[TITAN] Descarga completada.")
        else:
            print("[TITAN] Catálogo CSV encontrado en caché local.")
            
        stars_data = []
        
        # Color mapping based on color index (B-V)
        def bv_to_hex(bv):
            if bv < -0.3: return 0x99bbff # O class
            if bv < 0.0: return 0xaabbff # B class
            if bv < 0.3: return 0xffffff # A class
            if bv < 0.6: return 0xffffdd # F class
            if bv < 0.9: return 0xffffaa # G class
            if bv < 1.2: return 0xffcc88 # K class
            return 0xff8866 # M class
            
        def bv_to_class(bv):
            if bv < -0.3: return "O"
            if bv < 0.0: return "B"
            if bv < 0.3: return "A"
            if bv < 0.6: return "F"
            if bv < 0.9: return "G"
            if bv < 1.2: return "K"
            return "M"

        print("[TITAN] Procesando catálogo estelar...")
        
        count = 0
        with open(csv_path, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            for row in reader:
                try:
                    # Filter out sun and stars without coordinates
                    if row['id'] == '0' or not row['x'] or not row['y'] or not row['z']:
                        continue
                        
                    # Filter magnitude to keep file size reasonable (e.g. mag < 9 = ~100k stars)
                    mag = float(row['mag']) if row['mag'] else 10.0
                    if mag > 9.0: 
                        continue

                    x = float(row['x'])
                    y = float(row['y'])
                    z = float(row['z'])
                    dist = float(row['dist']) if row['dist'] else 0.0
                    
                    ci = float(row['ci']) if row['ci'] else 0.5
                    color = bv_to_hex(ci)
                    sp_class = row['spect'] if row['spect'] else bv_to_class(ci)
                    
                    name = row['proper'] if row['proper'] else (f"HIP {row['hip']}" if row['hip'] else f"Estrella {row['id']}")
                    
                    # Convert parsecs to lightyears, apply scale
                    scale = 0.5
                    dist_ly = dist * 3.26156
                    
                    stars_data.append({
                        "name": name,
                        "x": round(x * 3.26156 * scale, 2),
                        "y": round(y * 3.26156 * scale, 2),
                        "z": round(z * 3.26156 * scale, 2),
                        "dist_ly": round(dist_ly, 2),
                        "mag": round(mag, 2),
                        "color": color,
                        "sp_class": sp_class
                    })
                    
                    count += 1
                except ValueError:
                    pass
                    
        out_file = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'gaia_stars.json')
        with open(out_file, 'w', encoding='utf-8') as f:
            json.dump(stars_data, f)
            
        print(f"[TITAN] Éxito. Guardadas {len(stars_data)} estrellas reales en {out_file}")
        
    except Exception as e:
        print(f"[ERROR] Falló el procesamiento del catálogo: {e}")

if __name__ == '__main__':
    fetch_hyg_database()
