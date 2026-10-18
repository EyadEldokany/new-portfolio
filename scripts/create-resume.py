"""Create a text-selectable resume, using only the public portfolio content."""
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4
from pathlib import Path
from xml.sax.saxutils import escape
import json

ROOT = Path(__file__).resolve().parent.parent
content = json.loads((ROOT / 'src/content.json').read_text())
for weight, file in [('Regular','400'),('Medium','500'),('Bold','700')]:
    pdfmetrics.registerFont(TTFont('Manrope'+weight, str(ROOT / f'public/fonts/manrope-normal-{file}.ttf')))
pdfmetrics.registerFontFamily('ManropeRegular', normal='ManropeRegular', bold='ManropeBold', italic='ManropeRegular', boldItalic='ManropeBold')
INK=colors.HexColor('#142542'); MUTED=colors.HexColor('#586579'); ORANGE=colors.HexColor('#285bb7')
styles={
 'name':ParagraphStyle('name',fontName='ManropeMedium',fontSize=28,leading=33,textColor=INK,spaceAfter=4),
 'role':ParagraphStyle('role',fontName='ManropeBold',fontSize=10,leading=16,textColor=ORANGE,spaceAfter=8),
 'contact':ParagraphStyle('contact',fontName='ManropeRegular',fontSize=8,leading=13,textColor=MUTED,spaceAfter=10),
 'section':ParagraphStyle('section',fontName='ManropeBold',fontSize=9,leading=14,textColor=ORANGE,spaceBefore=15,spaceAfter=8),
 'body':ParagraphStyle('body',fontName='ManropeRegular',fontSize=8.3,leading=13.5,textColor=INK,spaceAfter=5),
 'item':ParagraphStyle('item',fontName='ManropeBold',fontSize=9.1,leading=14,textColor=INK,spaceAfter=2),
 'meta':ParagraphStyle('meta',fontName='ManropeRegular',fontSize=7.8,leading=12.5,textColor=MUTED,spaceAfter=5),
}
def P(t,kind='body'): return Paragraph(t,styles[kind])
def safe(t): return escape(str(t))
story=[]
story += [P('Eyad Eldokany','name'),P('AI ENGINEER · LLM SYSTEMS · COMPUTER VISION','role')]
story += [P('Egypt &nbsp;|&nbsp; <link href="mailto:eyad.eldokany@gmail.com">eyad.eldokany@gmail.com</link><br/><link href="https://github.com/EyadEldokany">github.com/EyadEldokany</link> &nbsp;|&nbsp; <link href="https://linkedin.com/in/eyad-eldokany">linkedin.com/in/eyad-eldokany</link>','contact')]
story += [P('PROFILE','section'),P('AI Engineer and EELU Computer Science graduate focused on bridging AI research and deployed applications. Builds end-to-end systems across LLMs, agentic workflows, computer vision, and machine learning, supported by 40+ GitHub repositories.')]
story += [P('TECHNICAL EXPERTISE','section')]
for s in content['skills']:
    story.append(P('<b>'+safe(s['name'])+'</b> &nbsp; '+safe(s['pills'].replace(',', ' · '))))
story += [P('EXPERIENCE','section')]
for e in content['exp']:
    story.append(KeepTogether([P(safe(e['title'].strip()),'item'),P(safe(e['org'].strip())+' &nbsp;|&nbsp; '+safe(e['date']),'meta'),P(safe(e['desc'].strip()))]))
story += [P('EDUCATION','section')]
for e in content['edu']:
    story.append(KeepTogether([P(safe(e['title']),'item'),P(safe(e['org'])+' &nbsp;|&nbsp; '+safe(e['date']),'meta'),P(safe(e['desc']))]))
story += [P('SELECTED PROJECTS','section')]
by_id = {p['id']: p for p in content['projects']}
selected=[('HealthBridge — Multimodal Medical AI',content['hb']['lede'],by_id['healthbridge']['link']),('CodeNova — AI Coding Assistant',by_id['codenova']['desc'],by_id['codenova']['link']),('Real-Time Edge AI Attendance',by_id['attendance']['desc'],by_id['attendance']['link']),('Traffic Sign Detection',by_id['traffic']['desc'],by_id['traffic']['link'])]
for title,desc,link in selected:
    story.append(KeepTogether([P(safe(title),'item'),P(safe(desc)),P('<link href="'+safe(link)+'">'+safe(link.replace('https://',''))+'</link>','meta')]))
story += [P('SELECTED CREDENTIALS','section')]
chosen=[content['certs'][-1],content['certs'][0],content['certs'][2],content['certs'][3],content['certs'][4]]
for c in chosen:
    title=safe(c['title'].strip())
    if c['link']:title='<link href="'+safe(c['link'])+'">'+title+'</link>'
    story.append(P(title+' &nbsp;—&nbsp; '+safe(c['issuer'])+', '+safe(c['date'])))

def footer(canvas,doc):
    canvas.saveState();canvas.setStrokeColor(colors.HexColor('#ddded6'));canvas.setLineWidth(.5);canvas.line(40,35,A4[0]-40,35)
    canvas.setFont('ManropeRegular',6.5);canvas.setFillColor(MUTED);canvas.drawString(40,23,'Eyad Eldokany · AI Engineer');canvas.drawRightString(A4[0]-40,23,str(doc.page));canvas.restoreState()
doc=SimpleDocTemplate(str(ROOT/'public/Eyad-Eldokany-Resume.pdf'),pagesize=A4,rightMargin=40,leftMargin=40,topMargin=35,bottomMargin=48,title='Eyad Eldokany — AI Engineer',author='Eyad Eldokany')
doc.build(story,onFirstPage=footer,onLaterPages=footer)
print('Resume created:',ROOT/'public/Eyad-Eldokany-Resume.pdf')
