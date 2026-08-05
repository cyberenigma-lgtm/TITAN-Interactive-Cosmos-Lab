import urllib.request
import csv
import math
import json
import os

url = "https://raw.githubusercontent.com/astronexus/HYG-Database/master/hygdata_v3.csv"
temp_file = "hygdata.csv"
out_file = "c:\\IAGROK\\ApocalypseEngine\\public\\data\\real_stars.json"

os.makedirs(os.path.dirname(out_file), exist_ok=True)

print("Downloading HYG database...")
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response, open(temp_file, 'wb') as f:
    f.write(response.read())

print("Processing database...")
stars = []
with open(temp_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        try:
            x, y, z = float(row['x']), float(row['y']), float(row['z'])
            mag = float(row['mag'])
            # Filtramos estrellas demasiado tenues para optimizar el frontend (mag 9.0 = ~100k stars)
            if mag > 9.0: 
                continue
            
            bv = float(row['ci']) if row['ci'] else 0.0
            
            # Aproximación de color (0.0=azul, 0.6=blanco/sol, 1.5=rojo)
            if bv < 0: r, g, b = 0.5, 0.7, 1.0
            elif bv < 0.5: r, g, b = 0.8, 0.9, 1.0
            elif bv < 1.0: r, g, b = 1.0, 1.0, 0.8
            elif bv < 1.5: r, g, b = 1.0, 0.8, 0.5
            else: r, g, b = 1.0, 0.5, 0.5
            
            stars.append(round(x, 2))
            stars.append(round(y, 2))
            stars.append(round(z, 2))
            stars.append(round(r, 2))
            stars.append(round(g, 2))
            stars.append(round(b, 2))
            stars.append(round(mag, 2))
            
        except ValueError:
            continue

print(f"Total stars processed: {len(stars)//7}")
print(f"Writing to {out_file}...")
with open(out_file, 'w', encoding='utf-8') as f:
    json.dump(stars, f)
print("Done!")
