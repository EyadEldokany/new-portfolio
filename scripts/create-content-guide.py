"""Render the Arabic Markdown reference as a self-contained, printable HTML guide.
Optional documentation tool only: pip install mistune
"""
from pathlib import Path
import html
import re
import shutil
import mistune

ROOT = Path(__file__).resolve().parent.parent
entries = []
class GuideRenderer(mistune.HTMLRenderer):
    def heading(self, text, level, **attrs):
        key = 'part-' + str(len(entries) + 1)
        if level == 2:
            entries.append((key, re.sub('<[^>]+>', '', html.unescape(text))))
            return f'<h{level} id="{key}">{text}</h{level}>\n'
        return f'<h{level}>{text}</h{level}>\n'

render = mistune.create_markdown(renderer=GuideRenderer(), plugins=['table', 'task_lists'])
body = render((ROOT/'CONTENT-EDITING-GUIDE.ar.md').read_text())
# Give the printable checklist proper accessible names.
body = re.sub(r'(<li class="task-list-item">)\s*(<input[^>]*>)(.*?)</li>', r'\1<label>\2\3</label></li>', body, flags=re.S)
nav = ''.join(f'<li><a href="#{key}">{html.escape(label)}</a></li>' for key, label in entries)
page = '''<!doctype html>
<html lang="ar" dir="rtl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>دليل تعديل محتوى البورتفوليو — content.json</title>
<style>
:root{color-scheme:light;--ink:#19253b;--muted:#53637e;--blue:#2457b2;--line:#dce4ef}*{box-sizing:border-box}html{scroll-behavior:smooth;scroll-padding-top:25px}body{margin:0;background:#f3f6fb;color:var(--ink);font-family:Tahoma,Arial,sans-serif;font-size:15px;line-height:1.95}header{max-width:1210px;margin:38px auto 24px;padding:0 24px;display:flex;gap:16px;align-items:center;justify-content:space-between}.eyebrow{color:var(--blue);font-size:12px;letter-spacing:.3px;font-weight:700}.tip{font-size:12px;color:var(--muted)}.layout{max-width:1210px;margin:0 auto 64px;padding:0 24px;display:grid;grid-template-columns:245px minmax(0,1fr);gap:25px;align-items:start}aside{position:sticky;top:24px;padding:17px 19px;background:#fff;border:1px solid var(--line);border-radius:12px}summary{cursor:pointer;font-weight:700;color:var(--blue);font-size:14px}nav{max-height:77vh;overflow:auto;margin-top:13px}nav ol{list-style:none;padding:0;margin:0}nav a{display:block;padding:7px 0;color:var(--muted);font-size:12px;line-height:1.7;text-decoration:none}nav a:hover{color:var(--blue)}main{min-width:0;background:#fff;padding:30px 35px 42px;border:1px solid var(--line);border-radius:12px;box-shadow:0 8px 35px #233d6810}h1,h2,h3{line-height:1.65;letter-spacing:-.2px}h1{font-size:29px;margin:0 0 18px;color:#163971}h2{font-size:21px;color:#163971;margin:38px 0 15px;scroll-margin-top:24px}h3{font-size:17px;margin:28px 0 12px}p{margin:12px 0}a{color:var(--blue)}ul,ol{padding-right:24px}li{margin-bottom:7px}hr{border:0;border-top:1px solid var(--line);margin:33px 0}blockquote{margin:20px 0;background:#eef5ff;border-right:3px solid #376bc5;padding:10px 18px;color:#24456d;border-radius:6px}blockquote p{margin:7px 0}code,kbd{font-family:Consolas,'Liberation Mono',monospace;font-size:.88em;direction:ltr;unicode-bidi:isolate;background:#eef2f8;color:#214e8b;padding:2px 5px;border-radius:4px}pre{direction:ltr;text-align:left;overflow-x:auto;max-width:100%;background:#111d30;color:#e3ecfa;padding:19px 20px;border-radius:8px;font-size:13px;line-height:1.7;margin:18px 0}pre code{display:block;background:transparent;color:inherit;padding:0;font-size:inherit;white-space:pre;unicode-bidi:normal}table{border-collapse:collapse;width:100%;margin:20px 0;font-size:13px;line-height:1.9;overflow-wrap:anywhere}th,td{border:1px solid var(--line);padding:10px 12px;text-align:right;vertical-align:top}th{background:#edf3fc;color:#204a84;font-weight:700}tr:nth-child(even) td{background:#f9fbfe}strong{font-weight:700}input[type=checkbox]{accent-color:var(--blue);margin-left:7px}.task-list-item{list-style:none}footer{font-size:11px;color:var(--muted);text-align:center;margin-top:35px;border-top:1px solid var(--line);padding-top:17px}
@media(max-width:900px){header{margin-top:21px}.layout{grid-template-columns:1fr;gap:18px}aside{position:static}nav{max-height:220px}main{padding:23px 22px}h1{font-size:24px}h2{font-size:19px}header .tip{max-width:150px;font-size:10px}}
@media(max-width:480px){body{font-size:14px}.layout,header{padding-left:14px;padding-right:14px}main{padding:21px 16px}table{font-size:11px}th,td{padding:8px 7px}pre{font-size:11px;padding:14px}code{overflow-wrap:anywhere}pre code{overflow-wrap:normal}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
@media print{@page{size:A4;margin:16mm}body{background:#fff;font-size:10pt}header,aside{display:none}.layout{display:block;padding:0;margin:0;max-width:none}main{border:0;box-shadow:none;padding:0}h1{font-size:21pt}h2{font-size:15pt;break-after:avoid}h3{break-after:avoid}pre{white-space:pre-wrap;background:#f2f5fa;color:#19253b;font-size:8pt}pre code{white-space:pre-wrap}table{font-size:8pt}tr{break-inside:avoid}a{color:inherit;text-decoration:none}footer{font-size:8pt}}
</style></head><body>
<header><div class="eyebrow">EYAD ELDOKANY · دليل إدارة المحتوى</div><div class="tip">دليل محلي كامل · استخدم Ctrl / ⌘ + F للبحث</div></header>
<div class="layout"><aside><details open><summary>فهرس الدليل</summary><nav aria-label="فهرس دليل التعديل"><ol>''' + nav + '''</ol></nav></details></aside><main>''' + body + '''<footer>مرجع السورس المحدّث · النسخة القابلة للتحرير: CONTENT-EDITING-GUIDE.ar.md<br>يمكنك تنزيل هذا الملف وفتحه في المتصفح، أو استخدام الطباعة لحفظه PDF.</footer></main></div></body></html>'''
output = ROOT/'CONTENT-EDITING-GUIDE.ar.html'
output.write_text(page)
shutil.copyfile(output, ROOT.parent/'Eyad-Portfolio-Content-Guide.html')
shutil.copyfile(ROOT/'CONTENT-EDITING-GUIDE.ar.md', ROOT.parent/'Eyad-Portfolio-Content-Guide.md')
print('Guide exported:', output, '|', len(entries), 'chapters |', round(len(page.encode())/1024,1), 'KiB')
