function onOpen() {
  DocumentApp.getUi()
    .createMenu('My Add-on') // Adds a menu to Google Docs
    .addItem('Say Hello', 'sayHello')
    .addItem('Say Goodbye', 'sayGoodbye')
    .addItem('Side Bar open','showSidebar')
    .addItem('Progress Bar Open', 'showProgressBarSidebar')
    .addToUi();
}

function sayHello() {
  DocumentApp.getUi().alert('Hello, World!');
}

function sayGoodbye() {
  DocumentApp.getUi().alert('Goodbye, World!');
}

function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('sidebar')
    .setTitle('My Custom UI')
    .setWidth(300);
  DocumentApp.getUi().showSidebar(html);
}
