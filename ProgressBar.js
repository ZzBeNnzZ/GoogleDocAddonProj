
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
  Logger.log("callAlert function being triggered");
  DocumentApp.getUi().alert("Updating Progress");
  
}

function getExpectedProgressData() {
  // Placeholder start and end dates (use your preferred format/timezone)
  const start = new Date("April 20, 2025 00:00:00"); 
  const end = new Date("April 22, 2025 23:59:59");
  const now = new Date();

  const totalDuration = end - start;
  const elapsed = now - start;

  let percent = Math.max(0, Math.min((elapsed / totalDuration) * 100, 100));
  percent = Math.round(percent * 10) / 10; // round to tenths

  return { percent };
}
