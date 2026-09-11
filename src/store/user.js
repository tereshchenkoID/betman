import { createStore } from 'zustand'

export const createUserStore = (initProps) => {
  return createStore((set) => ({
    user: initProps?.user || null,

    setUser: (user) => set({ user }),

    updateUser: (partial) =>
      set((state) => {
        if (!state.user) return { user: null }

        const updated = { ...state.user }

        for (const key in partial) {
          if (
            partial[key] &&
            typeof partial[key] === 'object' &&
            !Array.isArray(partial[key])
          ) {
            updated[key] = { ...updated[key], ...partial[key] }
          } else {
            updated[key] = partial[key]
          }
        }

        return { user: updated }
      }),
  }))
}
