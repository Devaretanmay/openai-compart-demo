const { Configuration, OpenAIApi } = require("openai");

function getOpenAIClient(apiKey = "mock-api-key") {
  try {
    const OpenAI = require("openai");
    if (typeof OpenAI === "function") {
      return new OpenAI({ apiKey });
    }
  } catch (e) {}
  const config = new Configuration({ apiKey });
  return new OpenAIApi(config);
}

class ChatService {
  constructor(apiKey = "mock-api-key") {
    this.client = getOpenAIClient(apiKey);
  }

  async sendPrompt(prompt, model = "gpt-3.5-turbo") {
    const response = await this.client.createChatCompletion({
      model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    return response.data?.choices?.[0]?.message?.content || response.choices?.[0]?.message?.content;
  }
}

module.exports = { ChatService, getOpenAIClient };
