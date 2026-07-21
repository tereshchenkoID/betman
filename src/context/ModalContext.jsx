'use client'

import { createContext, useState, useContext, useCallback, useEffect } from 'react'

import Modal from '@/components/Modal'

const ModalContext = createContext()

let modalId = 0

export function ModalProvider({ children }) {
  const [modals, setModals] = useState([])

  const openModal = useCallback((content) => {
    const id = ++modalId

    setModals((prev) => [
      ...prev,
      {
        id,
        ...content,
        zIndex: 9 + prev.length + 1,
      },
    ])

    return id
  }, [])

  const closeModal = useCallback(() => {
    setModals((prev) => {
      if (!prev.length) return prev

      const top = prev[prev.length - 1]
      top?.onClose?.()

      return prev.slice(0, -1)
    })
  }, [])

  const closeAllModals = useCallback(() => {
    setModals((prev) => {
      [...prev].reverse().forEach((modal) => modal?.onClose?.())
      return []
    })
  }, [])

  useEffect(() => {
    if (!modals.length) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        closeModal()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [modals.length, closeModal])

  useEffect(() => {
    document.body.style.overflow = modals.length ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [modals.length])

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {
        modals.map((modal) =>
        <Modal
          key={modal.id}
          zIndex={modal.zIndex}
          title={modal.title}
          size={modal.size || 'sm'}
          isPointer={modal.isPointer || false}
          onClose={closeModal}
        >
          {modal.body}
        </Modal>
      )}
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
