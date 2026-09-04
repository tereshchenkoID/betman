import Image from 'next/image'
import { useTranslations } from 'next-intl'
import clsx from 'clsx'

import { NAVIGATION } from '@/constant/config'

import { imageError } from '@/helpers/image'
import { useGamePlay } from '@/hooks/useGamePlay'

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
  const { handlePlay, handleDemo, handleOpenGameModal } = useGamePlay(user)
  const { id, title, images, groups } = data

  return (
    <article
      className={
        clsx(
          style.block,
          isEmpty && style.empty,
          isNumeric && style.numeric
        )
      }
      aria-label={title}
    >
      <button
        type="button"
        className={style.action}
        onClick={() => handleOpenGameModal(data)}
        aria-label={`${t('details')} ${title}`}
      />
      {
        images?.length > 0 &&
        <Image
          src={images?.[0]}
          className={style.image}
          alt={title || 'Thumbnail image'}
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
              classes={['primary', 'lg', 'square']}
              onChange={() => handlePlay(id)}
              aria-label={`${t('play')} ${title}`}
            >
              <Icon name={'status-play-alt'} />
            </Action>
            {
              data?.hasDemo === '1' &&
              <Action
                to={`${NAVIGATION.game.url}/${id}/1`}
                onChange={handleDemo}
                classes={['link', 'sm']}
                placeholder={t('demo')}
                aria-label={`${t('demo')} ${title}`}
                prefetch={false}
              />
            }
          </div>
          <p className={style.title}>{title}</p>
          {
            !isNumeric &&
            <div className={style.tags}>
              {
                groups?.map((el, idx) =>
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
