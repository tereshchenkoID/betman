import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import LoginModal from '@/modules/Modals/LoginModal'
import GameModal from '@/modules/Modals/GameModal'

import style from './index.module.scss'

const WinnerCard = ({ user, data }) => {
  const t = useTranslations()
  const router = useRouter()
  const { openModal, closeAllModals } = useModal()

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
      body: <GameModal data={data?.game} user={user} />
    })
  }

  return (
    <div className={style.block}>
      <div
        className={style.action}
        onClick={handleClick}
      />
      <div className={style.info}>
        <div className={style.winnings}>
          <h2 className={style.amount}>{data.winnings}</h2>
          <p className={style.currency}>{user?.currency.text}</p>
        </div>

        <div className={style.winnings}>
          <p className={style.currency}>{t('stake')}:</p>
          <p className={style.currency}><strong>{data.totalBet}</strong> {user?.currency.text}</p>
        </div>

        <div className={style.player}>
          <Icon
            name={'icon-human-avatar'}
            size={'sm'}
          />
          <p>{data.maskedUsername}</p>
        </div>

        <div className={style.hidden}>
          <p className={style.title}>{data.game.title}</p>
          <Action
            classes={['primary', 'md']}
            placeholder={t('play')}
            onChange={handlePlay}
          />
        </div>
      </div>
      {
        data?.game?.image &&
        <Image
          src={data?.game?.image}
          className={style.image}
          alt={data?.game?.title}
          width={88}
          height={110}
          sizes="88px"
        />
      }
    </div>
  )
}

export default WinnerCard
