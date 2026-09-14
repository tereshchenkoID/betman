'use client'

import { Suspense, useEffect } from 'react'

import { useModalStore } from '@/store/modal'

import Modal from '@/components/Modal'

const Modals = () => {
  const modals = useModalStore((state) => state.modals)
  const closeModal = useModalStore((state) => state.closeModal)

  useEffect(() => {
    document.body.style.overflowY = modals.length > 0 ? 'hidden' : 'auto'
    return () => {
      document.body.style.overflowY = 'auto'
    }
  }, [modals.length])

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

  if (!modals.length) return null

  return (
    <>
      {
        modals.map((modal) => {
          const ModalBody = modal.Component

          return (
            <Suspense key={modal.id} fallback={null}>
              <Modal
                zIndex={modal.zIndex}
                title={modal.title}
                size={modal.size || 'sm'}
                isPointer={modal.isPointer || false}
                onClose={closeModal}
              >
                {ModalBody ? <ModalBody {...modal.props} /> : modal.body}
              </Modal>
            </Suspense>
          )
        })
      }
    </>
  )
}

export default Modals
