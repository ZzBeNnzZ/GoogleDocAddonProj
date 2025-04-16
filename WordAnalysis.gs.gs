function countWordsAndStats() {
  const body = DocumentApp.getActiveDocument().getBody();
  const text = body.getText();

  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const sentenceCount = (text.match(/[\w\s,;]+[.!?]/g) || []).length;
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

function getDocumentStats() {
    return countWordsAndStats();
  }