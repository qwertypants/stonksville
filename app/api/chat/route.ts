import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const lmstudio = createOpenAICompatible({
  name: "lmstudio",
  baseURL: "http://localhost:1234/v1",
});

const model = lmstudio("gemma-3-12b-it");

// const model = openai("gpt-4o-mini");

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model,
    messages,
  });

  return result.toDataStreamResponse();
}
