function onOpen() {
  DocumentApp.getUi()
    .createMenu('My Add-on') // Adds a menu to Google Docs
    .addItem('Say Hello', 'sayHello')
    .addItem('Say Goodbye', 'sayGoodbye')
    .addItem('Side Bar open','showSidebar')
    //.addItem('Progress Bar Open', 'showProgressBarSidebar')
    .addToUi();
}

function sayHello() {
  DocumentApp.getUi().alert('Hello, World!');
}

function sayGoodbye() {
  DocumentApp.getUi().alert('Goodbye, World!');
}

function showSidebar() {
  var settings = Settings.getSettings(); // Get stored settings
  var width = settings.sidebarWidth || 300; // Fallback to 300 if not defined
  const html = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle('My Custom UI')
    .setWidth(width);
  DocumentApp.getUi().showSidebar(html);
}


// --- Settings functions ---

function getSettings() {
  return Settings.getSettings();
}

function saveSettings(settings) {
  Settings.setSettings(settings); // This calls the function from the Settings.gs file.
  return "Settings saved successfully!";
}

