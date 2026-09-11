import { lazy } from 'react'
import { create } from 'zustand'

import { MODAL_REGISTRY } from '@/widgets/Modals/registry'

const loadedComponents = new Map()

export const useModalStore = create((set, get) => ({
  modals: [],

  openModal: (name, props = {}, modalOptions = {}) => {
    const importFn = MODAL_REGISTRY[name]
    if (!importFn) {
      console.error(`[ModalStore] Modal with name "${name}" not found in MODAL_REGISTRY`)
      return
    }

    if (!loadedComponents.has(name)) {
      loadedComponents.set(name, lazy(importFn))
    }

    const Component = loadedComponents.get(name)
    const title = modalOptions.title ?? ''

    const isOpened = get().modals.some(
      (m) => m.name === name && m.title === title && title !== ''
    )

    if (isOpened) return

    const id = window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`

    set((state) => ({
      modals: [
        ...state.modals,
        {
          id,
          name,
          Component,
          props,
          ...modalOptions,
          title,
          zIndex: 10 + state.modals.length,
        },
      ],
    }))

    return id
  },

  closeModal: () => {
    const { modals } = get()
    if (!modals.length) return

    const top = modals[modals.length - 1]
    top?.onClose?.()

    set({ modals: modals.slice(0, -1) })
  },

  closeAllModals: () => {
    const { modals } = get()
    modals.slice().reverse().forEach((modal) => modal?.onClose?.())
    set({ modals: [] })
  },
}))
