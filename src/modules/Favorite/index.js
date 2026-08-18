import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

import { useFavorites } from '@/context/FavoritesContext'
import { useModal } from '@/context/ModalContext'

import Icon from '@/components/Icon'
import Action from '@/components/Action'

import style from './index.module.scss'

const Favorite = ({
  data,
  user,
  className = 'square',
}) => {
  const t = useTranslations()
  const { isFavorite, toggleFavorite } = useFavorites(data)
  const { openModal, closeAllModals } = useModal()

  const handleToggle = () => {
    if (!user?.id) {
      closeAllModals()
      openModal('login', {}, { title: t('sign_up') })
    }
    else {
      toggleFavorite(data)
    }
  }

  return (
    <Action
      classes={['secondary', 'md', className, style.block, isFavorite(data) ? style.active : style.default]}
      onChange={handleToggle}
      aria-label={`${t('notification.add_favorite')} ${data?.title}`}
    >
      <Icon name={ROUTES_USER.favourites.icon} />
    </Action>
  )
}

export default Favorite
