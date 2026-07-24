import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

import { useFavorites } from '@/context/FavoritesContext'
import { useModal } from '@/context/ModalContext'

import Icon from '@/components/Icon'
import Action from '@/components/Action'
import LoginModal from '@/modules/Modals/LoginModal'

import style from './index.module.scss'

const Favorite = ({ data, user }) => {
  const t = useTranslations()
  const { isFavorite, toggleFavorite } = useFavorites(data)
  const { openModal, closeAllModals } = useModal()

  const handleToggle = () => {
    if (!user?.id) {
      closeAllModals()
      openModal({
        title: t('sign_up'),
        body: <LoginModal />,
      })
    }
    else {
      toggleFavorite(data)
    }
  }

  return (
    <Action
      classes={['secondary', 'md', 'square', style.block, isFavorite(data) ? style.active : style.default]}
      onChange={handleToggle}
    >
      <Icon name={ROUTES_USER.favourites.icon} />
    </Action>
  )
}

export default Favorite
