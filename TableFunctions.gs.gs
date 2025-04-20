function wordCount() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const text = body.getText();
  
  const words = text.match(/\b\w+\b/g);
  const wordCount = words ? words.length : 0;

  const trueWC = wordCount.valueOf()-1; //correct for inconsistency
  
  Logger.log("Word count: " + trueWC);
  return trueWC;
}

function sentenceCount() {
  const doc = DocumentApp.getActiveDocument();
  const body = doc.getBody();
  const text = body.getText();
  
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
