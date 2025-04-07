const properties = PropertiesService.getScriptProperties().getProperties();
const geminiApiKey = properties['GOOGLE_API_KEY'];
const geminiEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiApiKey}`;

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



function testGemini() {
  const prompt = "The best thing since sliced bread is";
  const output = callGemini(prompt);
  console.log(prompt, output);
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

