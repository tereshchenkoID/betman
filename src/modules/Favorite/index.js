import { useMemo } from 'react'
import { useTranslations } from 'next-intl'

import { ROUTES_USER } from '@/constant/config'

// import { useModal } from '@/context/ModalContext'

import Icon from '@/components/Icon'
import Action from '@/components/Action'
// import Login from 'modules/Modals/Login'

import style from './index.module.scss'

const Favorite = ({ data }) => {
  const t = useTranslations()
  // const { openModal } = useModal()

  const isFavorite = true

  // const isFavorite = useMemo(() => {
  //   if (!isAuth()) return false
  //   return Boolean(favorites?.data?.some(g => g.id === data?.id))
  // }, [isAuth, favorites, data?.id])

  const handleClick = async () => {
    // if (isAuth()) {
    //   const formData = new FormData()
    //   formData.append('cmd', isFavorite ? 'remove_from_favorites' : 'add_to_favorites')
    //
    //   const { error} = await request('POST', `game/${data?.id}/`, formData)
    //   if (!error) {
    //     setFavorites()
    //   }
    // }
    // else {
    //   openModal({
    //     title: t('sign_up'),
    //     body: <Login />
    //   })
    // }
  }

  return (
    <Action
      classes={['secondary', 'md', 'square', style.block, isFavorite ? style.active : style.default]}
      onChange={handleClick}
    >
      <Icon name={ROUTES_USER.favourites.icon} />
    </Action>
  )
}

export default Favorite
