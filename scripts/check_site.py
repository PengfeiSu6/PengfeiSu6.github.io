"""Buildless-site checks. Run: python3 scripts/check_site.py"""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.ids=[]; self.links=[]; self.h1=0; self.feed(text)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs)
        if 'id' in a: self.ids.append(a['id'])
        if tag=='h1': self.h1+=1
        for attr in ('href','src'):
            if attr in a: self.links.append(a[attr])
pages={p:Page(p.read_text()) for p in ROOT.rglob('*.html') if '.git' not in p.parts}
errors=[]
for p,page in pages.items():
    if len(page.ids)!=len(set(page.ids)): errors.append(f'{p}: duplicate IDs')
    if page.h1!=1: errors.append(f'{p}: expected one h1, got {page.h1}')
    for link in page.links:
        u=urlsplit(link)
        if u.scheme or u.netloc: continue
        target=(ROOT/unquote(u.path).lstrip('/') if u.path.startswith('/') else p.parent/unquote(u.path)).resolve() if u.path else p
        if target.is_dir(): target=target/'index.html'
        if not target.exists(): errors.append(f'{p}: missing {link}')
        elif u.fragment and target in pages and unquote(u.fragment) not in pages[target].ids: errors.append(f'{p}: missing anchor {link}')
for name in ['','publications/','services/','research/','education/','awards/','contact/']:
    assert ROOT.joinpath(name,'index.html').exists()
    assert ROOT.joinpath('en',name,'index.html').exists()
for lang in ['', 'en/']:
    text=ROOT.joinpath(lang+'education/index.html').read_text()
    assert ('Mar 2021' if lang else '2021.03') in text
if errors: raise SystemExit('\n'.join(errors))
print(f'PASS: {len(pages)} bilingual pages, local links/assets/anchors, unique IDs, one h1, corrected education dates')
