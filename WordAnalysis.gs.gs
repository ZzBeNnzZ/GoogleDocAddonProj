function countWordsAndStats() {
  const body = DocumentApp.getActiveDocument().getBody();
  const text = body.getText();


  const words  = text.trim().split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  // words.forEach((word,index) => {
  //   console.log(`Word ${index + 1}: ${word}`);
  // })
  const sentences = text.split(/(?<=[.!?])\s+|\n{2,}|\r?\n(?=[A-Z•\-•])/).filter(s => s.trim().length > 0);
  // sentences.forEach((sentence,index) => {
  //   console.log(`Sentence ${index + 1}: ${sentence}`);
  // })

  const sentenceCount = sentences.length;
  const paragraphCount = body.getParagraphs().length;
  

  //This will show in Apps Script IDE's Logs
  Logger.log('Word Count: ' + wordCount);
  Logger.log('Sentence Count: ' + sentenceCount);
  Logger.log('Paragraph Count: ' + paragraphCount);



  return {
    wordCount,
    sentenceCount,
    paragraphCount
  };
}
function countWordsBySmartSections() {
  const body  = DocumentApp.getActiveDocument().getBody();
  const paras = body.getParagraphs();
  const sections = new Map();
  let currentKey  = 'Uncategorized Section';
  const numeral   = /^\d+[\.\)]\s+/;

  paras.forEach(p => {
    const parentType = p.getParent().getType();
    if (parentType === DocumentApp.ElementType.HEADER_SECTION ||
        parentType === DocumentApp.ElementType.FOOTER_SECTION) return;

    const txt  = p.getText().trim();
    const head = p.getHeading();

    if (head !== DocumentApp.ParagraphHeading.NORMAL && txt) {
      currentKey = txt;
      return;                                 // do NOT add heading to body
    }

    if (p.getType() === DocumentApp.ElementType.LIST_ITEM) {
      const li = p.asListItem();
      if (li.getNestingLevel() === 0 && txt) {
        currentKey = txt;                     // title = first‑level list item
        return;                               // skip counting this bullet
      }
    }

    if (numeral.test(txt)) {                  // manual “1. …”
      currentKey = txt;
      return;
    }

    const clean = txt.replace(/^\s*[\dIVX]+\s*[.)]\s+|^\s*[•\-–]\s+/, '');
    sections.set(currentKey, (sections.get(currentKey) || '') + ' ' + clean);
  });

  const results = [];
  sections.forEach((text, title) => {
    const count = (text.match(/[A-Za-zÀ-ÖØ-öø-ÿ0-9’'-]+/g) || []).length;
    results.push({ title, wordCount: count });
  });

  Logger.log(JSON.stringify(results, null, 2));
  return results;
}


function getDocumentStats() {
    return countWordsAndStats();
  }