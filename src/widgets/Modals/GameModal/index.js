import { useTranslations } from 'next-intl'

import { NAVIGATION } from '@/constant/config'

import { useGamePlay } from '@/hooks/useGamePlay'
import useModal from '@/hooks/useModal'
import { useUser } from '@/hooks/useUser'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Badge from '@/modules/Badge'
import Favorite from '@/modules/Favorite'

import style from './index.module.scss'

const GameModal = ({ data }) => {
  const t = useTranslations()
  const { currency } = useUser()
  const { closeModal } = useModal()
  const { handlePlay, handleDemo } = useGamePlay()

  return (
    <div
      className={style.block}
      style={{
        backgroundImage: `url(${data?.images?.[1]})`,
      }}
    >
      <div className={style.header}>
        <Favorite data={data} />
        <Action
          classes={['secondary', 'md', 'square']}
          onChange={closeModal}
        >
          <Icon name="navigation-close" />
        </Action>
      </div>
      <div className={style.content}>
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
        <h3>{data.title}</h3>
        <ul className={style.options}>
          {
            data.minStake &&
            <li className={style.option}>
              <p>{t('min_bet')}:</p>
              <p>{data.minStake} {currency?.text}</p>
            </li>
          }
          {
            data.maxStake &&
            <li className={style.option}>
              <p>{t('max_bet')}:</p>
              <p>{data.maxStake} {currency?.text}</p>
            </li>
          }
        </ul>
        <div className={style.actions}>
          {
            data.hasDemo === '1' &&
            <Action
              to={`${NAVIGATION.game.url}/${data.id}/1`}
              onChange={handleDemo}
              classes={['tertiary', 'md', style.action]}
              placeholder={t('demo')}
              prefetch={false}
            />
          }
          <Action
            classes={['primary', 'md', style.action]}
            placeholder={t('play')}
            onChange={() => handlePlay(data?.id)}
          />
        </div>
      </div>
    </div>
  )
}

export default GameModal
