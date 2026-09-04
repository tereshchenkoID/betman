import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { useGamePlay } from '@/hooks/useGamePlay'

import { imageError } from '@/helpers/image'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const WinnerCard = ({ user, data }) => {
  const t = useTranslations()
  const { game, winnings, maskedUsername, totalBet } = data
  const { id, title, images } = game
  const currency = user?.currency?.text

  const { handlePlay, handleOpenGameModal } = useGamePlay(user)

  return (
    <article className={style.block}>
      <div
        className={style.action}
        onClick={() => handleOpenGameModal(game)}
      />
      <div className={style.info}>
        <div className={style.winnings}>
          <h2>{winnings}</h2>
          <p className={style.currency}>{currency}</p>
        </div>

        <div className={style.winnings}>
          <p className={style.currency}>{t('stake')}:</p>
          <p className={style.currency}><strong>{totalBet}</strong> {currency}</p>
        </div>

        <div className={style.player}>
          <Icon name="human-avatar" size="sm" />
          <p>{maskedUsername}</p>
        </div>

        <div className={style.hidden}>
          <p className={style.title}>{title}</p>
          <Action
            classes={['primary', 'md']}
            placeholder={t('play')}
            onChange={() => handlePlay(id)}
          />
        </div>
      </div>
      {
        images?.length > 0 &&
        <Image
          className={style.image}
          src={images?.[0]}
          alt={title || `Winner ${id}`}
          width={88}
          height={110}
          decoding="async"
          sizes="88px"
          onError={(e) => imageError(e, false)}
          unoptimized
        />
      }
    </article>
  )
}

export default WinnerCard
