import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import Image from 'next/image'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'
import { imageError } from '@/helpers/image'

import Action from '@/components/Action'
import Icon from '@/components/Icon'

import style from './index.module.scss'

const WinnerCard = ({ user, data }) => {
  const t = useTranslations()
  const router = useRouter()
  const { openModal, closeAllModals } = useModal()

  const handlePlay = () => {
    if (user?.id) {
      closeAllModals()
      router.push(`${NAVIGATION.game.url}/${data?.game?.id}/0`)
    }
    else {
      openModal('login', {}, { title: t('sign_up') })
    }
  }

  const handleClick = () => {
    if (data?.game) {
      openModal('game', { data: data?.game, user })
    }
  }

  return (
    <article className={style.block}>
      <div
        className={style.action}
        onClick={handleClick}
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
          <Icon
            name={'icon-human-avatar'}
            size={'sm'}
          />
          <p>{data.maskedUsername}</p>
        </div>

        <div className={style.hidden}>
          <p className={style.title}>{data?.game?.title}</p>
          <Action
            classes={['primary', 'md']}
            placeholder={t('play')}
            onChange={handlePlay}
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
