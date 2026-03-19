import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { CategoryLimits } from "@/types/typeCategory"
import { limit } from "@/data/data-limit"

type CategoryLimitsState = {
  limit: CategoryLimits
  setLimit: (limit: CategoryLimits) => void
}

export const useCategoryLimitsStore = create<CategoryLimitsState>()(
  persist(
    (set) => ({
      limit: limit,

      setLimit: (limit: CategoryLimits) =>
        set({
          limit: limit,
        }),
    }),

    {
      name: "categoryLimitsStore",
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
