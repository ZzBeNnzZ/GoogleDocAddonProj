function onOpen() {
  DocumentApp.getUi()
    .createMenu('My Add-on')
    //.addItem('Say Hello', 'sayHello')
    //.addItem('Say Goodbye', 'sayGoodbye')
    .addItem('Open Sidebar','showSidebar')
    .addItem('Open Pop-Up','showPopUp')
    .addToUi();
}

function sayHello() {
  DocumentApp.getUi().alert('Hello, World!');
}

function sayGoodbye() {
  DocumentApp.getUi().alert('Goodbye, World!');
}

function showSidebar(){
  const settings = Settings.getSettings();
  const width    = settings.sidebarWidth || 600;
  const html = HtmlService
    .createHtmlOutputFromFile('sidebar')
    .setTitle('Word Analysis Sidebar')
    .setWidth(width);
  DocumentApp.getUi().showSidebar(html);
}

function showPopUp() {
  const settings = Settings.getSettings();
  const width    = settings.sidebarWidth || 600;
  const html = HtmlService
    .createHtmlOutputFromFile('sidebar')
    .setTitle('Word Analysis Pop-Up')
    .setWidth(width)
    .setHeight(600);
  DocumentApp.getUi().showModelessDialog(html,'Word Analysis Pop-Up');
}

// Settings APIs
function getSettings() {
  return Settings.getSettings();
}
function saveSettings(s) {
  Settings.setSettings(s);
  return 'Settings saved!';
}
