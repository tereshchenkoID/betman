import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Favourite from '@/modules/Favorite'
import Badge from '@/modules/Badge'
import LoginModal from '@/modules/Modals/LoginModal'

import style from './index.module.scss'

const Game = ({ data, user }) => {
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

  return (
    <div
      className={style.block}
      style={{
        backgroundImage: `url(${data?.image})`,
      }}
    >
      <div className={style.header}>
        <Favourite data={data} />
        <Action
          classes={['secondary', 'md', 'square', style.close]}
          onChange={closeModal}
        >
          <Icon name={'icon-navigation-close'} />
        </Action>
      </div>
      <div className={style.content}>
        <div className={style.tags}>
          {
            data.groups.map((el, idx) =>
              <Badge
                key={idx}
                data={el.value}
                classes={['secondary', 'md']}
              />
            )
          }
        </div>
        <h3>{data.title}</h3>
        <ul className={style.options}>
          {
            data.minStake !== null &&
            <li className={style.option}>
              <p>{t('min_bet')}:</p>
              <p>{data.minStake} {user?.currency?.text}</p>
            </li>
          }
          {
            data.maxStake !== null &&
            <li className={style.option}>
              <p>{t('max_bet')}:</p>
              <p>{data.maxStake} {user?.currency?.text}</p>
            </li>
          }
        </ul>
        <div className={style.actions}>
          {
            data.hasDemo === "1" &&
            <Action
              to={`${NAVIGATION.game.url}/${data.id}/1`}
              onChange={closeAllModals}
              classes={['tertiary', 'md', style.action]}
              placeholder={t('demo')}
            />
          }
          <Action
            classes={['primary', 'md', style.action]}
            placeholder={t('play')}
            onChange={handlePlay}
          />
        </div>
      </div>
    </div>
  )
}

export default Game
