import { useTranslations } from 'next-intl'

import { useRouter } from '@/i18n/navigation'

import { NAVIGATION } from '@/constant/config'

import useModal from '@/hooks/useModal'
import { useUser } from '@/hooks/useUser'

export const useGamePlay = () => {
  const t = useTranslations()
  const router = useRouter()
  const { id, level } = useUser()
  const { openModal, closeAllModals } = useModal()

  const handlePlay = (gameId) => {
    if (!gameId) return

    if (id) {
      closeAllModals()

      if (level === '1') {
        openModal('verify', { }, { title: t('verification') })
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
      openModal('game', { data: gameData })
    }
  }

  return {
    handlePlay,
    handleDemo,
    handleOpenGameModal,
  }
}
