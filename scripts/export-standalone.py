"""Bundle the built portfolio into a network-independent HTML document.

Run npm run build first. Optional first argument: output HTML path.
External links and user-initiated YouTube playback remain external by design.
"""
from pathlib import Path
import base64
import mimetypes
import re
import sys

ROOT = Path(__file__).resolve().parent.parent
DIST = ROOT / 'dist'
OUTPUT = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT.parent / 'Eyad-Eldokany-Portfolio.html'
if not (DIST / 'index.html').exists():
    raise SystemExit('Run npm run build before exporting.')

cache = {}
def inline_asset(path):
    if path not in cache:
        file = ROOT / 'public' / path.lstrip('/')
        mime = mimetypes.guess_type(str(file))[0] or 'application/octet-stream'
        cache[path] = 'data:' + mime + ';base64,' + base64.b64encode(file.read_bytes()).decode('ascii')
    return cache[path]

def embed_public(text):
    # Vite emits ../fonts/... in CSS and ./favicon.svg in HTML.
    # Consume the entire relative prefix so data URLs never become '..data:'.
    pattern = r'(?<![A-Za-z0-9_/-])(?:\./|\.\./|/)?((?:images|fonts)/[A-Za-z0-9._-]+|Eyad-Eldokany-Resume\.pdf|favicon\.svg)'
    return re.sub(pattern, lambda m: inline_asset('/' + m.group(1)), text)

html = (DIST / 'index.html').read_text()
def replace_css(match):
    path = DIST / match.group(1).removeprefix('./').removeprefix('/')
    css = embed_public(path.read_text()).replace('</style', '<\\/style')
    return '<style>' + css + '</style>'
def replace_script(match):
    path = DIST / match.group(1).removeprefix('./').removeprefix('/')
    js = embed_public(path.read_text()).replace('</script', '<\\/script')
    return '<script type="module">' + js + '</script>'

html = re.sub(r'<link\s+rel="stylesheet"[^>]*href="([^"]+)"[^>]*>', replace_css, html)
html = re.sub(r'<script\s+type="module"[^>]*src="([^"]+)"[^>]*></script>', replace_script, html)
html = embed_public(html)
notices = []
for file in sorted((ROOT / 'public/licenses').glob('*.txt')) + sorted((ROOT / 'public/fonts').glob('OFL-*.txt')):
    notices.append(file.name + '\n' + file.read_text())
licenses = '\n\n'.join(notices).replace('</script', '<\\/script')
html = html.replace('</head>', '<!-- Standalone portfolio: all runtime assets are embedded. -->\n<script type="text/plain" id="third-party-licenses">' + licenses + '</script>\n</head>')
OUTPUT.parent.mkdir(parents=True, exist_ok=True)
OUTPUT.write_text(html)
print(f'Exported {OUTPUT} ({OUTPUT.stat().st_size / 1024 / 1024:.2f} MiB; {len(cache)} embedded assets)')
