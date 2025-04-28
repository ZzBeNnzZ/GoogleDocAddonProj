
function wordCount() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();

  let text = '';
  paragraphs.forEach(p => {
    if (p.getHeading() === DocumentApp.ParagraphHeading.NORMAL) {
      text += p.getText() + ' ';
    }
  });
  text = text.trim();

  const words = text.match(/\b\w+\b/g);
  const count = words ? words.length : 0;
  // adjust if needed
  const trueCount = Math.max(0, count - 1);
  return trueCount;
}

function sentenceCount() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();

  let text = '';
  paragraphs.forEach(p => {
    if (p.getHeading() === DocumentApp.ParagraphHeading.NORMAL) {
      text += p.getText() + ' ';
    }
  });
  text = text.trim();

  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g);
  const count = sentences ? sentences.length : 0;
  const trueCount = Math.max(0, count - 1);
  return trueCount;
}

function paragraphCount() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();

  const nonEmpty = paragraphs.filter(p =>
    p.getText().trim().length > 0 &&
    p.getHeading() === DocumentApp.ParagraphHeading.NORMAL
  );
  return nonEmpty.length;
}

function mostReusedWords() {
  const doc = DocumentApp.getActiveDocument();
  const paragraphs = doc.getBody().getParagraphs();

  let text = '';
  paragraphs.forEach(p => {
    if (p.getHeading() === DocumentApp.ParagraphHeading.NORMAL) {
      text += p.getText() + ' ';
    }
  });
  text = text.trim();

  const words = text.match(/\b\w+\b/g) || [];
  const stats = {};
  let maxWord = '', maxCount = 0;
  words.forEach(w => {
    const lw = w.toLowerCase();
    stats[lw] = (stats[lw] || 0) + 1;
    if (stats[lw] > maxCount) {
      maxCount = stats[lw];
      maxWord = lw;
    }
  });

  return { maxWord: maxWord, data: stats };
}

/**
 * Returns the top-n most frequent normal-text words,
 * excluding any in the user-defined exclusion list.
 *
 * @param {number} n  Number of top words to return.
 * @returns {Array<{word:string,count:number}>}
 */
function topFrequentWords(n) {
  // load exclusions
  const props = PropertiesService.getUserProperties().getProperties();
  const exclStr = props.customExclusions || '';
  const exclusions = exclStr
    .split(',')
    .map(s => s.trim().toLowerCase())
    .filter(s => s);

  // gather normal text
  const paras = DocumentApp.getActiveDocument()
    .getBody()
    .getParagraphs()
    .filter(p => p.getHeading() === DocumentApp.ParagraphHeading.NORMAL);

  const text = paras.map(p => p.getText()).join(' ').trim();
  const words = text.match(/\b\w+\b/g) || [];

  // count, skipping exclusions
  const counts = {};
  words.forEach(w => {
    const lw = w.toLowerCase();
    if (exclusions.includes(lw)) return;
    counts[lw] = (counts[lw] || 0) + 1;
  });

  // sort + slice
  return Object.keys(counts)
    .sort((a, b) => counts[b] - counts[a])
    .slice(0, n)
    .map(w => ({ word: w, count: counts[w] }));
}
