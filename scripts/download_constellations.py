import urllib.request
import json
import os

url = "https://raw.githubusercontent.com/ofrohn/d3-celestial/master/data/constellations.lines.json"
output_path = r"c:\IAGROK\ApocalypseEngine\public\universo\constellations.json"

print("Descargando datos de constelaciones...")
try:
    response = urllib.request.urlopen(url)
    data = json.loads(response.read().decode('utf-8'))
    
    # Save directly
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(data, f)
        
    print(f"Descargado exitosamente en: {output_path}")
    print("Muestra del dato:")
    print(json.dumps(data["features"][0], indent=2))
except Exception as e:
    print(f"Error: {e}")
