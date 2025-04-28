function wordCount() {
  const paras = DocumentApp.getActiveDocument()
    .getBody()
    .getParagraphs()
    .filter(p=>p.getHeading()===DocumentApp.ParagraphHeading.NORMAL);
  const text = paras.map(p=>p.getText()).join(' ');
  const words = text.match(/\b\w+\b/g)||[];
  return Math.max(0, words.length-1);
}

function sentenceCount() {
  const paras = DocumentApp.getActiveDocument()
    .getBody()
    .getParagraphs()
    .filter(p=>p.getHeading()===DocumentApp.ParagraphHeading.NORMAL);
  const text = paras.map(p=>p.getText()).join(' ');
  const sents = text.match(/[^.!?]+[.!?]+(\s|$)/g)||[];
  return Math.max(0, sents.length-1);
}

function paragraphCount() {
  const paras = DocumentApp.getActiveDocument()
    .getBody()
    .getParagraphs()
    .filter(p=>p.getHeading()===DocumentApp.ParagraphHeading.NORMAL && p.getText().trim().length>0);
  return paras.length;
}

function mostReusedWords() {
  const paras = DocumentApp.getActiveDocument()
    .getBody()
    .getParagraphs()
    .filter(p=>p.getHeading()===DocumentApp.ParagraphHeading.NORMAL);
  const text = paras.map(p=>p.getText()).join(' ');
  const words = (text.match(/\b\w+\b/g)||[]).map(w=>w.toLowerCase());
  const stats = {};
  let maxWord='', maxCount=0;
  words.forEach(w=>{
    stats[w]=(stats[w]||0)+1;
    if(stats[w]>maxCount){
      maxCount=stats[w];
      maxWord=w;
    }
  });
  return { maxWord, data: stats };
}

function countWordsBySmartSections() {
  const body = DocumentApp.getActiveDocument().getBody();
  const paras = body.getParagraphs();
  const sections = new Map();
  let key = 'Uncategorized';
  paras.forEach(p=>{
    const txt = p.getText().trim();
    if(p.getHeading()!==DocumentApp.ParagraphHeading.NORMAL && txt) {
      key = txt; return;
    }
    const clean = txt.replace(/^\s*[\dIVX]+\s*[.)]\s+|^\s*[•\-–]\s+/, '');
    sections.set(key,(sections.get(key)||'')+' '+clean);
  });
  const out=[];
  sections.forEach((txt,title)=>{
    const count = (txt.match(/\b\w+\b/g)||[]).length;
    out.push({ title, wordCount: count });
  });
  return out;
}

function topFrequentWords(n) {
  const p = PropertiesService.getUserProperties().getProperties();
  const excl = (p.customExclusions||'')
    .split(',').map(s=>s.trim().toLowerCase()).filter(Boolean);
  const paras = DocumentApp.getActiveDocument()
    .getBody()
    .getParagraphs()
    .filter(p=>p.getHeading()===DocumentApp.ParagraphHeading.NORMAL);
  const words = (paras.map(p=>p.getText()).join(' ').match(/\b\w+\b/g)||[])
    .map(w=>w.toLowerCase())
    .filter(w=>!excl.includes(w));
  const counts = {};
  words.forEach(w=>counts[w]=(counts[w]||0)+1);
  return Object.keys(counts)
    .sort((a,b)=>counts[b]-counts[a])
    .slice(0,n)
    .map(w=>({ word: w, count: counts[w] }));
}

// … your existing countWordsSelected, callGemini, progress functions …
