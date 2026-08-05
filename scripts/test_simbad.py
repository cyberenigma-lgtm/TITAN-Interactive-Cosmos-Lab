import urllib.request
import urllib.parse
import json

query = """
SELECT TOP 20 basic.main_id, basic.ra, basic.dec, basic.plx_value, basic.sp_type, flux.flux
FROM basic JOIN flux ON basic.oid = flux.oidref
WHERE flux.filter = 'V' AND basic.plx_value > 0
ORDER BY flux.flux ASC
"""

url = "http://simbad.u-strasbg.fr/simbad/sim-tap/sync"
data = urllib.parse.urlencode({
    "request": "doQuery",
    "lang": "ADQL",
    "format": "json",
    "query": query
}).encode('utf-8')

try:
    req = urllib.request.Request(url, data=data)
    with urllib.request.urlopen(req) as response:
        result = json.loads(response.read().decode('utf-8'))
        print("Columns:", [c['name'] for c in result['metadata']])
        print("First 5 rows:", result['data'][:5])
except Exception as e:
    print("Error:", e)
