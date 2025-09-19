import { createOpenAI } from "@ai-sdk/openai"
import { consumeStream, convertToModelMessages, streamText, type UIMessage } from "ai"

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const openai = createOpenAI({
    headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
})
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const prompt = convertToModelMessages(messages)

  const result = streamText({
    model: openai.responses("gpt-4.1-mini"),
    prompt,
    abortSignal: req.signal,
    system: "You are a helpful AI assistant. Provide clear, concise, and helpful responses.",

  })

  return result.toUIMessageStreamResponse({
    onFinish: async ({ isAborted }) => {
      if (isAborted) {
        console.log("Chat request aborted")
      }
    },
    consumeSseStream: consumeStream,
  })
}
