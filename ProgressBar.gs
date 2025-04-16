
function showProgressBarSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('PBSidebar')
    .setTitle('Writing Progress')
    .setWidth(300);
  DocumentApp.getUi().showSidebar(html);
}

function getWordCount() {
  const body = DocumentApp.getActiveDocument().getBody();
  const text = body.getText();
  const wordCount = text.trim().split(/\s+/).filter(word => word !== "").length;
  return wordCount;
}

function getProgressData() {
  const current = getWordCount();
  const maxWords = 2000;
  const percent = Math.min((current / maxWords) * 100, 100);
  return { current, percent };
}

function callAlert() {
  DocumentApp.getUi().alert("Updating Progress");
}

