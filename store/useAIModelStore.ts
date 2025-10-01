import { OpenAIModelEnum } from "@/utils/aiModels";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAIModelStore = create(
  persist(
    (set) => ({
      model: OpenAIModelEnum.GPT_4_1_MINI,
      setModel: (model: string) => set({ model }),
      clearModel: () => set({ model: null }),
    }),
    {
      name: "ai-model-storage",
    }
  )
);
