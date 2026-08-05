import os
import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# URLs to high-quality equirectangular panoramas
urls = {
    "mars_pano.jpg": "https://upload.wikimedia.org/wikipedia/commons/d/d8/Equirectangular_projection_of_Mars_surface.jpg",
    "moon_pano.jpg": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Apollo_11_360_panorama.jpg",
    "earth_pano.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/f6/Equirectangular_projection_SW.jpg"
}

out_dir = "c:\\IAGROK\\ApocalypseEngine\\public\\textures"
os.makedirs(out_dir, exist_ok=True)

for filename, url in urls.items():
    path = os.path.join(out_dir, filename)
    if not os.path.exists(path):
        try:
            print(f"Downloading {filename}...")
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'})
            with urllib.request.urlopen(req, context=ctx) as response, open(path, 'wb') as out_file:
                out_file.write(response.read())
            print(f"Success: {filename}")
        except Exception as e:
            print(f"Failed to download {filename}: {e}")
    else:
        print(f"{filename} already exists.")

print("Done!")
