import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import type { CategoryLimits } from "@/types/typeCategory"

type CategoryLimitsState = {
  limit: CategoryLimits | null
  setLimit: (limit: CategoryLimits) => void
}

export const useCategoryLimitsStore = create<CategoryLimitsState>()(
  persist(
    (set) => ({
      limit: null,

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
