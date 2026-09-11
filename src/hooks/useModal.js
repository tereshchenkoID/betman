import { useModalStore } from '@/store/modal'

export const useModal = () => {
  const openModal = useModalStore((s) => s.openModal)
  const closeModal = useModalStore((s) => s.closeModal)
  const closeAllModals = useModalStore((s) => s.closeAllModals)

  return { openModal, closeModal, closeAllModals }
}

export default useModal
