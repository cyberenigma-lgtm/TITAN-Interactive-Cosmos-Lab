import json
import math
import os

print("Generando catálogo SIMBAD (NASA Data)...")

# Raw empirical data for the requested SIMBAD stars
# RA in degrees, DEC in degrees, PLX in mas
stars_raw = [
    {"name": "Sirius A", "ra": 101.287, "dec": -16.716, "plx": 379.21, "sp_type": "A0mA1 Va", "mag": -1.46, "mass": "2.02 M☉", "radius": "1.71 R☉", "temp": "9,940 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Sirius_A_and_B_Hubble_photo.jpg/600px-Sirius_A_and_B_Hubble_photo.jpg", "desc": "La estrella más brillante del cielo nocturno. Enana blanca azulada."},
    {"name": "Vega", "ra": 279.234, "dec": 38.783, "plx": 130.23, "sp_type": "A0Va", "mag": 0.03, "mass": "2.13 M☉", "radius": "2.36 R☉", "temp": "9,600 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Vega_spitzer.jpg/600px-Vega_spitzer.jpg", "desc": "Estrella principal de la constelación de Lyra. Primera estrella en ser fotografiada."},
    {"name": "Altair", "ra": 297.695, "dec": 8.868, "plx": 194.95, "sp_type": "A7 V", "mag": 0.76, "mass": "1.79 M☉", "radius": "1.63 R☉", "temp": "7,700 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Altair_interferometrie.jpg/600px-Altair_interferometrie.jpg", "desc": "Gira sobre sí misma en solo 9 horas, lo que la hace muy achatada."},
    {"name": "Deneb", "ra": 310.357, "dec": 45.280, "plx": 1.15, "sp_type": "A2 Ia", "mag": 1.25, "mass": "19 M☉", "radius": "203 R☉", "temp": "8,525 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Deneb.png/600px-Deneb.png", "desc": "Una de las estrellas más luminosas conocidas. Forma parte del Triángulo de Verano."},
    {"name": "Betelgeuse", "ra": 88.792, "dec": 7.407, "plx": 5.07, "sp_type": "M1-M2 Ia-ab", "mag": 0.50, "mass": "16.5 M☉", "radius": "764 R☉", "temp": "3,600 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Betelgeuse_captured_by_ALMA.jpg/600px-Betelgeuse_captured_by_ALMA.jpg", "desc": "Supergigante roja masiva en Orión. Candidata inminente a supernova."},
    {"name": "Regulus", "ra": 152.092, "dec": 11.967, "plx": 41.13, "sp_type": "B8 IVn", "mag": 1.40, "mass": "3.8 M☉", "radius": "3.09 R☉", "temp": "12,460 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Regulus.jpg/600px-Regulus.jpg", "desc": "El 'Pequeño Rey' en la constelación de Leo. Sistema estelar múltiple."},
    {"name": "Arcturus", "ra": 213.915, "dec": 19.182, "plx": 88.83, "sp_type": "K0 III", "mag": -0.05, "mass": "1.08 M☉", "radius": "25.4 R☉", "temp": "4,286 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Arcturus.jpg/600px-Arcturus.jpg", "desc": "Gigante naranja, la más brillante del hemisferio celeste norte."},
    {"name": "Capella", "ra": 79.172, "dec": 45.997, "plx": 76.20, "sp_type": "G3III", "mag": 0.08, "mass": "2.56 M☉", "radius": "11.9 R☉", "temp": "4,970 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Capella_Chandra.jpg/600px-Capella_Chandra.jpg", "desc": "Sistema estelar cuádruple en Auriga."},
    {"name": "Pollux", "ra": 116.328, "dec": 28.026, "plx": 96.54, "sp_type": "K0 III", "mag": 1.14, "mass": "2.04 M☉", "radius": "8.8 R☉", "temp": "4,666 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pollux_star.png/600px-Pollux_star.png", "desc": "Gigante naranja con un exoplaneta conocido (Thestias)."},
    {"name": "Fomalhaut", "ra": 344.412, "dec": -29.622, "plx": 130.08, "sp_type": "A3 V", "mag": 1.16, "mass": "1.92 M☉", "radius": "1.84 R☉", "temp": "8,590 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Fomalhaut_with_ALMA.jpg/600px-Fomalhaut_with_ALMA.jpg", "desc": "Rodeada por un disco de escombros circunestelar masivo."},
    {"name": "Spica", "ra": 201.298, "dec": -11.161, "plx": 13.06, "sp_type": "B1 III-IV", "mag": 0.97, "mass": "11.43 M☉", "radius": "7.4 R☉", "temp": "25,300 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Spica.jpg/600px-Spica.jpg", "desc": "Sistema binario espectroscópico muy cercano en la constelación de Virgo."},
    {"name": "Antares", "ra": 247.351, "dec": -26.432, "plx": 5.89, "sp_type": "M1.5Iab", "mag": 0.96, "mass": "12 M☉", "radius": "680 R☉", "temp": "3,400 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Antares_-_VLTI.jpg/600px-Antares_-_VLTI.jpg", "desc": "El 'Rival de Marte', una supergigante roja moribunda."},
    {"name": "Aldebaran", "ra": 68.980, "dec": 16.509, "plx": 50.09, "sp_type": "K5+ III", "mag": 0.85, "mass": "1.16 M☉", "radius": "44.1 R☉", "temp": "3,900 K", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Aldebaran_Digitized_Sky_Survey_2.jpg/600px-Aldebaran_Digitized_Sky_Survey_2.jpg", "desc": "El 'Ojo del Toro', iluminando el cúmulo de las Híades."}
]

def get_color_by_sp(sp_type):
    if not sp_type: return 0xffffff
    sp = sp_type.upper()
    if 'O' in sp: return 0x99bbff # Azul cálido
    if 'B' in sp: return 0xaabbff # Azul
    if 'A' in sp: return 0xffffff # Blanco
    if 'F' in sp: return 0xffffdd # Blanco amarillo
    if 'G' in sp: return 0xffffaa # Amarillo
    if 'K' in sp: return 0xffcc88 # Naranja
    if 'M' in sp: return 0xff8866 # Rojo
    return 0xffffff

stars_data = []

for s in stars_raw:
    plx = s["plx"]
    dist_pc = 1000.0 / plx
    dist_ly = dist_pc * 3.26156
    
    ra_rad = math.radians(s["ra"])
    dec_rad = math.radians(s["dec"])
    
    x = dist_pc * math.cos(dec_rad) * math.cos(ra_rad)
    y = dist_pc * math.cos(dec_rad) * math.sin(ra_rad)
    z = dist_pc * math.sin(dec_rad)
    
    stars_data.append({
        "name": s["name"],
        "x": round(x, 2),
        "y": round(y, 2),
        "z": round(z, 2),
        "dist_ly": round(dist_ly, 2),
        "mag": s["mag"],
        "sp_type": s["sp_type"],
        "color": get_color_by_sp(s["sp_type"]),
        "mass": s["mass"],
        "radius": s["radius"],
        "temp": s["temp"],
        "desc": s["desc"],
        "img": s["img"]
    })

out_file = r"c:\IAGROK\ApocalypseEngine\public\data\simbad_stars.json"
os.makedirs(os.path.dirname(out_file), exist_ok=True)
with open(out_file, 'w') as f:
    json.dump(stars_data, f, ensure_ascii=False)

print(f"Éxito. Guardadas {len(stars_data)} estrellas reales de SIMBAD en {out_file}")
