import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import classNames from 'classnames'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'
import { imageError } from '@/helpers/image'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Badge from '@/modules/Badge'
import Favourite from '@/modules/Favorite'

import style from './index.module.scss'

const Thumbnail = ({
  data,
  user,
  isEmpty = false,
  isPriority = false,
  isNumeric = false
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
      openModal('login', {}, { title: t('sign_up') })
    }
  }

  const handleClick = () => {
    openModal('game', { data, user })
  }

  return (
    <article
      className={
        classNames(
          style.block,
          isEmpty && style.empty,
          isNumeric && style.numeric
        )
      }
      aria-label={data?.title}
    >
      <button
        type="button"
        className={style.action}
        onClick={handleClick}
        aria-label={`${t('details')} ${data?.title}`}
      />
      {
        data?.images?.length > 0 &&
        <Image
          src={data?.images?.[0]}
          className={style.image}
          alt={data?.title}
          width={250}
          height={280}
          priority={isPriority}
          decoding="async"
          sizes="250px"
          onError={imageError}
          unoptimized
        />
      }
      <div className={style.details}>
        <div className={style.header}>
          <Favourite
            data={data}
            user={user}
          />
        </div>
        <div className={style.content}>
          <div className={style.actions}>
            <Action
              classes={['primary', 'lg', 'square', style.play]}
              onChange={handlePlay}
              aria-label={`${t('play')} ${data?.title}`}
            >
              <Icon name={'icon-status-play-alt'} />
            </Action>
            {
              data?.hasDemo === "1" &&
              <Action
                to={`${NAVIGATION.game.url}/${data.id}/1`}
                onChange={closeModal}
                classes={['link', 'sm', style.demo]}
                placeholder={t('demo')}
                aria-label={`${t('demo')} ${data?.title}`}
                prefetch={false}
              />
            }
          </div>
          <p className={style.title}>{data.title}</p>
          {
            !isNumeric &&
            <div className={style.tags}>
              {
                data?.groups?.map((el, idx) =>
                  <Badge
                    key={idx}
                    data={el.value}
                    link={el.link}
                    classes={['secondary', 'md']}
                  />
                )
              }
            </div>
          }
        </div>
      </div>
    </article>
  )
}

export default Thumbnail
