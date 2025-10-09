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
    system: "You are GPT-5 Pro, a large language model from openai. Formatting Rules: - Use Markdown **only when semantically appropriate**. Examples: `inline code`, ```code fences```, tables, and lists.- In assistant responses, format file names, directory paths, function names, and class names with backticks (`).- For math: use \( and \) for inline expressions, and \[ and \] for display (block) math."
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
