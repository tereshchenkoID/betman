import { startTransition } from 'react'
import { useTranslations } from 'next-intl'
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
  const { openModal } = useModal()

  const handleChange = () => {
    startTransition(async () => {
      const res = await action(data?.id, '0')

      if (res?.code === '0') {
        toast.success(res.message)
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
          data?.enable === '0' && style.disabled
        )
      }
    >
      <div className={style.content}>
        <div>
          <div className={style.row}>
            <h3>{data?.name}</h3>
            {
              data?.enable === '1' &&
              <Action
                classes={['secondary', 'md', 'square']}
                aria-label={t('delete')}
                onChange={handleChange}
              >
                <Icon name={'icon-actions-delete'} />
              </Action>
            }
            {
              data?.status &&
              <div className={style.row}>
                <Notification
                  text={t(BONUS_STATUS[data?.status])}
                  type={STATUS_TYPE[data?.status]}
                  classes={style.status}
                />
              </div>
            }
          </div>
          <div className={style.row}>
            <p>{t('amount')}:</p>
            <p>{data?.amount} {data?.currency}</p>
          </div>
          <div className={style.row}>
            <p>{t('expired')}:</p>
            <p>{date(data?.expired_at, 3)}</p>
          </div>
        </div>
      </div>
      <div className={style.info}>
        {
          data?.button?.link &&
          <Action
            to={data?.button?.link}
            placeholder={data?.button?.text}
            classes={['primary', 'md', 'wide']}
          />
        }
        {
          data?.info &&
          <Action
            placeholder={t('details')}
            classes={['secondary', 'md', 'wide']}
            onChange={() => {
              openModal('quest', { data: data?.info }, { title: data?.name })
            }}
          />
        }
      </div>
      <div className={style.scale}>
        <Scale
          amount={data?.total_bets}
          percentage={data?.percentage}
          max={data?.refund_sum}
          currency={data?.currency}
          isInverted={true}
        />
      </div>
      <div className={style.footer}>
        <div>{t('wager')}: {data?.wager}</div>
        {
          data?.fs &&
          <div>{t('fs_left')}: <span>{data?.fs_left}</span> / <strong>{data?.fs}</strong></div>
        }
      </div>
    </div>
  )
}

export default BonusCard
