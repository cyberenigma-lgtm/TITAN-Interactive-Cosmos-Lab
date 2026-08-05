import json
import math
import os

hip_file = "hip_main.dat"
const_file = r"c:\IAGROK\ApocalypseEngine\public\universo\constellations.json"
out_file = r"c:\IAGROK\ApocalypseEngine\public\data\constellations_3d.json"

print("Loading Hipparcos catalog for matching...")
stars = []
with open(hip_file, 'r', encoding='ascii') as f:
    for line in f:
        try:
            ra_str = line[51:63].strip()
            dec_str = line[64:76].strip()
            plx_str = line[79:86].strip()
            mag_str = line[41:46].strip()
            
            if not ra_str or not dec_str or not plx_str or not mag_str:
                continue
                
            plx = float(plx_str)
            if plx <= 0: continue
            
            # RA in hip_main is in degrees!
            ra_deg = float(ra_str)
            dec_deg = float(dec_str)
            
            dist_pc = 1000.0 / plx
            ra_rad = math.radians(ra_deg)
            dec_rad = math.radians(dec_deg)
            
            x = dist_pc * math.cos(dec_rad) * math.cos(ra_rad)
            y = dist_pc * math.cos(dec_rad) * math.sin(ra_rad)
            z = dist_pc * math.sin(dec_rad)
            
            stars.append({'ra': ra_deg, 'dec': dec_deg, 'x': x, 'y': y, 'z': z, 'mag': float(mag_str)})
        except ValueError:
            pass

print(f"Loaded {len(stars)} stars for matching.")

with open(const_file, 'r') as f:
    const_data = json.load(f)

lines_3d = []

def find_closest_star(target_ra, target_dec):
    best_star = None
    min_dist = float('inf')
    
    # Handle RA wrap-around (0 to 360)
    for s in stars:
        # Distance squared in RA/Dec space
        d_ra = abs(s['ra'] - target_ra)
        if d_ra > 180: d_ra = 360 - d_ra
        d_dec = s['dec'] - target_dec
        
        # Approximate angular distance
        dist = d_ra*d_ra + d_dec*d_dec
        if dist < min_dist:
            min_dist = dist
            best_star = s
    return best_star

print("Matching constellation vertices to 3D stars...")
for feature in const_data.get('features', []):
    geom = feature.get('geometry', {})
    if geom.get('type') == 'MultiLineString':
        for line in geom.get('coordinates', []):
            for i in range(len(line) - 1):
                ra1, dec1 = line[i]
                ra2, dec2 = line[i+1]
                
                # RA in d3-celestial is typically [-180, 180] or [0, 360].
                # Let's normalize to [0, 360]
                if ra1 < 0: ra1 += 360
                if ra2 < 0: ra2 += 360
                
                s1 = find_closest_star(ra1, dec1)
                s2 = find_closest_star(ra2, dec2)
                
                if s1 and s2:
                    lines_3d.extend([
                        round(s1['x'], 2), round(s1['y'], 2), round(s1['z'], 2),
                        round(s2['x'], 2), round(s2['y'], 2), round(s2['z'], 2)
                    ])

print(f"Generated {len(lines_3d)//6} 3D line segments.")
os.makedirs(os.path.dirname(out_file), exist_ok=True)
with open(out_file, 'w') as f:
    json.dump(lines_3d, f)
print("Done!")
