import { createStore } from 'zustand'

export const createUserStore = (initProps) => {
  return createStore((set) => ({
    user: initProps?.user || null,

    setUser: (user) => set({ user }),

    updateUser: (partialUser) =>
      set((state) => ({
        user: state.user ? { ...state.user, ...partialUser } : partialUser,
      })),

    updateBalance: (balance) =>
      set((state) => ({
        user: state.user ? { ...state.user, balance } : null,
      })),
  }))
}
