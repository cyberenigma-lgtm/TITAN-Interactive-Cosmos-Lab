import requests
import os
import re

FIRESTORE_URL = "https://firestore.googleapis.com/v1/projects/titan-cosmos/databases/(default)/documents/leaderboard"

def get_leaderboard():
    try:
        response = requests.get(FIRESTORE_URL)
        if response.status_code != 200:
            print("Error al conectar con Firestore:", response.status_code)
            return []
            
        data = response.json()
        documents = data.get("documents", [])
        
        players = []
        for doc in documents:
            fields = doc.get("fields", {})
            name = fields.get("name", {}).get("stringValue", "Anónimo")
            level = fields.get("level", {}).get("integerValue", 1)
            xp = fields.get("xp", {}).get("integerValue", 0)
            players.append({"name": name, "level": int(level), "xp": int(xp)})
            
        # Ordenar por XP descendente
        players.sort(key=lambda x: x["xp"], reverse=True)
        return players[:10]
    except Exception as e:
        print("Excepción al obtener leaderboard:", str(e))
        return []

def generate_markdown_table(players):
    if not players:
        return "¡El universo está vacío! Juega a TITAN-CRAFT y sé el primero en dejar tu huella.\n"
        
    table = "| Rango | Callsign (Piloto) | Nivel | Experiencia (XP) |\n"
    table += "| :---: | :--- | :---: | :---: |\n"
    
    medals = ["🥇", "🥈", "🥉"]
    for i, p in enumerate(players):
        rank = medals[i] if i < 3 else f"#{i+1}"
        table += f"| {rank} | **{p['name']}** | {p['level']} | {p['xp']} |\n"
        
    return table

def update_readme(table):
    readme_path = "README.md"
    if not os.path.exists(readme_path):
        print("README.md no encontrado.")
        return
        
    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Buscar los marcadores <!-- RANKING_START --> y <!-- RANKING_END -->
    pattern = re.compile(r'(<!-- RANKING_START -->\n).*?(\n<!-- RANKING_END -->)', re.DOTALL)
    
    if pattern.search(content):
        new_content = pattern.sub(rf'\g<1>{table}\g<2>', content)
        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(new_content)
        print("README.md actualizado correctamente.")
    else:
        print("Marcadores de Ranking no encontrados en el README. Añadiéndolos al final...")
        new_content = content + "\n\n## 🏆 Ránking Global de Pilotos (En Vivo)\n<!-- RANKING_START -->\n" + table + "\n<!-- RANKING_END -->\n"
        with open(readme_path, "w", encoding="utf-8") as f:
            f.write(new_content)

if __name__ == "__main__":
    players = get_leaderboard()
    table = generate_markdown_table(players)
    update_readme(table)
