
function showProgressBarSidebar()
{
  const html = HtmlService.createHtmlOutputFromFile('PBSidebar')
    .setTitle('Writing Progress')
    .setWidth(300);
  DocumentApp.getUi().showSidebar(html);
}

function getWordCount()
{
  const body = DocumentApp.getActiveDocument().getBody();
  const text = body.getText();
  const wordCount = text.trim().split(/\s+/).filter(word => word !== "").length;
  return wordCount;
}

function getProgressData()
{
  const current = getWordCount();
  //const maxWords = 2000;
  const userProps = PropertiesService.getUserProperties();
  const maxWords = userProps.getProperty('wordGoal');
  const percent = Math.min((current / maxWords) * 100, 100);
  return { current, percent };
}

function callAlert()
{
  Logger.log("callAlert function being triggered");
  DocumentApp.getUi().alert("Updating Progress");
  
}

function getExpectedProgressData()
{
  const userProps = PropertiesService.getUserProperties();

  const startStr = userProps.getProperty('startDate');
  const endStr = userProps.getProperty('endDate');
  const wordGoalStr = userProps.getProperty('wordGoal');

  if (!startStr || !endStr)
    {
      return { percent: 0 };
    }

  const start = new Date(startStr);
  const end = new Date(endStr);
  const now = new Date();

  const totalDuration = end - start;
  const elapsed = now - start;
  DocumentApp.getUi().alert("It is currently: " + now + " and the time comparison is: " + elapsed + " vs " + totalDuration);
  let percent = Math.max(0, Math.min((elapsed / totalDuration) * 100, 100));
  percent = Math.round(percent * 10) / 10;

  return { percent };
}

function saveProgressSettings(start, end, wordGoal)
{
  const userProps = PropertiesService.getUserProperties();
  userProps.setProperty('startDate', start);
  userProps.setProperty('endDate', end);
  userProps.setProperty('wordGoal', wordGoal.toString());
}

function getProgressSettings()
{
  const userProps = PropertiesService.getUserProperties();
  return{
    start: userProps.getProperty('startDate'),
    end: userProps.getProperty('endDate'),
    wordGoal: userProps.getProperty('wordGoal')
  };
}


