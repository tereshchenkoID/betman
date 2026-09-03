import { startTransition } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import clsx from 'clsx'

import { BONUS_STATUS } from '@/constant/config'

import { useModal } from '@/context/ModalContext'
import { toast } from '@/utils/toast'
import { date } from '@/helpers/date'
import { action } from './action'

import Action from '@/components/Action'
import Scale from '@/modules/Scale'
import Icon from '@/components/Icon'
import Notification from '@/modules/Notification'

import style from './index.module.scss'

const STATUS_TYPE = {
  0: 'warning',
  1: 'success',
  2: 'error',
}

const BonusCard = ({ settings, data }) => {
  const t = useTranslations()
  const router = useRouter()
  const { openModal } = useModal()
  const {
    id,
    enable,
    name,
    status,
    amount,
    currency,
    expired_at,
    info,
    fs,
    fs_left,
    total_bets,
    percentage,
    refund_sum,
    wager,
    button
  } = data

  const { link, text, newtab } = button

  const handleChange = () => {
    startTransition(async () => {
      const res = await action(id, '0')

      if (res?.code === '0') {
        toast.success(res.message)
        router.refresh()
      }
      else {
        toast.error(res.error_message)
      }
    })
  }

  return (
    <div
      className={
        clsx(
          style.block,
          enable === '0' && style.disabled
        )
      }
    >
      <div className={style.content}>
        <div>
          <div className={style.row}>
            <h3>{name}</h3>
            {
              enable === '1' &&
              <Action
                classes={['secondary', 'md', 'square']}
                aria-label={t('delete')}
                onChange={handleChange}
              >
                <Icon name="actions-delete" />
              </Action>
            }
            {
              status &&
              <div className={style.row}>
                <Notification
                  text={t(BONUS_STATUS[status])}
                  type={STATUS_TYPE[status]}
                  classes={style.status}
                />
              </div>
            }
          </div>
          <div className={style.row}>
            <p>{t('amount')}:</p>
            <p>{amount} {currency}</p>
          </div>
          <div className={style.row}>
            <p>{t('expired')}:</p>
            <p>{date(expired_at, 3)}</p>
          </div>
        </div>
      </div>
      <div className={style.info}>
        {
          link &&
          <Action
            to={link}
            placeholder={text}
            classes={['primary', 'md', 'wide']}
          />
        }
        {
          info &&
          <Action
            placeholder={t('details')}
            classes={['secondary', 'md', 'wide']}
            onChange={() => {
              openModal('quest', { data: info }, { title: name })
            }}
          />
        }
      </div>
      <div className={style.scale}>
        <Scale
          amount={total_bets}
          percentage={percentage}
          max={refund_sum}
          currency={currency}
          isInverted={true}
        />
      </div>
      <div className={style.footer}>
        <div>{t('wager')}: {wager}</div>
        {
          fs &&
          <div>{t('fs_left')}: <span>{fs_left}</span> / <strong>{fs}</strong></div>
        }
      </div>
    </div>
  )
}

export default BonusCard
