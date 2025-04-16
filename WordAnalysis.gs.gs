function countWordsAndStats() {
  const body = DocumentApp.getActiveDocument().getBody();
  const text = body.getText();


  const wordCount = text.trim().split(/\s+/).filter(w => w.length > 0).length;
const sentences = text.split(/[.!?]+[\s\n]+/).filter(s => s.trim().length > 0);
  Logger.log(" - " +sentences);

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

function getDocumentStats() {
    return countWordsAndStats();
  }