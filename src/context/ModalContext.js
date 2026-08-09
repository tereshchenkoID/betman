'use client'

import {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect
} from 'react'

import { MODAL_REGISTRY } from '@/modules/Modals/registry'

import Modal from '@/components/Modal'

const ModalContext = createContext()

export function ModalProvider({ children }) {
  const [modals, setModals] = useState([])

  const openModal = useCallback((name, props = {}, modalOptions = {}) => {
    const Component = MODAL_REGISTRY[name]

    const id = window.crypto?.randomUUID
      ? window.crypto.randomUUID()
      : `${Date.now()}-${Math.random()}`

    setModals((prev) => {
      const isOpened = prev.some(
        (m) => m.name === name && m.title === modalOptions.title && modalOptions.title !== ''
      )
      if (isOpened) return prev

      return [
        ...prev,
        {
          id,
          name,
          Component,
          props,
          ...modalOptions,
          zIndex: 10 + prev.length,
        },
      ]
    })

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
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [modals.length, closeModal])

  useEffect(() => {
    if (!modals.length) return

    const scrollY = window.scrollY

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    document.body.style.overflowY = 'scroll'

    return () => {
      const savedTop = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflowY = ''

      window.scrollTo(0, parseInt(scrollY || '0') * -1)

      if (savedTop) {
        window.scrollTo(0, parseInt(savedTop, 10) * -1)
      }
    }
  }, [modals.length])

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAllModals }}>
      {children}
      {
        modals.map((modal) => {
          const ModalBody = modal.Component

          return (
            <Modal
              key={modal.id}
              zIndex={modal.zIndex}
              title={modal.title}
              size={modal.size || 'sm'}
              isPointer={modal.isPointer || false}
              onClose={closeModal}
            >
              {ModalBody ? <ModalBody {...(modal.props || {})} /> : modal.body}
            </Modal>
          )
        })
      }
    </ModalContext.Provider>
  )
}

export function useModal() {
  return useContext(ModalContext)
}
