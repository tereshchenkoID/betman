import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

import { useFavorites } from '@/context/FavoritesContext'
import useModal from '@/hooks/useModal'
import { useUser } from '@/hooks/useUser'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const Favorite = ({
  data,
  className = 'square',
}) => {
  const t = useTranslations()
  const { isAuth } = useUser()
  const { isFavorite, toggleFavorite } = useFavorites(data)
  const { openModal, closeAllModals } = useModal()

  const handleToggle = () => {
    if (!isAuth) {
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
      <Icon name={ROUTES_USER.favorites.icon} />
    </Action>
  )
}

export default Favorite
