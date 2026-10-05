import pathlib,json,re,sys,xml.etree.ElementTree as E
root=pathlib.Path(__file__).resolve().parents[1];metadata={}
for f in root.rglob('*.md'):
 if 'node_modules' in f.parts:continue
 s=f.read_text(errors='replace');front=s.split('---',2)[1] if s.startswith('---') else '';fields=dict(re.findall(r'^([\w]+):\s*(.*)$',front,re.M));topic=fields.get('topic');
 if not topic:continue
 post={'topic':topic,'pillar':fields.get('series','Engineering'),'text':s.split('---',2)[-1],'draftPath':str(f.relative_to(root)), 'drill':fields.get('drill')}
 metadata[f.stem]=post
 for ref in re.findall(r'(?:image:\s*|\]\()([^\s)]+\.png)',s):metadata[pathlib.Path(ref).stem]=post
for name in ['content-calendar.json','archive/content-calendar-entries.json','ai-engineer-revision-calendar.json']:
 for item in json.loads((root/name).read_text())['items']:
  draft=item.get('draftPath') or item.get('postPath');image=item.get('imagePath');post={**metadata.get(pathlib.Path(draft).stem,{}) ,**item,'topic':item.get('baseTopic') or item['topic'],'pillar':item.get('pillar') or item.get('series') or ('AI Engineer Revision Series' if 'revision' in name else 'Engineering')}
  if draft:metadata[pathlib.Path(draft).stem]=post;metadata[pathlib.Path(draft).stem+'-doodle']=post
  if image:metadata[pathlib.Path(image).stem]=post
plan=[]
for f in sorted(root.rglob('*.png')):
 if 'node_modules' in f.parts:continue
 svg=f.with_suffix('.svg');post=metadata.get(f.stem);enhanced=False
 if svg.exists():
  r=E.parse(svg).getroot();enhanced=r.get('height')=='1200' and bool(r.get('aria-labelledby'))
  if not post:
   texts=list(r.iter('{http://www.w3.org/2000/svg}text'));subtitle=' '.join(''.join(e.itertext()) for e in texts if e.get('class')=='subtitle');title=' '.join(''.join(e.itertext()) for e in texts if e.get('class')=='title');post={'topic':subtitle or title,'pillar':title,'source':'existing SVG'}
 if not post:
  candidates=[(key,value) for key,value in metadata.items() if key.endswith(f.stem) or f.stem.endswith(key)]
  core=re.sub(r'^\d{4}-\d\d-\d\d-(?:day-\d+-)?','',f.stem).removesuffix('-doodle')
  core=re.sub(r'^(?:mlops|k8s|python|fundamentals)-','',core)
  topic_matches=[v for v in metadata.values() if re.sub(r'[^a-z0-9]+','-',v['topic'].lower()).strip('-')==core]
  post=max(candidates,key=lambda kv:len(kv[0]))[1] if candidates else topic_matches[0] if topic_matches else {'topic':core.replace('-',' '),'pillar':'Engineering','source':'asset filename'}
 plan.append({'imagePath':str(f.relative_to(root)),'enhanced':enhanced,'post':post})
pathlib.Path(sys.argv[1]).write_text(json.dumps(plan,indent=2));print('Total',len(plan),'remaining',sum(not x['enhanced'] for x in plan));print('Filename fallback',[x['imagePath'] for x in plan if x['post'].get('source')=='asset filename'])
