import { useTranslations } from 'next-intl'

import { useRouter } from '@/i18n/navigation'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

export const useGamePlay = (user) => {
  const t = useTranslations()
  const router = useRouter()
  const { openModal, closeAllModals } = useModal()

  const handlePlay = (gameId) => {
    if (!gameId) return

    if (user?.id) {
      closeAllModals()

      if (user?.level === '1') {
        openModal('verify', { user }, { title: t('verification') })
      }
      else {
        router.push(`${NAVIGATION.game.url}/${gameId}/0`)
      }
    } else {
      openModal('login', {}, { title: t('sign_up') })
    }
  }

  const handleDemo = () => {
    closeAllModals()
  }

  const handleOpenGameModal = (gameData) => {
    if (gameData) {
      openModal('game', { data: gameData, user })
    }
  }

  return {
    handlePlay,
    handleDemo,
    handleOpenGameModal,
  }
}
