import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Badge from '@/modules/Badge'
import Favourite from '@/modules/Favorite'
import LoginModal from '@/modules/Modals/LoginModal'
import GameModal from '@/modules/Modals/GameModal'

import style from './index.module.scss'

const Thumbnail = ({
  data,
  user,
  isEmpty = false,
  isPriority = false
}) => {
  const t = useTranslations()
  const router = useRouter()
  const { openModal, closeModal, closeAllModals } = useModal()

  const handlePlay = () => {
    if (user?.id) {
      closeAllModals()
      router.push(`${NAVIGATION.game.url}/${data.id}/0`)
    }
    else {
      openModal({
        title: t('sign_up'),
        body: <LoginModal />
      })
    }
  }

  const handleClick = () => {
    openModal({
      body: <GameModal data={data} user={user} />
    })
  }

  // console.log(data)

  return (
    <div
      className={
        classNames(
          style.block,
          isEmpty && style.empty
        )
      }
    >
      <div
        className={style.action}
        onClick={handleClick}
      />
      {
        data?.image &&
        <Image
          src={data?.image}
          className={style.image}
          alt={data?.title}
          width={250}
          height={280}
          priority={isPriority}
          fetchPriority={isPriority ? 'high': 'low'}
          loading={isPriority ? 'eager': 'lazy'}
          sizes="125px"
        />
      }
      <div className={style.details}>
        <div className={style.header}>
          <Favourite data={data} />
        </div>
        <div className={style.content}>
          <div className={style.actions}>
            <Action
              classes={['primary', 'lg', 'square', style.play]}
              onChange={handlePlay}
            >
              <Icon name={'icon-status-play-alt'} />
            </Action>
            {
              data.hasDemo === "1" &&
              <Action
                to={`${NAVIGATION.game.url}/${data.id}/1`}
                onChange={closeModal}
                classes={['link', 'sm', style.demo]}
                placeholder={t('demo')}
              />
            }
          </div>
          <p className={style.title}>{data.title}</p>
          <div className={style.tags}>
            {
              data.groups.map((el, idx) =>
                <Badge
                  key={idx}
                  data={el.value}
                  link={el.link}
                  classes={['secondary', 'md']}
                />
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thumbnail
