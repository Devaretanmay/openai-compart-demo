const test = require("node:test");
const assert = require("node:assert/strict");
const { ChatService, getOpenAIClient } = require("../src/chat");

test("OpenAI client initializes properly for active SDK", () => {
  const client = getOpenAIClient();
  assert.ok(client, "OpenAI client must be defined");
});

test("sendPrompt invokes active OpenAI SDK method without throwing missing method error", async () => {
  const service = new ChatService();
  try {
    await service.sendPrompt("Hello world");
  } catch (error) {
    assert.notEqual(
      error.name,
      "TypeError",
      `Contract error detected: method does not exist on SDK: ${error.message}`
    );
    assert.doesNotMatch(
      error.message,
      /createChatCompletion is not a function/i,
      "createChatCompletion method was removed in OpenAI v4 SDK"
    );
  }
});
