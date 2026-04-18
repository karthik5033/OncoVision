import urllib.request
import re
url = 'https://html.duckduckgo.com/html/?q=site:github.com+%22brain.glb%22'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
try:
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        links = re.findall(r'https://github\.com/[^\" >]+', html)
        for link in set(links):
            print(link)
except Exception as e:
    print('Error:', e)
