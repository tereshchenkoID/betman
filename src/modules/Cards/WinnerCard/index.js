import { useTranslations } from 'next-intl'
import Image from 'next/image'

import { imageError } from '@/helpers/image'
import { useGamePlay } from '@/hooks/useGamePlay'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const WinnerCard = ({ user, data }) => {
  const t = useTranslations()
  const { handlePlay, handleOpenGameModal } = useGamePlay(user)

  return (
    <article className={style.block}>
      <div
        className={style.action}
        onClick={() => handleOpenGameModal(data?.game)}
      />
      <div className={style.info}>
        <div className={style.winnings}>
          <h2>{data.winnings}</h2>
          <p className={style.currency}>{user?.currency?.text}</p>
        </div>

        <div className={style.winnings}>
          <p className={style.currency}>{t('stake')}:</p>
          <p className={style.currency}><strong>{data.totalBet}</strong> {user?.currency?.text}</p>
        </div>

        <div className={style.player}>
          <Icon name="human-avatar" size="sm" />
          <p>{data.maskedUsername}</p>
        </div>

        <div className={style.hidden}>
          <p className={style.title}>{data?.game?.title}</p>
          <Action
            classes={['primary', 'md']}
            placeholder={t('play')}
            onChange={() => handlePlay(data?.game?.id)}
          />
        </div>
      </div>
      {
        data?.game?.images?.length > 0 &&
        <Image
          className={style.image}
          src={data?.game?.images?.[0]}
          alt={data?.game?.title}
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
