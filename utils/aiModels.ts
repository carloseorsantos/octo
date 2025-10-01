export enum OpenAIModelEnum {
  GPT_5 = "gpt-5",
  GPT_5_MINI = "gpt-5-mini",
  GPT_4_1 = "gpt-4.1",
  GPT_4_1_MINI = "gpt-4.1-mini",
}

export const OpenAIModels = [
  { label: "ChatGPT 5", value: OpenAIModelEnum.GPT_5, disabled: true },
  {
    label: "ChatGPT 5 Mini",
    value: OpenAIModelEnum.GPT_5_MINI,
    disabled: true,
  },
  { label: "ChatGPT 4.1", value: OpenAIModelEnum.GPT_4_1, disabled: true },
  {
    label: "ChatGPT 4.1 Mini",
    value: OpenAIModelEnum.GPT_4_1_MINI,
    disabled: false,
  },
];

export const AIModels = [
  {
    label: "OpenAI",
    models: OpenAIModels,
  },
];
