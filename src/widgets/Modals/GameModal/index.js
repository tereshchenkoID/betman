import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'

import { NAVIGATION } from '@/constant/config'

import { useModal } from '@/context/ModalContext'

import Action from '@/components/Action'
import Icon from '@/components/Icon'
import Favourite from '@/modules/Favorite'
import Badge from '@/modules/Badge'

import style from './index.module.scss'

const GameModal = ({ data, user }) => {
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

  return (
    <div
      className={style.block}
      style={{
        backgroundImage: `url(${data?.images?.[0]})`,
      }}
    >
      <div className={style.header}>
        <Favourite
          data={data}
          user={user}
        />
        <Action
          classes={['secondary', 'md', 'square']}
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
                link={el.link}
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
              prefetch={false}
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

export default GameModal
