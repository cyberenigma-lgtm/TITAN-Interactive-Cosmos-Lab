import os
import urllib.request

urls = {
    "sun.jpg": "https://www.solarsystemscope.com/textures/download/2k_sun.jpg",
    "mercury.jpg": "https://www.solarsystemscope.com/textures/download/2k_mercury.jpg",
    "venus.jpg": "https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg",
    "earth.jpg": "https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg",
    "moon.jpg": "https://www.solarsystemscope.com/textures/download/2k_moon.jpg",
    "mars.jpg": "https://www.solarsystemscope.com/textures/download/2k_mars.jpg",
    "jupiter.jpg": "https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg",
    "saturn.jpg": "https://www.solarsystemscope.com/textures/download/2k_saturn.jpg",
    "saturn_ring.png": "https://www.solarsystemscope.com/textures/download/2k_saturn_ring_alpha.png",
    "uranus.jpg": "https://www.solarsystemscope.com/textures/download/2k_uranus.jpg",
    "neptune.jpg": "https://www.solarsystemscope.com/textures/download/2k_neptune.jpg"
}

# The solar system scope links for normal map might be .tif, let's try jpg first, if it fails, we fall back to earth_clouds
urls["earth_normal.jpg"] = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg"
urls["earth_clouds.png"] = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png"
urls["earth_specular.jpg"] = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg"

output_dir = "c:\\IAGROK\\ApocalypseEngine\\public\\textures"
os.makedirs(output_dir, exist_ok=True)

for name, url in urls.items():
    path = os.path.join(output_dir, name)
    if not os.path.exists(path):
        print(f"Descargando {name}...")
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
                out_file.write(response.read())
            print(f"OK: {name}")
        except Exception as e:
            print(f"ERROR descargando {name}: {e}")
    else:
        print(f"Omitido {name} (ya existe)")

print("¡Descarga de texturas completada!")
