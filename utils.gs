const properties = PropertiesService.getScriptProperties().getProperties();
const geminiApiKey = properties['GOOGLE_API_KEY'];
const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;
const hexColor = '#1a73e8'


// get user selected text
function getSelectedText() {
  const selection = DocumentApp.getActiveDocument().getSelection();
  const text = [];
  if (selection) {
    const elements = selection.getSelectedElements();
    for (let i = 0; i < elements.length; ++i) {
      if (elements[i].isPartial()) {
        const element = elements[i].getElement().asText();
        const startIndex = elements[i].getStartOffset();
        const endIndex = elements[i].getEndOffsetInclusive();

        text.push(element.getText().substring(startIndex, endIndex + 1));
      } else {
        const element = elements[i].getElement();
        // Only translate elements that can be edited as text; skip images and
        // other non-text elements.
        if (element.editAsText) {
          const elementText = element.asText().getText();
          // This check is necessary to exclude images, which return a blank
          // text element.
          if (elementText) {
            text.push(elementText);
          }
        }
      }
    }
  }
  if (!text.length) throw new Error('Please select some text.');
  return text;
}

function insertTextAfterSelection(newText, color = hexColor) {
  newText = "\n" + newText + "\n";
  const doc       = DocumentApp.getActiveDocument();
  const selection = doc.getSelection();
  if (!selection) throw new Error('select some text first.');

  const elements  = selection.getSelectedElements();
  const lastSel   = elements[elements.length - 1];

  if (lastSel.isPartial()) {
    const textElem  = lastSel.getElement().asText();
    const endOffset = lastSel.getEndOffsetInclusive();

    textElem.insertText(endOffset + 1, newText);
    textElem.setForegroundColor(
      endOffset + 1,
      endOffset + newText.length,
      color
    );

  } else {
    const elem = lastSel.getElement();

    if (elem.editAsText) {
      const added = elem.asText().appendText(newText);
      added.setForegroundColor(color);
    } else {
      const parent = elem.getParent();
      const idx = parent.getChildIndex(elem);
      const p = parent.insertParagraph(idx + 1, newText);
      const txt = p.getChild(0).asText();
      txt.setForegroundColor(0, newText.length - 1, color);
    }
  }
}

// BASIC PROMPT CALLING
function callGemini(prompt, temperature=0) {
  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": prompt
          },
        ]
      }
    ], 
    "generationConfig":  {
      "temperature": temperature,
    },
  };

  const options = { 
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(geminiEndpoint, options);
  const data = JSON.parse(response);
  const content = data["candidates"][0]["content"]["parts"][0]["text"];
  return content;
}

// CALLING GEMINI WITH TOOLS
function callGeminiWithTools(prompt, tools, temperature=0) {
  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": prompt
          },
        ]
      }
    ], 
    "tools" : tools,
    "generationConfig":  {
      "temperature": temperature,
    },    
  };

  const options = { 
    'method' : 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify(payload)
  };

  const response = UrlFetchApp.fetch(geminiEndpoint, options);
  const rawText = response.getContentText();
  console.log("Raw Gemini response:", rawText);
  const data = JSON.parse(response);
  const content = data["candidates"][0]["content"]["parts"][0]["functionCall"];
  return content;
}



function testGemini(prompt) {
  const output = callGemini(prompt);
  console.log(prompt, output);
  return output
}

function testGeminiTools() {
  const prompt = "Tell me what day of the month it is";
  const tools = {
    "function_declarations": [
      {
        "name": "datetime",
        "description": "Returns the current date and time as a formatted string.",
        "parameters": {
          "type": "object",
          "properties": {}
        }
      }
    ]
  };
  const output = callGeminiWithTools(prompt, tools);
  console.log(prompt, output);
}

