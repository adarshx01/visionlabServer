import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const hindiLearningPrompt = `You are a Hindi language teacher. 
Your student asks you how to say something from English to Hindi.
You should respond with: 
- english: the English version ex: "Do you live in India?"
- hindi: the Hindi translation split into words ex: [{"word": "क्या", "reading": "kyā"}, ...]
- grammarBreakdown: an explanation of the grammar structure per sentence

Always respond with a JSON object with the following format: 
{
  "english": "",
  "hindi": [{
    "word": "",
    "reading": ""
  }],
  "grammarBreakdown": [{
    "english": "",
    "hindi": [{
      "word": "",
      "reading": ""
    }],
    "chunks": [{
      "hindi": [{
        "word": "",
        "reading": ""
      }],
      "meaning": "",
      "grammar": ""
    }]
  }]
}`;

const hindiToEnglishPrompt = `You are a Hindi to English translator.
Translate the given Hindi text to English.
Respond with a JSON object in the following format:
{
  "hindi": "Original Hindi text",
  "english": "English translation",
  "explanation": "Brief explanation of any idiomatic expressions or cultural context"
}`;

const normalChatPrompt = `You are an AI assistant capable of engaging in normal conversation in both English and Hindi.
Respond naturally to the user's input, switching between English and Hindi as appropriate.
Your response should be in the following JSON format:
{
  "text": "Your response text",
  "language": "The language of your response (English or Hindi)"
}`;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const speech = url.searchParams.get("speech") || "formal";
  const question = url.searchParams.get("question") || "Hello";
  const mode = url.searchParams.get("mode") || "hindiLearning";

  let prompt = "";
  switch (mode) {
    case "hindiLearning":
      prompt = `${hindiLearningPrompt}\n\nHow to say "${question}" in Hindi in ${speech} speech?`;
      break;
    case "hindiToEnglish":
      prompt = `${hindiToEnglishPrompt}\n\nTranslate the following Hindi text to English: "${question}"`;
      break;
    case "normalChat":
      prompt = `${normalChatPrompt}\n\nUser: ${question}`;
      break;
    default:
      prompt = `${hindiLearningPrompt}\n\nHow to say "${question}" in Hindi in ${speech} speech?`;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Parse the JSON response
    const jsonResponse = JSON.parse(text);
    
    return new Response(JSON.stringify(jsonResponse), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'An error occurred while processing your request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

