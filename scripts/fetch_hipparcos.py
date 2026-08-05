import urllib.request
import os
import json
import math

url = "https://cdsarc.cds.unistra.fr/ftp/I/239/hip_main.dat"
temp_file = "hip_main.dat"
out_file = "c:\\IAGROK\\ApocalypseEngine\\public\\data\\hipparcos.json"

os.makedirs(os.path.dirname(out_file), exist_ok=True)

import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

print("Downloading Hipparcos catalog (~30MB)...")
try:
    with urllib.request.urlopen(url, context=ctx) as response, open(temp_file, 'wb') as f_out:
        f_out.write(response.read())
except Exception as e:
    print(f"Failed: {e}")
    exit(1)

print("Parsing catalog...")
stars = []
with open(temp_file, 'r', encoding='ascii') as f:
    for line in f:
        try:
            ra_str = line[51:63].strip()
            dec_str = line[64:76].strip()
            plx_str = line[79:86].strip()
            mag_str = line[41:46].strip()
            bv_str = line[245:251].strip()
            
            if not ra_str or not dec_str or not plx_str or not mag_str:
                continue
                
            plx = float(plx_str)
            if plx <= 0:
                continue
                
            dist_pc = 1000.0 / plx
            ra = math.radians(float(ra_str))
            dec = math.radians(float(dec_str))
            
            mag = float(mag_str)
            if mag > 8.0: 
                continue
                
            bv = float(bv_str) if bv_str else 0.6
            
            x = dist_pc * math.cos(dec) * math.cos(ra)
            y = dist_pc * math.cos(dec) * math.sin(ra)
            z = dist_pc * math.sin(dec)
            
            if bv < 0: r, g, b = 0.6, 0.7, 1.0
            elif bv < 0.5: r, g, b = 0.8, 0.9, 1.0
            elif bv < 1.0: r, g, b = 1.0, 1.0, 0.9
            elif bv < 1.5: r, g, b = 1.0, 0.8, 0.5
            else: r, g, b = 1.0, 0.5, 0.5
            
            stars.extend([round(x,1), round(y,1), round(z,1), round(r,2), round(g,2), round(b,2)])
            
        except ValueError:
            pass

print(f"Processed {len(stars)//6} stars.")
with open(out_file, 'w') as f:
    json.dump(stars, f)
print("Done!")
