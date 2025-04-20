function wordCount() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();

  let text = '';
  
  // Build text from normal paragraphs only (excluding headings)
  paragraphs.forEach(p => {
    if (p.getHeading() === DocumentApp.ParagraphHeading.NORMAL) {
      text += p.getText() + ' '; //only count normal text for words
    }
  });

  // Trim any trailing spaces
  text = text.trim();

  // Count words
  const words = text.match(/\b\w+\b/g);
  const wordCount = words ? words.length : 0;

  const trueWC = wordCount.valueOf()-1; //correct for inconsistency
  
  Logger.log("Word count: " + trueWC);
  return trueWC;
}

function sentenceCount() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();
  let text = '';
  
  // Build text from normal paragraphs only (excluding headings)
  paragraphs.forEach(p => {
    if (p.getHeading() === DocumentApp.ParagraphHeading.NORMAL) {
      text += p.getText() + ' '; //only count normal text for sentences
    }
  });

  // Trim any trailing spaces
  text = text.trim();
  
  const sentences = text.match(/[^.!?]+[.!?]+(\s|$)/g);
  //Sentence is something that ends in any of .!?, so it will miss section headings, etc.
  const sentenceCount = sentences ? sentences.length : 0;

  const trueWC = sentenceCount.valueOf()-1; //correct for inconsistency
  
  Logger.log("Sentence count: " + trueWC);
  return trueWC;
}

function paragraphCount() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();

  const nonEmptyParagraphs = paragraphs.filter(p => p.getText().trim().length > 0 && p.getHeading() === DocumentApp.ParagraphHeading.NORMAL);
  //Paragraph is any text segment (return bounded) that is not a heading. In the test document, this includes all of the red and bold text as it is technically not a section heading.
  const paragraphCount = nonEmptyParagraphs.length;
  
  Logger.log("Paragraph count: " + paragraphCount);
  return paragraphCount;
}

function mostReusedWords() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const paragraphs = body.getParagraphs();

  let text = '';
  
  // Build text from normal paragraphs only (excluding headings)
  paragraphs.forEach(p => {
    if (p.getHeading() === DocumentApp.ParagraphHeading.NORMAL) {
      text += p.getText() + ' '; //only count normal text for words
    }
  });

  // Trim any trailing spaces
  text = text.trim();

  // Count words
  const words = text.match(/\b\w+\b/g);
  const wordCount = words ? words.length : 0;

  let wordStats = {};
  let maxWord = "";
  let maxWordNum = 0;
  words.forEach(word => {
    if (word.length > 0) {
      if (!wordStats[word]) wordStats[word] = 0;
      wordStats[word]+=1;
    }
    if (wordStats[word] > maxWordNum) {
      maxWord = word;
      maxWordNum = wordStats[word];
    }
  });

  
  Logger.log("Most reused word: "+maxWord);
  return {"maxWord": maxWord, "data": wordStats};
}
